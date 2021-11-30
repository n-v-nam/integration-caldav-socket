# -*- coding: utf-8 -*-
import requests
import json

from zato.server.service import Service

class GetTokenMicrosoft(Service):

    name: 'microsoft.token'
    def handle(self):

        origin = self.request.payload['origin']
        data = self.request.payload['data']

        self.logger.info('data `%s`', data)

        headers = {'Origin': origin, 'Content-Type': 'application/x-www-form-urlencoded'}

        token = requests.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', headers=headers, data=data)
        self.logger.info('Google Contacts `%s`', token)

        self.response.payload = token.json()
        self.response.status_code = 200