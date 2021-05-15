import requests
import os
from botocore.exceptions import ClientError
from redisearch_connector import RediSearchConnector
from redisjson_connector import RedisJsonConnector


async def upload_file_to_s3(s3_client, rs_client: RediSearchConnector, rj_client: RedisJsonConnector, file_data, token):
    """ Gets a file from slack and uploads it to a Cortx S3 bucket

    Parameters
    ----------
    s3_client : botocore.client.S3
        A low-level client representing Simple Storage Service (S3)

    rs_client : redisearch_connector.RediSearchConnector
        RediSearch client

    rj_client: redisjson_connector.RedisJsonConnector
        RedisJSON client

    file_data : dict
        File data from slack

    token: str
        A user access token from slack

    Returns
    ----------
    bool: Returns true if the file was uploaded to S3

    """
    # search for existing file on elastic search
    try:

        file_id = file_data['id']
        file_name = file_data['name']
        created = file_data['created']
        timestamp = file_data['timestamp']
        mimetype = file_data['mimetype']
        filetype = file_data['filetype']
        user_id = file_data['user']
        size = file_data['size']

        url = file_data['url_private']
        file_path = os.path.join(os.getcwd(), 'uploads', file_name)

        print("Saving to", file_name)

        headers = {'Authorization': 'Bearer ' + token}

        r = requests.get(url, headers=headers)

        with open(file_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        if os.path.exists(file_path):
            print(file_path)
            print(file_name)
            response = s3_client.upload_file(
                Filename=file_path, Bucket=str(os.environ.get('BUCKET_NAME')), Key=file_name)
            print(response)
            print("added file to s3")
            rs_client.create_doc(file_id=file_id, file_name=file_name, created=created,
                                 timestamp=timestamp, mimetype=mimetype, filetype=filetype, user_id=user_id, size=size)

            rj_client.add_json_document(file_name=file_name,file_id=file_id, created=created,timestamp=timestamp,mimetype=mimetype,filetype=filetype, user_id=user_id,size=size)


        if os.path.exists(file_path):
            os.remove(path=file_path)
        print("File uploaded to S3 with key {}".format(file_name))
        # print(response)

    except ClientError as e:
        print("Couldn't upload to s3")
        print(e)
        return False
    except Exception as e:
        print(e)
        return False
    return True



