# -*- coding: utf-8 -*-
import requests
import json

from zato.server.service import Service

class EventMicrosoft(Service):

    name: 'microsoft.event'
    def handle_POST(self):

        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)


        headers = {
            'Authorization': 'Bearer ' + access_token, 'Prefer': 'outlook.body-content-type=text', 'Prefer': 'outlook.timezone="Asia/Ho_Chi_Minh"'
        }

        event = requests.get('https://graph.microsoft.com/v1.0/me/events', headers=headers)
        self.logger.info('GET Microsoft Event `%s`', event)

        self.response.payload = event.json()
        self.response.status_code = 200

    def handle_PUT(self):

        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)
        data = self.request.payload['data']


        headers = {
            'Authorization': 'Bearer ' + access_token, 'Prefer': 'outlook.timezone="Asia/Ho_Chi_Minh"', 'Content-Type': 'application/json'
        }

        event = requests.post('https://graph.microsoft.com/v1.0/me/events', headers=headers, data=json.dumps(data))
        self.logger.info('POST Microsoft Event `%s`', event)

        self.response.payload = event.json()
        self.response.status_code = 200