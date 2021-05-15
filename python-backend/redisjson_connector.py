from rejson import Client, Path


class RedisJsonConnector():
    def __init__(self, host="localhost",port=6379):
        self.rj = Client(decode_responses=True)

    def add_json_document(self,file_name,file_id, created, timestamp, mimetype, filetype, user_id, size):
        """Added document to Redis JSON"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        print(file_name)
        file_data = {
            "file_id": str(file_id),
            "file_name": file_name,
            "created": str(created),
            "timestamp": str(timestamp),
            "mimetype": str(mimetype),
            "filetype": str(filetype),
            "user_id": str(user_id),
            "size": str(size),
            "summary": "",
            "image_file_path": "",
        }
        self.rj.jsonset(file_name, Path.rootPath(), file_data)

    def check_if_document_exists(self, file_name):
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        return self.rj.jsonget(file_name,Path.rootPath()) != None

    def delete_json_document(self,file_name):
        """Delete JSON document"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        return self.rj.jsondel(file_name,Path.rootPath())

    def add_summary(self,file_name, summary):
        """Add Summary to JSON document"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        return self.rj.jsonset(file_name, Path(".summary"), summary)

    def add_image_path(self,file_name, image_file_path):
        """Add Image Path to JSON document"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        return self.rj.jsonset(file_name, Path('.image_file_path'),image_file_path)

    def get_json_document(self,file_name):
        """Get Document"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        return self.rj.jsonget(file_name, Path.rootPath())
    def check_if_summary_added(self,file_name):
        """Check if the summary is added"""
        characters = [character for character in file_name if character.isalnum()]
        file_name = "".join(characters)
        summary = self.rj.jsonget(file_name, Path(".summary"))
        if(len(summary) == 0):
            return False
        else:
            return True

def main():
    rj = RedisJsonConnector()
    #rj.add_json_document(file_name="1.pdf",file_id=123,created="123", timestamp="123",mimetype="csv",filetype="csv",user_id="123",size="123")
    # rj.add_json_document(file_name="Laughing_boy.jpeg",file_id="F021XKJTPB6", created=1620851569, timestamp=1620851569, mimetype="image/jpeg", filetype="jpg", user_id="U01U4DV4C8J", size=17482)
    print(rj.check_if_summary_added("unicef-report-short.pdf"))
    #rj.add_summary('1.pdf',"This is a summary")
    #print(rj.check_if_document_exists("1.pdf"))
    #print(rj.check_if_summary_added('amazon.pdf'))
    #print(rj.add_image_path('amazon.pdf','https://bucket-1234.s3.amazonaws.com/411b0200-7068-4065-8ec4-bd955ac94fe0-image.png'))

    #print(rj.add_json_document(file_name="abc",file_id=, created=created,timestamp=timestamp,mimetype=mimetype,filetype=filetype, user_id=user_id,size=size))
    #rj.add_image_path("1.pdf","image_path.jpg")


if __name__ == '__main__':
    #pass
    main()
