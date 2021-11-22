# -*- coding: utf-8 -*-
import requests

from zato.server.service import Service

class GetContactsGoogle(Service):

    name: 'contact.google-user-contacts'
    def handle(self):

        access_token = self.request.payload['access_token']
        self.logger.info('access_token `%s`', access_token)

        contacts_google = requests.get('https://www.google.com/m8/feeds/contacts/default/full?access_token=' + access_token)
        self.logger.info('Google Contacts `%s`', contacts_google)

        self.logger.info('Google Contacts `%s`', self.PrintAllContacts(contacts_google))

        self.response.payload = contacts_google
        self.response.status_code = 200

    def PrintAllContacts(gd_client):
        feed = gd_client.GetContacts()
        for i, entry in enumerate(feed.entry):
            print('\n%s %s' % (i+1, entry.name.full_name.text))
            if entry.content:
                print('    %s' % (entry.content.text))
            # Display the primary email address for the contact.
            for email in entry.email:
                if email.primary and email.primary == 'true':
                    print('    %s' % (email.address))
            # Show the contact groups that this contact is a member of.
            for group in entry.group_membership_info:
                print('    Member of group: %s' % (group.href))
            # Display extended properties.
            for extended_property in entry.extended_property:
                if extended_property.value:
                    value = extended_property.value
                else:
                    value = extended_property.GetXmlBlob()
                print('    Extended Property - %s: %s' % (extended_property.name, value))
