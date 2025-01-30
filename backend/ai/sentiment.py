import pdfplumber
import spacy
import matplotlib.pyplot as plt
from collections import Counter
from textblob import TextBlob

# Load Spacy NLP Model
nlp = spacy.load("en_core_web_sm")

# Function to Extract Text from Resume
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
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
        "Introduction": ["motivated", "passionate", "enthusiastic"],
        "Experience": ["worked", "developed", "built", "company", "organization"],
        "Skills": ["skills", "expertise", "knowledge", "experience in"],
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
    for section, content in detected_sections.items():
        if content.strip():
            sentiment = TextBlob(content).sentiment
            print(f"Section: {section}")
            print(f"Content: {content}")
            print(f"Sentiment: {sentiment}\n")
    


# Example Usage
resume_path = "KHALID_M_resumé.pdf"  # Provide a sample resume PDF path
result = analyze_resume(resume_path)
sectional_analysis(resume_path)
print(result)

