# Reeko Slack Bot Documentation

This document provides details for each slash command. It shows how Redis is used and **the Redis commands to store and retrieve data.**

## Table of Contents

- [Reeko Slack Bot Documentation](#Reeko-Slack-Bot-Documentation)
  - [File shared on Slack](#File-shared-on-Slack)
  - [Slash Commands](#slash-commands)
    - [/s3-get](#s3-get)
    - [/s3-search](#s3-search)
    - [/s3-delete](#s3-delete)
    - [/summarise-document](#summarise-document)

## File shared on Slack

Whenever a new file is shared in any public slack channel the <a href="https://api.slack.com/events/file_shared#:~:text=The%20file_shared%20event%20is%20sent,the%20files.info%20API%20method."> <em>file_share event</em></a> is sent to the Slack app.

Initialising RediSearch in redissearch_connector.py. Creating an index with the name `file_index`.

```py
from redisearch import Client, TextField, AutoCompleter, Suggestion

class RedisSearchConnector():
    def __init__(self):
        self.index_name = 'file_index'
        self.client = Client(self.index_name)
        self.ac = AutoCompleter(self.index_name)
```

Initialisiing RedisJSON in redisjson_connector.py

```py
from rejson import Client, Path

class RedisJsonConnector():
    def __init__(self):
        self.rj = Client(decode_responses=True)

```

```json
file_data = {
  "file_id": "F021THCTFJ7",
  "file_name": "amazonpdf",
  "created": 1620902755,
  "timestamp": 1620902755,
  "mimetype": "application/pdf",
  "filetype": "pdf",
  "user_id": "U01U4DV4C8J",
  "size": 345142,
  "summary": "",
  "image_file_path": ""
}
```
