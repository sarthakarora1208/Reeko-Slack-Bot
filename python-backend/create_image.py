import requests

BASE_URL = 'http://localhost:2309/api/v1'


async def create_image(file_name, summary):
    url = BASE_URL + "/image/create-image"
    data = {
        "summary":summary,
       "fileName": file_name
    }
    x = requests.post(url,data=data)
    response= dict(x.json())
    return response['data']

def main():
    summary = 'Amazon has grown from having 158 employees to 614. We had just gone public at a split-adjusted stock price of $1. 50 per share.  In 1997, we hadn’t invented prime, marketplace, alexa, or aws. If you want to be successful in business, you have to create more than you consume.  Your goal should be to create value for everyone you interact with. Stock prices are not about the past.  They are a prediction of future cash flows discounted back to the present.'
    fileName = "amazon.pdf"
    create_image(summary,file_name=fileName)

if __name__ == "__main__":
    main()
