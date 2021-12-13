# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetCalendarGoogle(Service):

    name: 'google.get-events'
    def handle_POST(self):

        access_token = self.request.payload['access_token']
        calendarId = self.request.payload['calendarId']
        self.logger.info('access_token `%s`', access_token)
        self.logger.info('calendarId `%s`', calendarId)
        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        events = requests.get('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events', headers=headers)
        self.logger.info('Google Calendar `%s`', events)

        self.response.payload = events.json()
        self.response.status_code = 200
    
    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value