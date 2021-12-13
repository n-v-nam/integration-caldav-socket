<!-- @format -->

<template>
  <div>
    <div>
      <vs-table class="border" max-items="7" pagination :data="contacts">
        <template slot="header">
          <span class="font-bold m-auto">Contacts</span>
        </template>
        <template slot="thead">
          <vs-th> Name </vs-th>
          <vs-th> Email </vs-th>
          <vs-th> Phone </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :state="contact.state" :data="contact" :key="index" v-for="(contact, index) in data" class="cursor-pointer">
            <vs-td :data="contact.name">
              {{ contact.name }}
            </vs-td>
            <vs-td :data="contact.email">
              {{ contact.email ? contact.email.trim() : null}}
            </vs-td>
            <vs-td :data="contact.phone">
              {{ contact.phone }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
      contacts(){
        const contactsGoogle = this.getContact().google || []
        const listContactGoogle = contactsGoogle.map(contact => {
            return {
                email: contact.email,
                name: contact.name,
                phone: contact.phone ? contact.phone.split(/[\s-]+/g).join('') : null,
                state: 'danger'
            }
        })
        const contactsMicrosoft = this.getContact().microsoft || []
        const listContactMicrosoft = contactsMicrosoft.map(contact => {
            return {
                email: contact.emailAddresses[0].address,
                name: contact.displayName,
                phone: contact.mobilePhone,
                state: 'primary'
            }
        })
        const arr = [...listContactGoogle, ...listContactMicrosoft]
        const filteredArr = arr.reduce((acc, current) => {
            const x = acc.find(item => item.phone === current.phone);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        return filteredArr
      }
  },
  methods: {
    ...mapGetters({
      getContact: 'userManagement/getContact',
    }),
  },
}
</script>
