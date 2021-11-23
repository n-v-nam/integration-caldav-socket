# -*- coding: utf-8 -*-
import requests
import base64
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from zato.server.service import Service

class SendMailGoogle(Service):

    name: 'api.google-send-mail'
    def handle(self):

        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)
        message_text = self.request.payload['message']
        message = MIMEText(message_text)
        message['to'] = self.request.payload['to']
        message['subject'] = self.request.payload['subject']
        raw = base64.urlsafe_b64encode(message.as_bytes())
        raw = raw.decode()

        data = {'raw': raw}
        self.logger.info('data `%s`', data)


        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        sendMail = requests.post('https://www.googleapis.com/gmail/v1/users/me/messages/send', headers=headers, data=json.dumps(data))
        self.logger.info('Google Contacts `%s`', sendMail)

        self.response.payload = sendMail.json()
        self.response.status_code = 200