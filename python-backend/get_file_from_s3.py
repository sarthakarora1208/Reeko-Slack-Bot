import os
from botocore.exceptions import ClientError
from redisearch_connector import RediSearchConnector
from redisjson_connector import RedisJsonConnector


async def get_file_from_s3(s3_client, rs_client: RediSearchConnector, rj_client: RedisJsonConnector, file_name):
    """ Gets a file from a S3 bucket and uploads it to slack

    Parameters
    ----------
    s3_client : botocore.client.S3
        A low-level client representing Cortx Simple Storage Service (S3)

    rs_client : redisearch_connector.RediSearchConnector
        RediSearch client

    rj_client: redisjson_connector.RedisJsonConnector
        RedisJSON client

    file_name: str
        File name

    Returns
    ----------
    bool: Returns true if the file was downloaded from S3

    """
    try:
        if(rj_client.check_if_document_exists(file_name=file_name)):
            # if(True):
            file_path = os.path.join(os.getcwd(), 'downloads', file_name)
            response = s3_client.download_file(
                Bucket=str(os.environ.get('BUCKET_NAME')), Key=file_name, Filename=file_path)
        else:
            print("File not found in RS")
            return False
    except ClientError as e:
        print("Couldn't get file from s3")
        return False
    except Exception as e:
        print(e)
        return False
    return True
