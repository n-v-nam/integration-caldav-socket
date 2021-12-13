import requests
import json
from zato.server.service import Service

class EventCalendarGoogle(Service):

    name: 'google.action-event'
    def handle_PUT(self):

        access_token = self.request.payload['access_token']
        calendarId = self.request.payload['calendarId']
        eventId = self.request.payload['eventId']
        data = self.request.payload['data']
        sendUpdates = self.request.payload['sendUpdates']
        self.logger.info('access_token `%s`', access_token)
        self.logger.info('calendarId `%s`', calendarId)
        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        events = requests.put('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId + '?sendUpdates=' + sendUpdates, headers=headers, data=json.dumps(data))
        self.logger.info('Google Calendar `%s`', events)

        self.response.payload = events.json()
        self.response.status_code = 200

    def handle_POST(self):

        access_token = self.request.payload['access_token']
        calendarId = self.request.payload['calendarId']
        eventId = self.request.payload['eventId']
        self.logger.info('access_token `%s`', access_token)
        self.logger.info('calendarId `%s`', calendarId)
        headers = {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'}

        events = requests.delete('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId, headers=headers)
        self.logger.info('Google Calendar `%s`', events)
        
        self.response.payload = ''
        self.response.status_code = 200

    def handle_OPTIONS(self):

        # We only allow requests from this particular origin
        allow_from_name = 'Access-Control-Allow-Origin'        
        allow_from_value = 'http://localhost:8080'

        self.response.headers[allow_from_name] = allow_from_value