# -*- coding: utf-8 -*-
import requests
import json
from zato.server.service import Service

class CreateCalendarGoogle(Service):

    name: 'google.create-event'
    def handle(self):

        access_token = self.request.payload['access_token']
        calendarId = self.request.payload['calendarId']
        data = self.request.payload['data']
        self.logger.info('access_token `%s`', access_token)
        self.logger.info('calendarId `%s`', calendarId)
        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        events = requests.post('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events', headers=headers, data=json.dumps(data))
        self.logger.info('Google Calendar `%s`', events)

        self.response.payload = events.json()
        self.response.status_code = 200