# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetProfileZalo(Service):

    name: 'zalo.profile'
    def handle(self):
        self.logger.info(self.request.payload)
        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        headers = {'access_token': access_token}

        basic_profile = requests.get('https://graph.zalo.me/v2.0/me?fields=id,name,picture', headers=headers)
        self.logger.info('Zalo Profile `%s`', basic_profile.json())

        self.response.payload = basic_profile.json()
        self.response.status_code = 200