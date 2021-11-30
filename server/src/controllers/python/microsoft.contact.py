# -*- coding: utf-8 -*-
import requests
import base64
from zato.server.service import Service

class GetContactMicrosoft(Service):

    name: 'microsoft.contact'
    def handle(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)
        
        headers = {'Authorization': 'Bearer ' + access_token}

        info = requests.get('https://graph.microsoft.com/v1.0/me/contacts', headers=headers)
        self.logger.info('Microsoft contact `%s`', info.json())

        self.response.payload = info.json()

        self.response.status_code = 200