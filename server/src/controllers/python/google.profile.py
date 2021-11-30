# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetProfileGoogle(Service):

    name: 'google.profile'
    def handle(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        basic_profile_google = requests.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + access_token)
        self.logger.info('Google Profile `%s`', basic_profile_google.json())

        self.response.payload = basic_profile_google.json()
        self.response.status_code = 200
