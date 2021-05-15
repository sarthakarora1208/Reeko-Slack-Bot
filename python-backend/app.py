import os
import boto3
import asyncio
import redis
from csv import reader
from pathlib import Path
from dotenv import load_dotenv
from botocore.exceptions import ClientError
from slack_bolt.async_app import AsyncApp
from slack_sdk.errors import SlackApiError

from redisearch_connector import RediSearchConnector
from redisjson_connector import RedisJsonConnector
from upload_file_to_s3 import upload_file_to_s3
from get_file_from_s3 import get_file_from_s3
from get_summary_from_document import get_summary_from_document
from create_image import create_image


env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


# connections
conn = redis.Redis(host='localhost', port='6379')
if not conn.ping():
        raise Exception('Redis unavailable')

# Create RediSearchConnector
rs_client = RediSearchConnector()

# Create RedisJsonConnector
rj_client = RedisJsonConnector()


# Creating a Bolt app
app = AsyncApp(
    token=os.environ.get("SLACK_BOT_TOKEN"),
    signing_secret=os.environ.get("SLACK_SIGNING_SECRET"),
)

# Creating a S3 client
s3_client = boto3.client('s3',region_name='us-east-1',aws_access_key_id=str(os.environ.get('AWS_ACCESS_KEY_ID')),
                               aws_secret_access_key=str(os.environ.get('AWS_SECRET_ACCESS_KEY')))


# Creating an AWS Textract client
textract_client = boto3.client('textract', aws_access_key_id=str(os.environ.get('AWS_ACCESS_KEY_ID')),
                               aws_secret_access_key=str(os.environ.get('AWS_SECRET_ACCESS_KEY')))



@app.middleware  # or app.use(log_request)
async def log_request(body, next):
    return await next()


@app.event({
    "type": "message",
    "subtype": "file_share"
})
async def file_shared(event, say, ack):
    """Whenever a new file is shared in any slack channel, add it to s3 bucket"""
    await ack()
    channel_id = event["channel"]
    user_id = event['user']
    file_data = event['files'][0]
    await say(text="{} uploaded to s3 bucket!".format(file_data["name"]), channel=channel_id)

    await upload_file_to_s3(s3_client=s3_client, rs_client=rs_client, rj_client=rj_client,file_data=file_data, token=os.environ.get(
        "SLACK_USER_TOKEN"))


@app.command('/s3-get')
async def cortx_s3_get(ack, say, command, payload, respond):
    """
    Find a file from s3 and send it to the user privately
    """
    await ack()
    file_name = command['text']
    channel_id = payload["user_id"]
    await say(text="Trying to find {} in the S3 bucket".format(
        file_name), channel=channel_id)
    isFileFound = await get_file_from_s3(s3_client=s3_client, rs_client=rs_client,rj_client=rj_client, file_name=file_name)
    if isFileFound:
        isDownloaded = False
        counter = 0
        file_path = os.path.join(os.getcwd(), 'downloads', file_name)
        await say(text="Here is your file".format(
            file_name), channel=channel_id)
        # Call the files.upload method using the WebClient
        # Uploading files requires the `files:write` scope
        while(isDownloaded == False and counter < 20):
            if(os.path.exists(file_path)):
                try:
                    result = await app.client.files_upload(
                        channels=channel_id,
                        # initial_comment="{}".format(
                        #    file_name),
                        file=file_path,
                    )
                    isDownloaded = True

                except SlackApiError as e:
                    print("Error uploading file: {}".format(e))
                    await say(text="There was an error with slack! Please try again in a while".format(
                        file_name), channel=channel_id)
            else:
                await asyncio.sleep(1)
                counter += 1
            # print(result)
        if os.path.exists(file_path):
            os.remove(path=file_path)
    else:
        await say(text="Sorry! No file was found with the name {}".format(
            file_name), channel=channel_id)


@app.command("/s3-search")
async def s3_search(body, ack, respond, client):
    """Search for a file on the s3 bucket. Enter a first three words"""
    await ack(
        text="Accepted!",
        blocks=[
            {
                "type": "section",
                "block_id": "b",
                "text": {
                    "type": "mrkdwn",
                    "text": "Opening file search dialog",
                },
            }
        ],
    )

    res = await client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "search",
            "title": {
                    "type": "plain_text",
                    "text": "Search S3 Bucket"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": True
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": True
            },
            "blocks": [
                {
                    "type": "input",
                    "block_id": "my_block",
                    "element": {
                            "type": "external_select",
                            "action_id": "file_select",
                            "min_query_length": 3,
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "What are you looking for?"
                                }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Search for your file!",
                        "emoji": True
                    }
                }
            ]
        }
    )


@app.options("file_select")
async def show_options(ack, body, payload):
    """Populates the options with all the search results from elasticsearch
        For Example: -
        'abc' will give 'abc.csv', 'abcd.csv' ,'abcde.csv' as results
    """

    options = []
    search_term = body["value"]
    files_found = rs_client.search(search_term)
    for file_name in files_found:
        #file = rj_client.get_json_document(file_name)
        print(file_name)
        options.append(
            {"text": {"type": "plain_text", "text": file_name}, "value": file_name})
    await ack(options=options)


@app.view("search")
async def view_submission(ack, say, body,client):
    await ack()
    file_name = body["view"]["state"]["values"]["my_block"]["file_select"]["selected_option"]["value"]
    channel_id = body["user"]["id"]
    await say(text="Getting {} ".format(
        file_name), channel=channel_id)
    isFileFound = await get_file_from_s3(s3_client, rs_client,rj_client, file_name)
    if isFileFound:
        isDownloaded = False
        counter = 0
        # Call the files.upload method using the WebClient
        # Uploading files requires the `files:write` scope
        while(isDownloaded == False and counter < 20):
            file_path = os.path.join(os.getcwd(), 'downloads', file_name)
            if(os.path.exists(file_path)):
                try:
                    result = await app.client.files_upload(
                        channels=channel_id,
                        # initial_comment="{}".format(
                        #    file_name),
                        file=file_path,
                    )
                    isDownloaded = True
                except SlackApiError as e:
                    print("Error uploading file: {}".format(e))
                    await say(text="There was an error with slack! Please try again in a while".format(
                        file_name), channel=channel_id)
            else:
                await asyncio.sleep(1)
                counter += 1
    else:
        await say(text="Sorry! No file was found with the name {}".format(
            file_name), channel=channel_id)


@app.command('/s3-delete')
async def s3_delete(ack, say, command, payload, respond):
    """
    Delete a file from cortx s3 given the filename
    """
    file_name = command['text']
    channel_id = payload["user_id"]

    if(rj_client.check_if_document_exists(file_name=file_name)):
        await ack(blocks=[
            {
                "type": "section",
                "block_id": "b",
                "text": {
                    "type": "mrkdwn",
                    "text": "Are you sure you want to permanently delete {} from the s3 bucket ?".format(file_name),
                },
                "accessory": {
                    "type": "button",
                    "action_id": "delete_file_button",
                    "text": {"type": "plain_text", "text": "Delete"},
                    "value": file_name,
                    "style": "danger"
                },
            }
        ])
    else:
        await ack(
            blocks=[
                {
                    "type": "section",
                    "block_id": "b",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":negative_squared_cross_mark: No file found with the name {}".format(
                            file_name
                        ),
                    },
                }
            ],
        )


@app.action('delete_file_button')
async def delete_file_button_clicked(ack, body, respond):
    """
    This function is called when the delete file button is clicked on slack
    """
    file_name = body["actions"][0]["value"]
    await ack()
    try:

        response = s3_client.delete_object(Bucket=str(os.environ.get('BUCKET_NAME')), Key=file_name)
        rs_client.delete_doc(file_name)
        rj_client.delete_json_document(file_name)
        await respond(
            blocks=[
                {
                    "type": "section",
                    "block_id": "b",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":white_check_mark: {} was deleted. :wastebasket:".format(
                            file_name
                        ),
                    },
                }
            ],
        )

    except ClientError as e:
        await respond(
            blocks=[
                {
                    "type": "section",
                    "block_id": "b",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":X: Couldn't delete {} from S3".format(
                            file_name
                        ),
                    },
                }
            ],
        )
        print(e)


@app.command('/summarise-document')
async def summarise_document(ack,say,command,payload,client,respond):
    await ack()
    file_name = command['text']
    #channel_id = body["user"]["id"]
    channel_id = payload["user_id"]
    await say(text="Summarising {}".format(file_name), channel=channel_id)
    is_summarised = rj_client.check_if_summary_added(file_name)
    print("Is summarised")
    print(is_summarised)
    document = {}
    if is_summarised:
        pass
    else:
        isFileFound = await get_file_from_s3(s3_client=s3_client, rs_client=rs_client,rj_client=rj_client, file_name=file_name)
        if isFileFound:

            isDownloaded = False
            counter = 0
            file_path = os.path.join(os.getcwd(), 'downloads', file_name)
            while(isDownloaded == False and counter < 20):
                if(os.path.exists(file_path)):
                    isDownloaded = True
                    summary = await get_summary_from_document(textract_client=textract_client,file_name=file_name)
                    print(summary)
                    image_url = await create_image(file_name,summary)
                    print(image_url)
                    rj_client.add_summary(file_name,summary)
                    rj_client.add_image_path(file_name,image_url)
                else:
                    await asyncio.sleep(1)
                    counter += 1
        else:
            await say(text="Sorry! No file was found with the name {}".format(
                file_name), channel=channel_id)

    document = dict(rj_client.get_json_document(file_name))
    await respond(
            blocks=[{
			    "type": "image",
			    "title": {
				    "type": "plain_text",
				    "text": "Document summary for {}".format(file_name)
			    },
			    "block_id": "image4",
			    "image_url": document["image_file_path"],
			    "alt_text": document["summary"]
		        }
            ],
    )
    print(document)

@app.event("file_shared")
async def file_was_shared():
    pass


@app.event({
    "type": "message",
    "subtype": "message_deleted"
})
async def file_delete():
    pass

if __name__ == '__main__':
    app.start(port=int(os.environ.get("PORT", 3000)))
