# -*- coding: utf-8 -*-
import requests
import json

from zato.server.service import Service

class ActionEventMicrosoft(Service):

    name: 'microsoft.action-event'
s
    def handle_POST(self):

        access_token = self.request.payload['access_token']
        eventId = self.request.payload['eventId']
        self.logger.info('access_token `%s`', access_token)

        headers = {
            'Authorization': 'Bearer ' + access_token
        }

        event = requests.delete('https://graph.microsoft.com/v1.0/me/events/'  + eventId, headers=headers)
        self.logger.info('DELETE Microsoft Event `%s`', event)

        self.response.payload = ''
        self.response.status_code = 200

    def handle_PUT(self):

        access_token = self.request.payload['access_token']
        eventId = self.request.payload['eventId']
        self.logger.info('access_token `%s`', access_token)
        data = self.request.payload['data']

        headers = {
            'Authorization': 'Bearer ' + access_token, 'Prefer': 'outlook.timezone="Asia/Ho_Chi_Minh"', 'Content-Type': 'application/json'
        }

        event = requests.put('https://graph.microsoft.com/v1.0/me/events/' + eventId, headers=headers, data=json.dumps(data))
        self.logger.info('PUT Microsoft Event `%s`', event)

        self.response.payload = event.json()
        self.response.status_code = 200
    
    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value