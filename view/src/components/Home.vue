<template>
  <div class="home">
    <div class="flex justify-center item-center p-5">
      <vs-col>
        <vs-button @click="connectWithGoogle"> Connect with Google </vs-button>
        <span class="mx-2" v-if="connectedGoogle">Connected</span>
      </vs-col>
      <vs-col>
        <vs-button :disabled="connectedZalo" @click="connectWithZalo">
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
              <div>
                <vs-card v-if="basicProfileGoogle" class="w-64">
                  <div slot="header">
                    <h3>{{ basicProfileGoogle.name }}</h3>
                  </div>
                  <div slot="media">
                    <img :src="basicProfileGoogle.picture" />
                  </div>
                  <div>
                    <span><span class="font-bold mx-2">Email: </span>{{ basicProfileGoogle.email }}</span>
                  </div>
                </vs-card>
                <vs-button @click="fetchBasicProfileGoogle">Fetch Basic Profile</vs-button>
              </div>
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
      listConnection: [],
      basicProfileGoogle: null,
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
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
    }),
    async connectWithGoogle() {
      const googleUser = await this.$gAuth.signIn()
      const authToken = googleUser.getAuthResponse()
      console.log(authToken);

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
