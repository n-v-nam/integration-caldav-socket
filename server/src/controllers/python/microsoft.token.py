# -*- coding: utf-8 -*-
import requests
import json

from zato.server.service import Service

class GetTokenMicrosoft(Service):

    name: 'microsoft.token'
    def handle_POST(self):

        origin = self.request.payload['origin']
        data = self.request.payload['data']

        self.logger.info('data `%s`', data)

        headers = {'Origin': origin, 'Content-Type': 'application/x-www-form-urlencoded'}

        token = requests.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', headers=headers, data=data)
        self.logger.info('Microsoft Token `%s`', token)

        self.response.payload = token.json()
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value