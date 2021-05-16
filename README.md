[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-markdown.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[![Reeko](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Reeko_Slack_Bot.png)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Reeko_Slack_Bot.png)

# Reeko Slack Bot

Video Link: [https://youtu.be/XYbWfOSYmyM](https://youtu.be/XYbWfOSYmyM)
<br/>

With 10+ million daily active users and millions of file shared everyday, Slack is where collaboration happens. Using Reeko you can find files, download them or delete them permanently from S3 bucket without leaving Slack or writing a single line of code. Everyday so many files are shared on Slack and we may lose track of the file we need. Using advanced Natural Language Processing (NLP) and Natural Language Understanding (NLU) techniques, Reeko extracts all the text from the long and boring documents and outputs the summary as an image. This way you don't even have to open the document to know what is inside of it!. Most of the time we don't know the exact name of the file we are looking for and we need autocomplete to figure out the exact file name for us. Reeko has a file search engine built right into Slack that helps you find any file on your S3 bucket.

[![summarise_document](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Summarise_Document.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Summarise_Document.gif)

## Table of Contents

- [Reeko Slak Bot](#Reeko-Slack-Bot)
- [Features](#Features)
  - [Document Summarisation](#Document-Summarisation)
  - [Connecting Slack to AWS S3](#Connecting-Slack-to-AWS-S3)
  - [File Searching](#File-Searching)
- [Tech Stack](#Tech-Stack)
- [Architecture Diagram](#Architecture-Diagram)
- [How it is built & Redis Usage](#How-it-is-built-&-Redis-Usage)

  - [File shared on Slack](#File-shared-on-Slack)
  - [/s3-get filename](#/s3-get-filename)
  - [/s3-delete filename](#/s3-delete-filename)
  - [/s3-search](#/s3-search)
  - [/summarise-document filename](#/summarise-document-filename)

- [Basic Installation Instructions](#Basic-Installation-Instructions)
  - [Redis](#Redis)
  - [Python Backend](#Python-Backend)
  - [Nodejs Backend](#Nodejs-Backend)

## Features

### Document Summarisation

Document Summarization is the task of rewriting a document into its shorter form while still retaining its important content. With the help of the `/summarise-document filename` you can summarise any document. Everything from minutes of the meeting to UNICEF can be shortened.

### File Syncing between Slack and AWS S3

Reeko Slack Bot enables users to access files in your S3 bucket directly from Slack using _Slash commands_. By using simple commands like `/s3-get filename` and `/s3-delete filename` we can find or delete files. Whenever a new file is shared on any public channel it is automatically added to the S3 test bucket, ensuring that all your slack files are safe in case a teammate accidently deletes a file that you need.

### File Searching

Most of the time we don't know the exact name of the file we are looking for. We also need to check if the file is actually present in the S3 bucket. Pooling the bucket over and over again to find a file or check for its existence is a computationally expensive and slow operation. To enable faster indexing of all the files on the S3 bucket, there is a layer of RediSearch between the Slack Bot and the S3 bucket. A user can find any file using the `/s3-search` command which opens a file search dialog. RediSearch's autocomplete functionality helps in navigating or guiding the user by prompting them with likely completions and alternatives to the filenames as they are typing in.

## Tech Stack

- [Slack Block Kit](https://api.slack.com/block-kit): A UI framework for Slack apps that offers a balance of control and flexibility when building experiences.
- [Python](https://www.python.org/): The [redisjson-py](https://github.com/RedisJSON/redisjson-py) and [redisearch-py](https://github.com/RediSearch/redisearch-py) libraries are used to connect to [**Redis**](https://redis.io) and [Slack Bolt For Python](https://slack.dev/bolt-python/concepts) is a foundational framework that we have used to handle the requests from the Slack Workspace.
- [Nodejs](https://nodejs.org/en/): Responsible for Image Generation

## Architecture Diagram

[![Slack-Bot-Architecture](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Reeko-Slack-Bot-Architecture-Diagram.png)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/Reeko-Slack-Bot-Architecture-Diagram.png)

## How it is built & Redis Usage

The Slack app is built using [Bolt for Python](https://slack.dev/bolt-python/concepts) framework. For connecting to the AWS S3 bucket and AWS Textract we use their respective boto3 clients.

The Slack app listens to all sorts of events happening around your workspace — messages being posted, files being shared, users joining the team, and more. To listen for events, the slack app uses the Events API. To enable custom interactivity like the search modal we use the Blocks Kit.

Slash commands perform a very simple task: they take whatever text you enter after the command itself (along with some other predefined values), send it to a URL, then accept whatever the script returns and posts it as a Slackbot message to the person who issued the command or in a public channel. We have a set of 4 slash commands that make our slackbot.

We have used 2 Redis Modules.

- [RedisJSON](https://oss.redislabs.com/redisjson/) - For storing file information like filename, summary and image url.
- [RediSearch](https://oss.redislabs.com/redisearch/) - For searching files in the S3 bucket

Initialising RediSearch in redisearch_connector.py. Creating an index with the name `file_index`.

```py
from redisearch import Client, TextField, AutoCompleter, Suggestion

class RedisSearchConnector():
    def __init__(self):
        self.index_name = 'file_index'
        self.client = Client(self.index_name)
        self.ac = AutoCompleter(self.index_name)
```

Initialising RedisJSON in redisjson_connector.py

```py
from rejson import Client, Path

class RedisJsonConnector():
    def __init__(self):
        self.rj = Client(decode_responses=True)

```

Creating an index on RediSearch

```bash
FT.CREATE file-index ON HASH SCHEMA file_name TEXT SORTABLE file_id TEXT created TEXT timestamp TEXT mimetype TEXT filetype TEXT user_id TEXT size
```

[![1](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/1.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/1.gif)

### File shared on Slack

Whenever a new file is shared in any public slack channel the [**file_share event**](https://api.slack.com/events/file_shared#:~:text=The%20file_shared%20event%20is%20sent,the%20files.info%20API%20method.) is sent to the Slack Bolt app. Firstly the file name is added as suggestion using the `FT.SUGADD` command in RediSearch, the file data like name, created, timestamp, mimetype, filetype, size, summary and image file path are added using the `JSON.SET` command.
The file is then stored on the S3 bucket as an object with the key as the filename.

```bash
FT.SUGADD file-index "amazon-shareholder-letter.pdf" 1
```

```bash
JSON.SET amazonshareholderletterpdf . '{"file_id": "F022ACR81HP", "file_name": "amazonshareholderletterpdf", "created": "1620994889", "timestamp": "1620994889", "mimetype": "application/pdf", "filetype": "pdf", "user_id": "U01U4DV4C8J", "size": "345142", "summary": "", "image_file_path": ""}'
```

### /s3-get filename

[![2](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/2.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/2.gif)

[![3](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/3.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/3.gif)

After fetching the filename from the **command["text"]** parameter we check if the document exists. If the document doesn’t exist it returns false and nothing is done. If the file is found, using the `JSON.GET` command we get the file’s name and then download it from the S3 bucket. The downloaded file is sent back as a direct message in Slack.

```bash
JSON.GET amazonshareholderletterpdf
```

### /s3-delete filename

[![4](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/4.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/4.gif)

[![5](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/5.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/5.gif)

This command permanently deletes a file from the S3 bucket. All you have to do is get the filename from **command["text']** parameter. The file data is deleted from RedisJson using the `JSON.DEL` command and it is removed from RediSearch's suggestions using the `FT.SUGDEL` command. Users are informed once the file is successfully deleted

```bash
FT.SUGDEL file-index "amazon-shareholder-letter.pdf"
```

```bash
JSON.DEL amazonshareholderletterpdf
```

### /s3-search

[![6](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/6.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/6.gif)

[![7](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/7.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/7.gif)

This command opens up a modal inside of Slack with a search bar, the user is suggested the file names depending on whatever text is written in. For example if the bucket has documents like abc.csv, abcd.csv, abcdef.csv upon typing `abc` we get will get these 3 results as a list from the `FT.SEARCH` command. After the user chooses one of the file from the suggestion the file is downloaded and sent back to slack.

```bash
FT.SEARCH file-index "ama"
```

### /summarise-document filename

[![8](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/8.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/8.gif)

[![9](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/9.gif)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/screenshots/9.gif)

Using the summarise document command large documents can be converted into images

1. Get the file name from the **command['text']** parameter.
2. If the file is found, using the `JSON.GET` command we get the file's name.

```bash
JSON.GET amazonshareholderletterpdf
```

3. Download the pdf or png file locally from S3 bucket
4. Extract the text using AWS Textract.
5. The extracted text is summarised using Hugging face transformers summarisation pipeline. The text summary is also added back to the JSON document using `JSON.SET` command.

```bash
JSON.SET amazonshareholderletterpdf .summary ' Amazon has grown from having 158 employees to 614. We had just gone public at a split-adjusted stock price of $1. 50 per share.  In 1997, we hadnâ\x80\x99t invented prime, marketplace, alexa, or aws. If you want to be successful in business, you have to create more than you consume.  Your goal should be to create value for everyone you interact with. Stock prices are not about the past.  They are a prediction of future cash flows discounted back to the present.'
```

6. A post request is then sent to the /create-image on the nodejs backend with the file name and summary text.
7. An image is generated using a base template
8. The image that is returned is saved to the S3 bucket and sent back to Slack.
9. The image URL is also added to the JSON document using `JSON.SET` command.

```bash
JSON.SET amazonshareholderletterpdf .file_path 'https://bucket-1234.s3.amazonaws.com/b8bac45f-7f69-4c28-a26e-9888d9771bed-image.png'
```

Here is the document summary for the [Amazon 2020 shareholder letter](https://s2.q4cdn.com/299287126/files/doc_financials/2021/ar/Amazon-2020-Shareholder-Letter-and-1997-Shareholder-Letter.pdf)

[![amazon-black](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-black.png)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-black.png)
[![amazon-blue](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-blue.png)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-blue.png)
[![amazon-white](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-white.png)](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/photos/sample-templates/amazon-blue.png)

## Basic Installation Instructions

### Redis

Redismod - a Docker image with select Redis Labs modules

```bash
    docker pull redislabs/redismod
    docker run -p 6379:6379 redislabs/redismod
```

### Python Backend

To get the Bolt app running locally follow the instructions at [python-backend/README.md](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/python-backend/README.md)

### Nodejs Backend

To get the Nodejs server running locally follow the instructions at [nodejs-backend/README.md](https://raw.githubusercontent.com/sarthakarora1208/Reeko-Slack-Bot/master/nodejs-backend/README.md)

[Illustrations vector created by stories - www.freepik.com](https://www.freepik.com/vectors/illustrations)
