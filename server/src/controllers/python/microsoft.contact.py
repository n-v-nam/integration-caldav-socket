# -*- coding: utf-8 -*-
import requests
import base64
from zato.server.service import Service

class GetContactMicrosoft(Service):

    name: 'microsoft.contact'
    def handle_POST(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)
        
        headers = {'Authorization': 'Bearer ' + access_token}

        info = requests.get('https://graph.microsoft.com/v1.0/me/contacts', headers=headers)
        self.logger.info('Microsoft contact `%s`', info.json())

        self.response.payload = info.json()

        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value