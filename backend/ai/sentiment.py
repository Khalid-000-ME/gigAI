from textblob import TextBlob

text = ""
blob = TextBlob(text)
print(blob.sentiment)
