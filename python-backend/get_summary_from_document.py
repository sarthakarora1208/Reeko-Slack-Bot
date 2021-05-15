import os
import boto3
from transformers import pipeline
from pathlib import Path
from dotenv import load_dotenv
import textract
from nltk.tokenize import sent_tokenize
from transformers import GPT2Tokenizer

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

async def get_summary_from_document(textract_client,file_name):
    """Summarise a document"""
    file_path = os.path.join(os.getcwd(), 'downloads',file_name)
    file_name, file_extension = os.path.splitext(file_path)

    text = ""
    text_array = []

    if file_extension == '.pdf':
        file_bytes = textract.process(file_path, method='pdfminer')
        text = file_bytes.decode("utf-8")
    else:
        with open(file_path, 'rb') as document:
            imageBytes = bytearray(document.read())
        response = textract_client.detect_document_text(
            Document={'Bytes': imageBytes})
        for item in response["Blocks"]:
            if item["BlockType"] == "LINE":
                # print('\033[94m' + item["Text"] + '\033[0m')
                #text_array.push(item["Text"])
                text = text + " " + item["Text"]

    summary = ""
    text = text.replace("\n", " ")
    summarizer = pipeline('summarization')
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    x = tokenizer.encode(text)
    print(len(x))
    if(len(x) > 1024):

        text1 = text[:int(len(text)/3)]
        summary_dict = summarizer(text1)
        summary += summary_dict[0]['summary_text']

        text2 = text[int(len(text)/3): int(2*len(text)/3)]
        summary_dict = summarizer(text2)
        summary += summary_dict[0]['summary_text']

        #text3 = text[int(2*len(text)/3): int(len(text))]
        #summary_dict = summarizer(text3)
        #summary += summary_dict[0]['summary_text']
    else:
        summary_dict = summarizer(text)
        summary += summary_dict[0]['summary_text']

    new_summary = '.'.join(list(map(lambda x: x.strip().capitalize().rjust(len(x)), summary.split('.'))))
    #print(new_summary)
    return new_summary




def main():

# Creating an AWS Textract client
    textract_client = boto3.client('textract', aws_access_key_id=str(os.environ.get('AMAZON_AWS_ACCESS_KEY_ID')),
                               aws_secret_access_key=str(os.environ.get('AMAZON_AWS_SECRET_ACCESS_KEY')))

    #file_name = os.path.join(os.getcwd(),'amazon.pdf')
    file_name = 'amazon.pdf'
    get_summary_from_document(textract_client, file_name)
    text = "amazon has grown from having 158 employees to 614 . we had just gone public at a split-adjusted stock price of $1.50 per share . in 1997, we hadn’t invented Prime, Marketplace, Alexa, or AWS .if you want to be successful in business, you have to create more than you consume . your goal should be to create value for everyone you interact with . stock prices are not about the past. they are a prediction of future cash flows discounted back to the present .a typical Amazon purchase takes about an hour and saves you a couple of trips to a physical store a week . that’s more than 75 hours a year saved . we have 200 million Prime members, for a total in 2020 of $126 billion of value creation . a reasonable estimate is 30% ."
    new_text = '.'.join(list(map(lambda x: x.strip().capitalize().rjust(len(x)), text.split('.'))))
    #print(new_text)
    #sentences_array = sent_tokenize(text)
    #print(sentences_array)


if __name__ == "__main__":
    main()
