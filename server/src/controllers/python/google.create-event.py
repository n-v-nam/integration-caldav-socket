# -*- coding: utf-8 -*-
import requests
import json
from zato.server.service import Service

class CreateCalendarGoogle(Service):

    name: 'google.create-event'
    def handle_POST(self):

        access_token = self.request.payload['access_token']
        calendarId = self.request.payload['calendarId']
        data = self.request.payload['data']
        sendUpdates = self.request.payload['sendUpdates']
        self.logger.info('access_token `%s`', access_token)
        self.logger.info('calendarId `%s`', calendarId)
        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        events = requests.post('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events' + '?sendUpdates=' + sendUpdates, headers=headers, data=json.dumps(data))
        self.logger.info('Google Calendar `%s`', events)

        self.response.payload = events.json()
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value