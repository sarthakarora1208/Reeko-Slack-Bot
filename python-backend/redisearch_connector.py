import os
import json
from redisearch import Client, TextField, AutoCompleter,Suggestion
from redis import ResponseError

class RediSearchConnector():

    def __init__(self):
        self.index_name = 'file_index'
        self.client = Client(self.index_name)
        self.ac = AutoCompleter(self.index_name)
        self.create_index_if_not_exists()


    def create_index_if_not_exists(self):
        """Create an index"""
        SCHEMA = (
            TextField('file_name',sortable=True),TextField('file_id'),TextField('created'),TextField('timestamp'),TextField('mimetype'),TextField('filetype'),TextField('user_id'), TextField("size")
        )
        try:
            self.client.info()
        except ResponseError:
            self.client.create_index(SCHEMA)

    def create_doc(self, file_id, file_name, created, timestamp, mimetype, filetype, user_id, size):
        """Add a document"""
        res = self.client.add_document(file_name, file_name=file_name, file_id=file_id, created=created,timestamp=timestamp,mimetype=mimetype,filetype=filetype,user_id=user_id, size=size)
        res = self.ac.add_suggestions(Suggestion(file_name, 1.0))
    def delete_doc(self, file_name):
        self.ac.delete(file_name)
        return self.client.delete_document(file_name)
    def search(self, text: str):
        suggestions_list = []
        suggestions = self.ac.get_suggestions(text, fuzzy = True)
        for suggestion in suggestions:
            suggestions_list.append(str(suggestion))
        print(suggestions_list)
        return suggestions_list
    def get_doc(self, file_name: str):
        return self.client.load_document(file_name)

if __name__ == "__main__":
    rs = RediSearchConnector()
    #rs.add_doc(file_id='F0200P2T50C', file_name='abc.py', created='1619173844',
    #              timestamp='1619173844', mimetype='video/mp4', filetype='mp4', user_id='U01U4DV4C8J', size='1807463')
    #print(rs.search('a'))
    print(rs.get_doc('Business-Report-Format.jpeg'))