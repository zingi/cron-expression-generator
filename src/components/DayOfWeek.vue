<template>
  <div id="dayOfWeekContainer">
    <h2>Day Of Week</h2>
    <ul v-recognizer:pan.start="onPanStart" v-recognizer:pan.move="onPanMove" v-recognizer:pan.end="onPanEnd">
      <li v-for="day in days" :key="day.id" :id="day.id">
        <toggle-button :content="day.label" :toggleId="'dayOfWeekNumber_' + day.number" @toggled="(val) => dayToggled(day.number, val)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'

export default {
  name: 'DayOfWeek',
  components: {
    ToggleButton
  },
  data () {
    return {
      days: [],
      checking: null
    }
  },
  methods: {
    onPanStart (event) {
      let id = event.target.id
      if (id.startsWith('dayOfWeekNumber')) {
        id = id.replace('Number', '')
        let checked = document.getElementById(id).getElementsByTagName('input')[0].checked
        this.checking = !checked
      }
    },
    onPanMove (event) {
      if (this.checking == null) { return };
      let id = document.elementFromPoint(event.center.x, event.center.y).id
      if (id.startsWith('dayOfWeekNumber')) {
        id = id.replace('Number', '')
        let inputElem = document.getElementById(id).getElementsByTagName('input')[0] 
        if (inputElem.checked != this.checking) {
          inputElem.click()
        }
      }
    },
    onPanEnd (event) {
      this.checking = null
    },
    dayToggled (day, active) {
      this.pushDayOfWeekStateToStore(day, active)
    },
    pushDayOfWeekStateToStore(day, active) {
      this.$store.commit('setDayOfWeek', {
        dayOfWeek: day,
        active: active
      })
    }
  },
  beforeMount () {
    this.days.push({ label: 'SUN', number: 0, id: 'dayOfWeek_0'});
    this.days.push({ label: 'MON', number: 1, id: 'dayOfWeek_1'});
    this.days.push({ label: 'TUE', number: 2, id: 'dayOfWeek_2'});
    this.days.push({ label: 'WED', number: 3, id: 'dayOfWeek_3'});
    this.days.push({ label: 'THU', number: 4, id: 'dayOfWeek_4'});
    this.days.push({ label: 'FRI', number: 5, id: 'dayOfWeek_5'});
    this.days.push({ label: 'SAT', number: 6, id: 'dayOfWeek_6'});
  }
}
</script>

<style scoped>
    #dayOfWeekContainer {
    height: 250px;
  }

  ul {
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);

    grid-template-areas:
    'dw00 dw01 dw02 dw03 dw04 dw05 dw06';
  }

  #dayOfWeek_0 { grid-area: dw00 }
  #dayOfWeek_1 { grid-area: dw01 }
  #dayOfWeek_2 { grid-area: dw02 }
  #dayOfWeek_3 { grid-area: dw03 }
  #dayOfWeek_4 { grid-area: dw04 }
  #dayOfWeek_5 { grid-area: dw05 }
  #dayOfWeek_6 { grid-area: dw06 }
</style>
