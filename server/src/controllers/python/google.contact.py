# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetContactsGoogle(Service):

    name: 'google.contact'
    def handle_POST(self):

        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        contacts_google = requests.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' + access_token)
        self.logger.info('Google Contacts `%s`', contacts_google.json())

        self.response.payload = contacts_google.json()
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value
