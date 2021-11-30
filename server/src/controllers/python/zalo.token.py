# -*- coding: utf-8 -*-
import requests
import json

from zato.server.service import Service

class GetTokenZalo(Service):

    name: 'zalo.token'
    def handle(self):

        secret_key = self.request.payload['secret_key']
        data = self.request.payload['data']

        self.logger.info('data `%s`', data)

        headers = {'secret_key': secret_key, 'Content-Type': 'application/x-www-form-urlencoded'}

        token = requests.post('https://oauth.zaloapp.com/v4/access_token', headers=headers, data=data)
        self.logger.info('Google Contacts `%s`', token)

        self.response.payload = token.json()
        self.response.status_code = 200