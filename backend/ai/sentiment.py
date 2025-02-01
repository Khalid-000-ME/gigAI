import pdfplumber
import spacy
import matplotlib.pyplot as plt
from collections import Counter
from textblob import TextBlob
from io import BytesIO
import requests

# Load Spacy NLP Model
nlp = spacy.load("en_core_web_sm")

# Convert Google Drive URL to direct download link
def get_direct_gdrive_link(drive_url):
    if "drive.google.com" in drive_url:
        file_id = drive_url.split("/d/")[1].split("/")[0]
        return f"https://drive.google.com/uc?export=download&id={file_id}"
    return drive_url

# Function to Extract Text from PDF (handles Google Drive links)
def extract_text_from_pdf(pdf_url):
    pdf_url = get_direct_gdrive_link(pdf_url)  # Convert if it's a Google Drive link

    response = requests.get(pdf_url)
    if response.status_code != 200:
        raise Exception(f"Failed to download PDF. HTTP Status Code: {response.status_code}")

    content_type = response.headers.get("Content-Type", "")
    
    # Allow PDFs even if Google Drive returns "application/octet-stream"
    if "pdf" not in content_type and content_type != "application/octet-stream":
        raise Exception(f"Invalid content type: {content_type}. The URL might not point to a valid PDF.")

    text = ""
    try:
        with pdfplumber.open(BytesIO(response.content)) as pdf:
            for page in pdf.pages:
                extracted_text = page.extract_text()
                if extracted_text:
                    text += extracted_text + "\n"
    except Exception as e:
        raise Exception(f"Error processing PDF: {e}")

    return text
# Function to Analyze Resume
def analyze_resume(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    doc = nlp(text)

    # Extract Named Entities
    skills = [ent.text for ent in doc.ents if ent.label_ in ["ORG", "GPE", "PERSON"]]
    common_words = Counter([token.text.lower() for token in doc if not token.is_stop and token.is_alpha])

    # Visualizing Common Words
    top_words = common_words.most_common(10)
    words, counts = zip(*top_words)

    plt.figure(figsize=(10, 5))
    plt.barh(words, counts, color="skyblue")
    plt.xlabel("Frequency")
    plt.ylabel("Words")
    plt.title("Top 10 Keywords in Resume")
    plt.gca().invert_yaxis()
    plt.show()

    return {"Extracted Skills/Orgs": skills, "Top Words": top_words}

def sectional_analysis(pdf_path):
    doc = nlp(extract_text_from_pdf(pdf_path))
    section_keywords = {
        "introduction": ["motivated", "passionate", "enthusiastic"],
        "experience": ["worked", "developed", "built", "company", "organization"],
        "skills": ["skills", "expertise", "knowledge", "experience in"],
    }

    # Initialize detected sections
    detected_sections = {section: "" for section in section_keywords}

    # Assign text to sections based on keyword matches
    for sent in doc.sents:
        sentence_text = sent.text.strip().lower()
        for section, keywords in section_keywords.items():
            if any(keyword in sentence_text for keyword in keywords):
                detected_sections[section] += sent.text + " "

    # Perform sentiment analysis on detected sections
    response = []
    
    for section, content in detected_sections.items():
        if content.strip():
            sentiment = TextBlob(content).sentiment
            response.append({section: sentiment})
            
    return response
    


# Example Usage
resume_path = ""
result = analyze_resume(resume_path)
sectional_analysis(resume_path)
print(result)

