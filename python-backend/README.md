### Requirements

- [Python 3.6+](#Python-3.6+)
- [ngrok](#ngrok)
- [AWS Account](#AWS-Account)
- [Slack](#Slack)

### Getting Started

---

<br/>
<img src="../photos/python/Python_logo_and_wordmark.svg" height="100" />

### Python 3.6+

To test the integration you need to have python installed on your computer. You can get a suitable release from [here](https://www.python.org/downloads/). You can check your python version by the following command.
<br>
<br>
<img src="../photos/python/python.png">

We recommend using a virtual environment for development. [Read about it here](https://pypi.org/project/virtualenv/).

Follow the following steps to create a virtual environment, clone the repository and install all the packages.

### Cloning the repo

```bash
# Python 3.6+ required
git clone https://github.com/sarthakarora1208/Reeko-Slack-Bot
cd Reeko-Slack-Bot
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

<br/>

---

<br/>
<img src="../photos/ngrok/ngrok.png" height="100" />

### ngrok

##### Using ngrok as a local proxy

To develop locally we'll be using ngrok, which allows you to expose a public endpoint that Slack can use to send your app events. If you haven't already, [install ngrok from their website](https://ngrok.com/download) .

[Read more about ngrok](https://api.slack.com/tutorials/tunneling-with-ngrok)
<br/>

---

<br/>
<img src="../photos/aws/aws.png" height="100">

### AWS Account

You need a verified aws account to test the [process_resume.py](./process_resume.py)

You can get your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users) and copy the following lines in the [.env](./.env) file.

Also add your S3 bucket name in the .env file

```bash

AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"
BUCKET_NAME="YOUR_BUCKET_NAME"

```

<br/>

---

<br/>

### Slack

You need to have slack installed on your computer. If you don't have Slack you get it from here for [Windows](https://slack.com/intl/en-in/downloads/windows) or [Mac](https://slack.com/intl/en-in/downloads/mac). Login to your account, if you don't have an account you can make one [here](https://slack.com/get-started#/create).

To get started, you'll need to create a new Slack app, go to:
[https://api.slack.com/apps](https://api.slack.com/apps)

Bolt is a foundational framework that makes it easier to build Slack apps with the platform's latest features. We will be using this make our slack bot

1. Click on `Create an App` button
2. Give the app name as reeko and choose the development workspace

   <img src="../photos/slack/slack-1.png" width="400">

   <img src="../photos/slack/slack-2.png" width="400">

3. Requesting scopes - [Scopes](https://api.slack.com/scopes) give your app permission to do things (for example, post messages) in your development workspace. You can select the scopes to add to your app by navigating over to the _OAuth & Permissions_ sidebar.

4. Add the following scopes the _Bot Token Scopes_ by clicking on the `Add an OAuth Scope ` button
<br>
<table>
    <thead>
        <tr>
            <th>OAuth Scope</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/channels:history">channels:history</a>
            </td>
            <td>
                View messages and other content in public channels that reeko has been added to
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/channels:join">channels:join</a>
            </td>
            <td>Join public channels in a workspace</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/channels:read">channels:read</a>
            </td>
            <td>View basic information about public channels in a workspace</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/chat:write">chat:write</a>
            </td>
            <td>Send messages as @reeko</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/chat:write.customize">chat:write.customize</a>
            </td>
            <td>
            Send messages as @reeko with a customized username and avatar
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/chat:write.public">chat:write.public</a>
            </td>
            <td>Send messages to channels @reeko isn't a member of</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/commands">commands</a>
            </td>
            <td>Add shortcuts and/or slash commands that people can use</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/files:read">files:read</a>
            </td>
            <td>View files shared in channels and conversations that reeko has been added to</td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/files:write">files:write</a>
            </td>
            <td>Upload, edit, and delete files as reeko</td>
        </tr>
    </tbody>
</table>
<br/>

<img src="../photos/slack/bot-token-scopes.png" width="400">

<br/>

5. Add the following scopes the the _User Token Scopes_ by clicking on the `Add an OAuth Scope ` button

<table>
    <thead>
        <tr>
            <th>OAuth Scope</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/channels:history">channels:history</a>
            </td>
            <td>
                View messages and other content in public channels that reeko has been added to
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://api.slack.com/scopes/files:read">files:read</a>
            </td>
            <td>View files shared in channels and conversations that reeko has been added to</td>
        </tr>
    </tbody>
</table>
<br/>

<img src="../photos/slack/user-token-scopes.png" width="400">

<br/>

6. Install your own app by selecting the `Install App` button at the top of the OAuth & Permissions page, or from the sidebar.

7. After clicking through one more green `Install App To Workspace` button, you'll be sent through the Slack OAuth UI.

8. After installation, you'll land back in the _OAuth & Permissions_ page and find a _Bot User OAuth Access Token._ and a _User OAuth Token_. Click on the copy button for each of them. These tokens need to be added to the [.env](./.env) file. (The bot token starts with xoxb whereas the user token is longer and starts with xoxp)

```bash
SLACK_USER_TOKEN=xoxp-your-user-token
SLACK_BOT_TOKEN=xoxb-your-bot-token
```

<img src="../photos/slack/tokens.png" width="400">

9. In addition to the access token, you'll need a signing secret. Your app's signing secret verifies that incoming requests are coming from Slack. Navigate to the _Basic Information_ page from your [app management page](https://api.slack.com/apps). Under App Credentials, copy the value for _Signing Secret_ and add it to the [.env](./env) file.

```bash
SLACK_SIGNING_SECRET=your-signing-secret
```

<img src="../photos/slack/app-creds.png" width="400">

10. Make sure you have followed the steps in [Cloning the repo](#Cloning-the-repo). To start the bolt app. The HTTP server is using a built-in development adapter, which is responsible for handling and parsing incoming events from Slack on port 3000

```bash
python3 app.py
```

<img src="../photos/python/python3-app.png">

Open a new terminal and ensure that you've installed [ngrok](#ngrok), go ahead and tell ngrok to use port 3000 (which Bolt for Python uses by default):

```bash
ngrok http 3000
```

<img src="../photos/ngrok/ngrok_running.gif">

For local slack development, we'll use your ngrok URL from above, so copy it your clipboard

```bash
For example: https://your-own-url.ngrok.io (copy to clipboard)
```

11. Subscribing to events - Your app can listen to all sorts of events happening around your workspace — messages being posted, files being shared, and more. On your app configuration page, select the _Event Subscriptions_ sidebar. You'll be presented with an input box to enter a `Request URL`, which is where Slack sends the events your app is subscribed to. _Hit the save button_

By default Bolt for Python listens for all incoming requests at the /slack/events route, so for the Request URL you can enter your ngrok URL appended with /slack/events.

```bash
Request URL: https://your-own-url.ngrok.io/slack/events
```

If the challenge was successful you will get a verified right next to the Request URL.

<img src="../photos/slack/event-subscriptions.png" width="400">

On the same page click on the `Subscribe to bot events` menu on the bottom of the page. Click on the `Add Bot User Event` .

Similary click on the `Subscribe to events on behalf of user`. Click on the `Add Workspace Event`.

Add the following scopes

<table>
    <thead>
        <tr>
            <th>EventName</th>
            <th>Description</th>
            <th>Required Scope</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <a href="">file_share</a>
            </td>
            <td>
            A file was shared
            </td>
            <td>
               files:read
            </td>
        </tr>
        <tr>
            <td>
                <a href="">message.channels</a>
            </td>
            <td>
                A message was posted to a channel
            </td>
            <td>
                channesls:history
            </td>
        </tr>
    </tbody>
</table>

<img src="../photos/slack/Bot-and-User-Events.png">

<br/>
<br/>

12. Next up select the _Interactivity & Shortcuts_ sidebar and toggle the switch as on. Again for the Request URL enter your ngrok URL appended with /slack/events

```bash
Request URL: https://your-own-url.ngrok.io/slack/events
```

<img src="../photos/slack/interactivity.png" width="400">

13. Scroll down to the _Select Menus_ section, in the Options Load URL, enter your ngork URL appended with /slack/events

```bash
Options Load URL: https://your-own-url.ngrok.io/slack/events
```

<img src="../photos/slack/select-menus.png" width="400">

14. Finally we come to the slash commands. Slack's custom slash commands perform a very simple task: they take whatever text you enter after the command itself (along with some other predefined values), send it to a URL, then accept whatever the script returns and posts it as a Slackbot message to the person who issued the command. We have 5 slash commands to be added in the workspace.

Head over to the _Slash Commands_ sidebar and click on the `Create New Command` button to head over the Create New Command page.
Add the Command, Request URL,Short Description and Usage hint, according to the table provided below.

Click on Save to return to the _Slash Commands_

<table>
    <thead>
        <tr>
            <th>Command</th>
            <th>Request URL</th>
            <th>Short Description</th>
            <th>Usage Hint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
            /s3-get
            </td>
            <td>
            https://your-own-url.ngrok.io/slack/events
            </td>
            <td>
            Get a file from s3 bucket
            </td>
            <td>
            filename
            </td>
        </tr>
        <tr>
            <td>
            /s3-search
            </td>
            <td>
            https://your-own-url.ngrok.io/slack/events
            </td>
            <td>
            Search for a file in S3
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
            /s3-delete
            </td>
            <td>
            https://your-own-url.ngrok.io/slack/events
            </td>
            <td>
            Deletes the given file from the s3 bucket
            </td>
            <td>
            filename
            </td>
        </tr>
        <tr>
            <td>
            /summarise-document
            </td>
            <td>
            https://your-own-url.ngrok.io/slack/events
            </td>
            <td>
            Summarise a document
            </td>
            <td>
            filename
            </td>
        </tr>
    </tbody>
</table>

<br/>
<img src="../photos/slack/s3-get.png" width="400">
<img src="../photos/slack/s3-search.png" width="400">
<img src="../photos/slack/s3-delete.png" width="400">
<img src="../photos/slack/summarise-document.png" width="400">
<img src="../photos/slack/slash-commands.png" width="400">

15. Watch the [video]() to know more about using these slack commands

16. Open the slack channel and upload a file in any channel, note the file name
