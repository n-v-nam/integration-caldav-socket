<!-- @format -->

<template>
  <div class="m-10">
    <div class="p-10 bg-gray-100 text-black w-full">
      <div class="flex justify-start items-center text-lg font-bold">
        <vs-col vs-w="2">
          <vs-row><vs-avatar class="w-16 h-16 ml-3" /></vs-row>
          <vs-row>
            <vs-button v-if="!isEdit" class="text-xs" @click="isEdit = true" icon="edit">Edit User</vs-button>
            <vs-button :disabled="errors.any()" v-else class="text-xs" @click="isConfirm = true" icon="assignment">Save</vs-button>
          </vs-row>
        </vs-col>
        <vs-col vs-w="5">
          <div class="mx-4 d-flex items-center justify-evenly">
            <vs-input disabled class="w-3/4 mx-2 pb-2" label-placeholder="User ID" v-model="id" />
            <vs-input disabled class="w-3/4 mx-2 pb-2" label-placeholder="Username" v-model="username" />
          </div>
        </vs-col>
        <vs-col vs-w="5">
          <div class="mx-2 d-flex items-center justify-evenly">
            <vs-input :disabled="!isEdit" class="w-3/4 mx-2 pb-2" label-placeholder="Name" v-model="name" />
            <vs-input v-validate="'required|email'" :disabled="!isEdit" class="w-3/4 mx-2 pb-2" name="email" label-placeholder="Email" v-model="email" />
          </div>
        </vs-col>
      </div>
    </div>
    <div class="mt-8 bg-gray-200 border text-black w-full">
      <vs-table max-items="3" :data="connections">
        <template slot="thead">
          <vs-th> Connections </vs-th>
          <vs-th> Account </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.mst_service_code">
              {{ tr.mst_service_code }}
            </vs-td>

            <vs-td :data="tr.service">
              {{ tr.account }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <vs-popup title="Warning" background-color-popup="warning" :active.sync="isConfirm">
      <div>
        <span class="mb-2 text-sm">Please enter your password to confirm:</span>
        <vs-input class="w-3/4 mb-4 font-bold text-black" name="password" v-validate="'required'" placeholder="Password" v-model="password" />
      </div>
      <div class="flex justify-end">
        <vs-button class="text-xs mx-2" @click="handleChangeProfile" icon="check">Confirm</vs-button>
        <vs-button class="text-xs" @click="isConfirm == false; password = null" icon="close">Cancel</vs-button>
      </div>
    </vs-popup>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      username: null,
      id: null,
      name: null,
      email: null,
      isEdit: false,
      isConfirm: false,
      password: null,
      connections: [],
    }
  },
  methods: {
    ...mapActions({
      getListConnection: 'userManagement/getListConnection',
      getProfile: 'userManagement/getProfile',
      changeProfile: 'userManagement/changeProfile'
    }),
    async handleChangeProfile(){
      const payload = await this.changeProfile({ username: this.username, password: this.password, email: this.email, name: this.name}).catch((error) => {
        const message = error.response ? error.response.data.message : null
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: 'An error has occurred',
          text: message,
          color: 'danger',
        })
      })
      if(payload){
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: 'Success',
          text: 'Change profile success',
          color: 'success',
        })
        this.isEdit = false
        this.isConfirm = false
      }
    }
  },
  async created() {
    const data = await this.getProfile()
    this.username = data.username
    this.id = data.id 
    this.email = data.email
    this.name = data.name
    const payload = await this.getListConnection()
    this.connections = payload
  },
}
</script>
