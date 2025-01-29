import pdfplumber
import spacy
import matplotlib.pyplot as plt
from collections import Counter

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

# Example Usage
resume_path = "KHALID_M_resumé.pdf"  # Provide a sample resume PDF path
result = analyze_resume(resume_path)
print(result)

