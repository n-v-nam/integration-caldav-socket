# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function, unicode_literals

# Zato
from zato.server.service import Service

class SMSAdapter(Service):
    """ Sends template-based text messages to users given on input.
    """
    name = 'sms.adapter'

    def handle(self):

        # Get phone number from DB
        phone_number = self.request.payload['to']

        # Convert the template to an actual message
        msg = self.request.payload['message']

        # Get connection to Twilio
        sms = self.out.sms.twilio.get('SMS')

        # Send messages
        sms.conn.send(msg, to=phone_number)