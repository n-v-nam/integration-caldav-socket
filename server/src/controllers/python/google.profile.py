# -*- coding: utf-8 -*-

# Zato
import requests

from zato.server.service import Service

class GetProfileGoogle(Service):

    name: 'google.profile'

    def handle_POST(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        basic_profile_google = requests.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + access_token)
        self.logger.info('Google Profile `%s`', basic_profile_google.json())

        self.response.payload = basic_profile_google.json()
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value