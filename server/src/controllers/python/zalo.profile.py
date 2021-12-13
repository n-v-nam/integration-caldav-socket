# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetProfileZalo(Service):

    name: 'zalo.profile'
    def handle_POST(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        headers = {'access_token': access_token}

        basic_profile = requests.get('https://graph.zalo.me/v2.0/me?fields=id,name,picture', headers=headers)
        self.logger.info('Zalo Profile `%s`', basic_profile.json())

        self.response.payload = basic_profile.json()
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value