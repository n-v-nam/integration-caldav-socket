# -*- coding: utf-8 -*-
import requests
import base64
from io import StringIO
from zato.server.service import Service

class GetAvatarMirosoft(Service):

    name: 'microsoft.picture'
    def handle_POST(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)
        
        headers = {'Authorization': 'Bearer ' + access_token}

        photo_response = requests.get('https://graph.microsoft.com/v1.0/me/photo/$value', stream=True, headers=headers)
        photo = photo_response.raw.read()
        res = base64.b64encode(photo).decode('utf-8')
        
        self.response.payload = res

        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value