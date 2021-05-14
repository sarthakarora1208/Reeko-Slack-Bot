[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-markdown.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
</br>
</br>
</br>

<p align="center">
  <a href="">
    <img src="./photos/Reeko_Slack_Bot.png" alt="Logo" width="600" height="450">
  </a>
  <h1 align="center">Reeko Slack Bot</h1>
</p>

<br/>

With 10+ million daily active users and millions of file shared everyday Slack is where collaboration happens. Using Reeko you can find files, download them or delete them permanently from S3 bucket without leaving Slack or writing a single line of code. In the digital age information is abundant and our attention spans have become much shorter.
Using advanced Natural Language Processing (NLP) and Natural Language Understanding (NLU) techniques, Reeko extracts all the text from the long and boring documents outputs the summary as an image. This way you don't even have to open the document to know what is inside of it!

<img src="./photos/Summarise_Document.gif" alt="Logo">

### Features

### Document Summarisation

Document Summarization is the task of rewriting a document into its shorter form while still retaining its important content. With the help of the `/summarise-document filname` you can summarise any documents

### File Syncing and Data Backup inside Slack

Reeko Slack Bot enables users to access files in your S3 bucket directly from Slack using _Slash commands_. By using simple commands like `/s3-get filename` and `/s3-delete filename` we can find or delete files. Whenever a new file is shared on any public channel it is automatically added to the S3 test bucket, ensuring that all your slack files are safe in case a teammate accidently deletes a file that you need.

### File Searching

Most of the time we don't know the exact name of the file we are looking for. We also need to check if the file is actually present in the S3 bucket. Pooling the bucket over and over again to find a file or check for its existence is a computationally expensive and slow operation. To enable faster indexing of all the files on the S3 bucket, there is a layer of RediSearch between the Slack Bot and the S3 bucket. A user can find any file using the `/s3-search` command which opens a file search dialog. RediSearch's autocomplete functionality helps in navigating or guiding the user by prompting them with likely completions and alternatives to the filenames as they are typing it.

### Architecture Diagram

  <img src="./photos/Reeko-Slack-Bot-Architecture-Diagram.png" alt="Logo">

## How we built it

The Project is set up to work in a python3 virtual environment. The Slack app is built using <a href="https://slack.dev/bolt-python/concepts">Bolt for Python</a> framework. For connecting to the AWS S3 bucket, AWS Comprehend and AWS Textract we use their respective boto3 clients. We connect to RedisSearch using the <a href="https://RedisSearch-py.readthedocs.io/en/v7.12.0/"> Python RedisSearch Client</a>.

The Slack app listens to all sorts of events happening around your workspace — messages being posted, files being shared, users joining the team, and more. To listen for events, the slack app uses the Events API. To enable custom interactivity like the search modal we use the Blocks Kit.

Slash commands perform a very simple task: they take whatever text you enter after the command itself (along with some other predefined values), send it to a URL, then accept whatever the script returns and posts it as a Slackbot message to the person who issued the command or in a public channel. Here are the 5 slash commands we use to interact with the Cortx S3 bucket.

### File Sync

Whenever a new file is shared in any public slack channel the <a href="https://api.slack.com/events/file_shared#:~:text=The%20file_shared%20event%20is%20sent,the%20files.info%20API%20method."> <em>file_share event</em></a> is sent to the Slack app. The file is first indexed into RedisSearch and then added to the Cortx S3 bucket with a key as file name.

<br>
<a href='https://www.freepik.com/vectors/illustrations'>Illustrations vector created by stories - www.freepik.com</a>
