from dotenv import load_dotenv
from pathlib import Path
import boto3
import os

env_path = Path('.')/'.env'
load_dotenv(dotenv_path=env_path)

if __name__ == "__main__":
    s3_client = boto3.client('s3',
                              region_name="us-east-1",
                              aws_access_key_id=str(os.environ.get('AWS_ACCESS_KEY_ID')), aws_secret_access_key=str(os.environ.get('AWS_SECRET_ACCESS_KEY'))
                              )

    file_name = "resume_data.csv"
    file_path = os.path.join(os.getcwd(), 'uploads', file_name)
    response = s3_client.upload_file(
                Filename=file_path, Bucket=str(os.environ.get('BUCKET_NAME')), Key=file_name)
    print(response)
    resource = boto3.resource('s3',
                              region_name="us-east-1",
                              aws_access_key_id=str(os.environ.get('AWS_ACCESS_KEY_ID')), aws_secret_access_key=str(os.environ.get('AWS_SECRET_ACCESS_KEY'))
                              )
    bucket = resource.Bucket('str(os.environ.get('BUCKET_NAME'))')
    #print(bucket)
    for my_bucket_object in bucket.objects.all():
        print(my_bucket_object)

