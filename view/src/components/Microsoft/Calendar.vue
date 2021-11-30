<template>
  <div class="text-center section">
    <span class="font-bold">Calendars</span>
    <v-calendar class="custom-calendar" :masks="masks" :attributes="attributes" disable-page-swipe is-expanded>
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span :class="{'bg-red-300': day.id == `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`}" class="day-label text-sm text-gray-900 cursor-pointer hover:bg-gray-200" @click="$emit('createEvent', day, 'microsoft')">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p v-for="attr in attributes" :key="attr.key" @click="showEvent(attr.key)" class="cursor-pointer hover:opacity-70 text-xs leading-tight rounded-sm p-1 mt-0 mb-1" :class="attr.customData.class">
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
    <vs-button class="mt-4 text-xs" @click="fetchEventMicrosoft" icon="event_note"> Fetch Event Microsoft </vs-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      now: new Date(),
      masks: {
        weekdays: 'WWW',
      },
    }
  },
  computed: {
    attributes(){
      const listEvent = this.getListEvent().microsoft || []
      return listEvent.map((event) => {
        const data = {
          key: event.id,
          customData: {
            title: event.subject || '(No summary)',
            class: 'bg-blue-500 text-white',
          },
          dates: event.start.date || event.end.dateTime,
        }
        return data
      })
    }
  },
  methods: {
    ...mapActions({
      getEventCalendar: 'userManagement/getEventMicrosoft',
      getAccessToken: 'userManagement/getAccessToken',
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
      getContact: 'userManagement/getContact',
      getListEvent: 'userManagement/getListEvent',
    }),
    async fetchEventMicrosoft() {
      const res = await this.getAccessToken({
        service: 'microsoft',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.getEventCalendar({ access_token: res.token })
    },
    showEvent(key){
      const listEvent = this.getListEvent().microsoft || []
      this.$emit('showEvent', listEvent.find(event => event.id == key), 'microsoft')
    }
  }
}
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>