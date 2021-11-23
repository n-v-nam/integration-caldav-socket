<template>
  <div class="home">
    <div class="flex justify-center item-center p-5">
      <vs-col class="flex item-center">
        <vs-button class="text-sm" @click="connectWithGoogle" icon="link">
          Connect with Google
        </vs-button>
        <span class="m-2" v-if="connectedGoogle">Connected</span>
      </vs-col>
      <vs-col class="flex item-center">
        <vs-button class="text-sm" :disabled="connectedZalo" @click="connectWithZalo" icon="link">
          Connect with Zalo
        </vs-button>
        <span class="mx-2" v-if="connectedZalo">Connected</span>
      </vs-col>
    </div>
    <div class="px-5">
      <span class="text-black font-bold text-2xl">Informations</span>
      <vs-tabs>
        <vs-tab label="Google">
          <div class="container">
            <div v-if="connectedGoogle">
              <vs-col vs-w="4">
                <vs-card v-if="basicProfileGoogle" class="w-64">
                  <div slot="header">
                    <h3>{{ basicProfileGoogle.name }}</h3>
                  </div>
                  <div slot="media">
                    <img :src="basicProfileGoogle.picture" />
                  </div>
                  <div>
                    <span
                      ><span class="font-bold mx-2">Email: </span
                      >{{ basicProfileGoogle.email }}</span
                    >
                  </div>
                </vs-card>
                <vs-button
                  class="text-xs"
                  color="success"
                  @click="fetchBasicProfileGoogle"
                  icon="folder_shared"
                  >Fetch Basic Profile</vs-button
                >
              </vs-col>

              <vs-col vs-w="4">
                <div>
                  <vs-table class="border" max-items="7" pagination :data="contactGoogle">
                    <template slot="header">
                      <span class="font-bold">Contacts Mail</span>
                    </template>
                    <template slot="thead">
                      <vs-th> Email </vs-th>
                      <vs-th> Name </vs-th>
                    </template>

                    <template slot-scope="{ data }">
                      <vs-tr :key="index" v-for="(contact, index) in data" class="cursor-pointer">
                        <vs-td :data="contact.email">
                          {{ contact.email }}
                        </vs-td>
                        <vs-td :data="contact.name">
                          {{ contact.name }}
                        </vs-td>
                        <vs-td>
                          <vs-button
                            @click="
                              mailTo = contact.email
                              isSend = true
                            "
                            color="skyblue"
                            class="text-xs"
                            icon="send"
                          ></vs-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
                <div>
                  <vs-button
                    color="gray"
                    @click="fetchContactGoogle"
                    icon="contact_mail"
                    class="text-xs my-2"
                  >
                    Fetch Contact Google
                  </vs-button>
                  <vs-button
                    color="skyblue"
                    @click="isSend = true"
                    icon="send"
                    class="text-xs mx-5 my-2"
                  >
                    Send Mail
                  </vs-button>
                </div>
              </vs-col>
              <vs-col vs-w="4"> </vs-col>
            </div>
            <div v-else>Please connect to your account Google...</div>
          </div>
        </vs-tab>
        <vs-tab label="Zalo">
          <div>Zalo</div>
        </vs-tab>
        <vs-tab label="Ecosystem">
          <div></div>
        </vs-tab>
      </vs-tabs>
    </div>

    <vs-popup title="Create new mail:" :active.sync="isSend">
      <div>
        <span v-show="mailTo" class="mb-4 text-danger font-size-info" style="color: red">{{
          errors.first('to')
        }}</span>
      </div>
      <div>
        <vs-input
          class="w-3/4 mb-4 font-bold text-black"
          name="to"
          v-validate="'required|email'"
          placeholder="To"
          v-model="mailTo"
        />
      </div>
      <div>
        <vs-input
          class="w-3/4 mb-4 font-bold text-black"
          placeholder="Subject"
          v-model="mailSubject"
        />
      </div>
      <vs-textarea class="mb-2 font-bold" label="Message" v-model="mailMessage" />
      <div class="flex justify-end">
        <vs-button
          :disabled="errors.first('to') || !mailTo"
          class="text-xs mx-2"
          @click="handleSendMail"
          icon="send"
          >Send</vs-button
        >
        <vs-button class="text-xs" @click="clearMessage" icon="close">Cancel</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import randomstring from 'randomstring'
import { encode as base64encode } from 'base64-arraybuffer'

export default {
  name: 'Home',
  data() {
    return {
      isSend: false,
      mailTo: null,
      mailSubject: null,
      mailMessage: null,
      listConnection: [],
      basicProfileGoogle: null,
      contactGoogle: [],
    }
  },
  computed: {
    connectedGoogle() {
      return this.listConnection.some((connect) => connect.mst_service_code == 'google')
    },
    connectedZalo() {
      return this.listConnection.some((connect) => connect.mst_service_code == 'zalo')
    },
  },
  methods: {
    ...mapActions({
      createConnect: 'userManagement/authCode',
      getListConnection: 'userManagement/getListConnection',
      getAccessToken: 'userManagement/getAccessToken',
      actionBasicProfileGoogle: 'userManagement/getBasicProfileGoogle',
      actionGetContactGoogle: 'userManagement/getContactGoogle',
      sendMail: 'userManagement/sendMail',
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
        this.listConnection = await this.getListConnection({
          username: this.$store.state.userDefaults,
        })
      }
    },
    async fetchBasicProfileGoogle() {
      const res = await this.getAccessToken({
        service: 'google',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.actionBasicProfileGoogle({ access_token: res.token })
      this.basicProfileGoogle = this.getBasicProfile().google
      console.log(this.basicProfileGoogle)
    },
    async fetchContactGoogle() {
      const res = await this.getAccessToken({
        service: 'google',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.actionGetContactGoogle({ access_token: res.token })
      this.contactGoogle = this.getContact().google
      console.log(this.contactGoogle)
    },
    async handleSendMail() {
      const res = await this.getAccessToken({
        service: 'google',
        username: this.$store.state.userDefaults,
      })
      const data = {
        to: this.mailTo,
        subject: this.mailSubject,
        message: this.mailMessage,
        access_token: res.token,
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
      this.clearMessage()
    },
    async connectWithZalo() {
      const code_verifier = randomstring.generate(128)
      console.log(code_verifier)
      await this.generateCodeChallenge(code_verifier).then((res) => {
        window.location.href = `https://oauth.zaloapp.com/v4/permission?app_id=4214073985369805352&redirect_uri=https://e24a-14-231-226-163.ngrok.io&code_challenge=${res}&state=123`
      })
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
  },
  async created() {
    console.log(this.$route.fullPath.search('/?code='))
    console.log(this.$route.fullPath.search('/?code=') != -1)
    if (this.$route.fullPath.search('/?code=') != -1) {
      console.log(this.$route.fullPath)
      const authCode = this.$route.fullPath.split('=')[1].split('&')[0]
      await this.createConnect({
        service_code: 'zalo',
        username: this.$store.state.userDefaults,
        token: authCode,
      })
      this.$router.push('/')
    }
    if (this.$store.state.userDefaults) {
      const data = {
        username: this.$store.state.userDefaults,
      }
      this.listConnection = await this.getListConnection(data)
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
<style></style>
