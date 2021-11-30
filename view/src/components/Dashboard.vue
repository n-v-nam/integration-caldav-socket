<!-- @format -->

<template>
  <div class="home">
    <div class="flex justify-center item-center p-5">
      <vs-col class="flex item-center">
        <vs-button class="text-sm" @click="connectWithGoogle" icon="link"> Connect with Google </vs-button>
        <span class="m-2" v-if="connectedGoogle">Connected</span>
      </vs-col>
      <vs-col class="flex item-center">
        <vs-button class="text-sm" :disabled="connectedZalo" @click="connectWithZalo" icon="link"> Connect with Zalo </vs-button>
        <span class="m-2" v-if="connectedZalo">Connected</span>
      </vs-col>
      <vs-col class="flex item-center">
        <vs-button class="text-sm" @click="connectWithMicrosoft" icon="link"> Connect with Microsoft </vs-button>
        <span class="m-2" v-if="connectedMicrosoft">Connected</span>
      </vs-col>
    </div>
    <div class="px-5">
      <span class="text-black font-bold text-2xl">Informations</span>
      <vs-tabs>
        <vs-tab label="Google">
          <div>
            <div v-if="connectedGoogle">
              <vs-col vs-w="2.5">
                <BasicProfileGoogle />
              </vs-col>
              <vs-col class="mt-6 px-2" vs-w="4.5">
                <ContactGoogle @inviteContacts="inviteCreateEvent" @inviteContact="_inviteCreateEvent" @sendMail="beforeSendMail" />
              </vs-col>
              <vs-col vs-w="5">
                <CalendarGoogle @showEvent="beforeShowEvent" @createEvent="beforeCreateEvent" />
              </vs-col>
            </div>
            <div v-else>Please connect to your account Google...</div>
          </div>
        </vs-tab>
        <vs-tab label="Zalo">
          <div>
            <BasicProfileZalo />
          </div>
        </vs-tab>
        <vs-tab label="Microsoft">
          <div v-if="!connectedMicrosoft">
            <span>Please connect to your account Google...</span>
          </div>
          <div v-else>
            <vs-col vs-w="2.5">
              <BasicProfileMicrosoft />
            </vs-col>
            <vs-col class="mt-6 px-2"  vs-w="4.5">
              <ContactMicrosoft />
            </vs-col>
            <vs-col vs-w="5">
              <CalendarMicrosoft @showEvent="beforeShowEvent" @createEvent="beforeCreateEvent" />
            </vs-col>
          </div>
        </vs-tab>
        <vs-tab label="Synchronize">
          <Calendar/>
        </vs-tab>
      </vs-tabs>
    </div>

    <!-- POPUP Send Mail -->
    <vs-popup title="Create new mail:" :active.sync="isSend">
      <div>
        <span v-show="errorTo" class="mb-4 text-danger font-size-info" style="color: red">{{ errorTo }}</span>
      </div>
      <div>
        <vs-input class="w-3/4 mb-4 font-bold text-black" name="to" v-validate="'required'" placeholder="To" v-model="mailTo" />
      </div>
      <div>
        <vs-input class="w-3/4 mb-4 font-bold text-black" placeholder="Subject" v-model="mailSubject" />
      </div>
      <vs-textarea class="mb-2 font-bold" label="Message" v-model="mailMessage" />
      <div class="flex justify-end">
        <vs-button :disabled="errorTo" class="text-xs mx-2" @click="handleSendMail" icon="send">Send</vs-button>
        <vs-button class="text-xs" @click="clearMessage" icon="close">Cancel</vs-button>
      </div>
    </vs-popup>

    <!-- POPUP Create Event -->
    <vs-popup @close="clearEvent" title="Create Event" :active.sync="isCreateEvent">
      <div>
        <vs-input class="w-3/4 mb-4 font-bold text-black" name="eventTitle" placeholder="Title" v-model="eventTitle" />
      </div>
      <div>
        <div class="flex">
          <vs-input type="datetime-local" name="start" class="w-3/4 mb-4 font-bold text-black" v-validate="'required'" label="Start" v-model="dateTimeStart" />
          <vs-input type="datetime-local" name="end" class="w-3/4 mb-4 font-bold text-black" v-validate="'required'" label="End" v-model="dateTimeEnd" />
        </div>
      </div>
      <div>
        <vs-chips color="rgb(145, 32, 159)" placeholder="Attendees" v-model="eventAttendees" remove-icon="delete_forever">
          <vs-chip :key="attendees" @click="eventAttendees.splice(eventAttendees.indexOf(attendees), 1)" v-for="attendees in eventAttendees" closable close-icon="delete">
            {{ attendees }}
          </vs-chip>
        </vs-chips>
      </div>
      <vs-textarea class="mb-2 font-bold" label="Description" v-model="eventDescription" />
      <div class="flex justify-end">
        <vs-button color="danger" class="text-xs" @click="deleteEvent" icon="delete_forever">Delete</vs-button>
        <vs-button
          color="success"
          :disabled="errors.first('start') || !dateTimeStart || !dateTimeEnd || errors.first('end') || dateTimeEnd <= dateTimeStart"
          class="text-xs mx-2"
          @click="handleCreateEvent"
          icon="assignment"
          >{{ isShowEvent ? 'Update' : 'Create' }}</vs-button
        >
        <vs-button class="text-xs" @click="clearEvent" icon="close">Cancel</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import randomstring from 'randomstring'
import { encode as base64encode } from 'base64-arraybuffer'
import Calendar from './Synchronize/Calendar.vue'
import CalendarGoogle from './Google/Calendar.vue'
import CalendarMicrosoft from './Microsoft/Calendar.vue'
import ContactGoogle from './Google/Contact.vue'
import ContactMicrosoft from './Microsoft/Contact.vue'
import BasicProfileGoogle from './Google/BasicProfile.vue'
import BasicProfileZalo from './Zalo/BasicProfile.vue'
import BasicProfileMicrosoft from './Microsoft/BasicProfile.vue'

export default {
  name: 'Home',
  components: { Calendar, CalendarGoogle, CalendarMicrosoft, ContactGoogle, BasicProfileGoogle, BasicProfileZalo, BasicProfileMicrosoft, ContactMicrosoft },
  data() {
    return {
      tokenGoogle: null,
      isSend: false,
      isCreateEvent: false,
      isCreateEventGoogle: false,
      isCreateEventMicrosoft: false,
      isEditEvent: false,
      isShowEvent: false,
      isShowEventGoogle: false,
      isShowEventMicrosoft: false,
      mailTo: '',
      eventTitle: null,
      mailSubject: null,
      mailMessage: null,
      listConnection: [],
      dateTimeStart: null,
      dateTimeEnd: null,
      eventAttendees: [],
      eventDescription: null,
      eventId: null,
    }
  },
  computed: {
    connectedGoogle() {
      return this.listConnection.some((connect) => connect.mst_service_code == 'google')
    },
    connectedZalo() {
      return this.listConnection.some((connect) => connect.mst_service_code == 'zalo')
    },
    connectedMicrosoft() {
      return this.listConnection.some((connect) => connect.mst_service_code == 'microsoft')
    },
    errorTo() {
      const listMailTo = this.mailTo.split(', ')
      return listMailTo.some(
        (mail) =>
          !String(mail)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ) && this.mailTo
        ? 'Email invalid'
        : null
    },
  },
  methods: {
    ...mapActions({
      createConnect: 'userManagement/addConnection',
      getListConnection: 'userManagement/getListConnection',
      getAccessToken: 'userManagement/getAccessToken',
      sendMail: 'userManagement/sendMail',
      createEventGoogle: 'userManagement/createEventGoogle',
      createEventMicrosoft: 'userManagement/createEventMicrosoft',
      getEventGoogle: 'userManagement/getEventGoogle',
      getEventMicrosoft: 'userManagement/getEventMicrosoft',
      updateEventIdGoogle: 'userManagement/updateEventGoogle',
      updateEventIdMicrosoft: 'userManagement/updateEventMicrosoft',
      deleteEventIdGoogle: 'userManagement/deleteEventGoogle',
      deleteEventIdMicrosoft: 'userManagement/deleteEventMicrosoft',
      requestToken: 'userManagement/requestToken',
      requestTokenMicrosoft: 'userManagement/requestTokenMicrosoft',
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
      getContact: 'userManagement/getContact',
    }),
    async connectWithGoogle() {
      const googleUser = await this.$gAuth.signIn()
      const authToken = googleUser.getAuthResponse()
      console.log(authToken)

      if (authToken) {
        await this.createConnect({
          service_code: 'google',
          username: this.$store.state.userDefaults,
          token: authToken.access_token,
        })
        this.tokenGoogle = authToken.access_token
        this.listConnection = await this.getListConnection({
          username: this.$store.state.userDefaults,
        })
      }
    },
    beforeSendMail(mailTo = null) {
      this.clearMessage()
      this.isSend = true
      this.mailTo = mailTo
    },
    async handleSendMail() {
      const data = {
        to: this.mailTo,
        subject: this.mailSubject,
        message: this.mailMessage,
        access_token: this.tokenGoogle,
      }
      await this.sendMail(data)
        .then(() => {
          this.$vs.notify({
            time: 3000,
            position: 'bottom-right',
            title: '',
            text: 'Send Success !',
            color: 'success',
          })
        })
        .catch(() => {
          this.$vs.notify({
            time: 3000,
            position: 'bottom-right',
            title: '',
            text: 'Send Failed !',
            color: 'danger',
          })
        })
      this.isSend = false
    },
    async connectWithZalo() {
      const domain = window.location.hostname
      const code_verifier = randomstring.generate(43)
      localStorage.setItem('code_verifier', code_verifier)
      await this.generateCodeChallenge(code_verifier).then((res) => {
        window.location.href = `https://oauth.zaloapp.com/v4/permission?app_id=4214073985369805352&redirect_uri=https://${domain}&code_challenge=${res}&state=123`
      })
    },
    async connectWithMicrosoft() {
      const client_id = '0c594404-673a-4379-8c97-becedf7720e2'
      const code_verifier = randomstring.generate(44)
      localStorage.setItem('code_verifier', code_verifier)
      await this.generateCodeChallenge(code_verifier).then((res) => {
        window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_mode=query&scope=openid%20user.read%20offline_access%20Contacts.ReadWrite%20Calendars.ReadWrite&state=1234&code_challenge=${res}&code_challenge_method=S256`
      })
      // redirect to login
    },

    async generateCodeChallenge(codeVerifier) {
      const encoder = new TextEncoder()
      const data = encoder.encode(codeVerifier)
      const crypto = window.crypto || window.msCrypto
      const digest = await crypto.subtle.digest('SHA-256', data)
      const base64Digest = base64encode(digest)
      // you can extract this replacing code to a function
      return base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    },

    clearMessage() {
      this.isSend = false
      this.mailTo = null
      this.mailSubject = null
      this.mailMessage = null
    },
    clearEvent() {
      this.showEvent = false
      this.isCreateEventMicrosoft = false
      this.isCreateEventGoogle = false
      this.isShowEventGoogle = false
      this.isShowEventMicrosoft = false
      this.eventId = null
      ;(this.isCreateEvent = false), (this.dateTimeStart = null), (this.dateTimeEnd = null), (this.eventDescription = null), (this.eventAttendees = []), (this.eventTitle = null)
    },
    beforeShowEvent(attr, service) {
      if (service == 'google') {
        this.eventAttendees = attr.attendees ? attr.attendees.map((contact) => contact.email) : []
        this.dateTimeStart = attr.start.dateTime ? attr.start.dateTime.substring(0, 16) : attr.start.date + 'T00:00'
        this.dateTimeEnd = attr.end.dateTime ? attr.end.dateTime.substring(0, 16) : attr.end.date + 'T00:00'
        this.eventTitle = attr.summary
        this.eventDescription = attr.description
        this.eventId = attr.id
        this.isShowEvent = true
        this.isShowEventGoogle = true
        this.isShowEventMicrosoft = false
        this.isCreateEvent = true
      }
      if (service == 'microsoft') {
        this.eventAttendees = attr.attendees ? attr.attendees.map((contact) => contact.emailAddress.address) : []
        this.dateTimeStart = attr.start.dateTime ? attr.start.dateTime.substring(0, 16) : attr.start.date + 'T00:00'
        this.dateTimeEnd = attr.end.dateTime ? attr.end.dateTime.substring(0, 16) : attr.end.date + 'T00:00'
        this.eventTitle = attr.subject
        this.eventDescription = attr.body.content.replace(/<[^>]*>?/gm, '').trim()
        this.eventId = attr.id
        this.isShowEvent = true
        this.isShowEventGoogle = false
        this.isShowEventMicrosoft = true
        this.isCreateEvent = true
      }
    },
    beforeCreateEvent(day, service) {
      if (service == 'google') {
        this.isShowEvent = false
        this.dateTimeStart = day.id + 'T00:00'
        this.dateTimeEnd = day.id + 'T00:00'
        this.isCreateEvent = true
        this.isCreateEventGoogle = true
      }
      if (service == 'microsoft') {
        this.isShowEvent = false
        this.dateTimeStart = day.id + 'T00:00'
        this.dateTimeEnd = day.id + 'T00:00'
        this.isCreateEvent = true
        this.isCreateEventMicrosoft = true
      }
    },
    _inviteCreateEvent(email = null) {
      this.eventAttendees.push(email)
      this.isCreateEvent = true
    },
    inviteCreateEvent(listEmail) {
      this.eventAttendees = listEmail
      this.isCreateEvent = true
    },
    async deleteEvent() {
      if(this.isShowEventGoogle){
        await this.deleteEventIdGoogle({
          access_token: this.tokenGoogle,
          calendarId: this.getBasicProfile().google.email,
          eventId: this.eventId,
        })
        this.clearEvent()
        await this.getEventGoogle({ access_token: this.tokenGoogle, calendarId: this.getBasicProfile().google.email })
      }
      if(this.isShowEventMicrosoft){
        const res = await this.getAccessToken({
          service: 'microsoft',
          username: this.$store.state.userDefaults,
        })
        await this.deleteEventIdMicrosoft({
          access_token: res.token,
          eventId: this.eventId,
        })
        this.clearEvent()
        await this.getEventMicrosoft({ access_token: res.token })
      }
    },
    async handleCreateEvent() {
      if (this.isCreateEventGoogle) {
        const payload = {
          access_token: this.tokenGoogle,
          calendarId: this.getBasicProfile().google.email,
          eventId: this.eventId,
          data: {
            start: {
              dateTime: this.dateTimeStart + ':00+07:00',
            },
            end: {
              dateTime: this.dateTimeEnd + ':00+07:00',
            },
            attendees: this.eventAttendees.map((attendee) => {
              return { email: attendee }
            }),
            summary: this.eventTitle,
            description: this.eventDescription,
          },
        }
        if (this.isShowEventGoogle) {
          await this.updateEventIdGoogle(payload)
        } else {
          await this.createEventGoogle(payload)
        }
        this.clearEvent()
        await this.getEventGoogle({ access_token: this.tokenGoogle, calendarId: this.getBasicProfile().google.email })
      }
      if (this.isCreateEventMicrosoft) {
        const res = await this.getAccessToken({
          service: 'microsoft',
          username: this.$store.state.userDefaults,
        })
        const payload = {
          access_token: res.token,
          data: {
            start: {
              dateTime: this.dateTimeStart + ':00+07:00',
              timeZone: "Asia/Ho_Chi_Minh"
            },
            end: {
              dateTime: this.dateTimeEnd + ':00+07:00',
              timeZone: "Asia/Ho_Chi_Minh"
            },
            attendees: this.eventAttendees.map((attendee) => {
              return { emailAddress: {
                address: attendee
              },
              type: 'Required'}
            }),
            subject: this.eventTitle,
            body: {
              contentType: 'text',
              content: this.eventDescription,
            },
          },
        }
        if(this.isShowEventMicrosoft) await this.updateEventIdMicrosoft(payload)
        else await this.createEventMicrosoft(payload)
        this.clearEvent()
        await this.getEventMicrosoft({ access_token: res.token})
      }
    },
  },
  async created() {
    if (this.$route.query.code) {
      const payload = {
        origin: 'https://localhost:8080',
        data: {
          code: this.$route.query.code,
          grant_type: 'authorization_code',
          scope: 'openid offline_access Contacts.ReadWrite Calendars.ReadWrite',
          code_verifier: localStorage.getItem('code_verifier'),
          redirect_uri: 'http://localhost:8080',
          client_id: '0c594404-673a-4379-8c97-becedf7720e2',
        },
      }
      await this.requestTokenMicrosoft(payload).then((res) => {
        console.log(res)
        this.createConnect({
          service_code: 'microsoft',
          username: this.$store.state.userDefaults,
          token: res.access_token,
        }).then(() => {
          localStorage.removeItem('code_verifier')
        })
      })
      this.$router.push('/')
      this.listConnection = await this.getListConnection({ username: this.$store.state.userDefaults })
    }
    if (this.$route.fullPath.search('/?code=') != -1) {
      const authCode = this.$route.fullPath.split('=')[1].split('&')[0]
      const payload = {
        data: {
          app_id: '4214073985369805352',
          code: authCode,
          code_verifier: localStorage.getItem('code_verifier'),
          grant_type: 'authorization_code',
        },
        secret_key: 'I9ROOOR8VGjWKcJs07rG',
      }
      await this.requestToken(payload).then((res) => {
        console.log(res)
        this.createConnect({
          service_code: 'zalo',
          username: this.$store.state.userDefaults,
          token: res.access_token,
        }).then(() => {
          localStorage.removeItem('code_verifier')
        })
      })
      this.$router.push('/')
      this.listConnection = await this.getListConnection({ username: this.$store.state.userDefaults })
    }
    if (this.$store.state.userDefaults) {
      const data = {
        service: 'google',
        username: this.$store.state.userDefaults,
      }
      this.listConnection = await this.getListConnection(data)
      const resToken = await this.getAccessToken(data)
      this.tokenGoogle = resToken.token
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
<style></style>
