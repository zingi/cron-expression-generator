<template>
  <div id="dayOfMonthContainer">
    <h2>Day Of Month</h2>
    <ul v-recognizer:pan.start="onPanStart" v-recognizer:pan.move="onPanMove" v-recognizer:pan.end="onPanEnd">
      <li v-for="day in days" :key="day.id" :id="day.id">
        <toggle-button :content="day.label" :toggleId="'dayOfMonthNumber_' + day.number" @toggled="(val) => dayToggled(day.number, val)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'

export default {
  name: 'DayOfMonth',
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
      if (id.startsWith('dayOfMonthNumber')) {
        id = id.replace('Number', '')
        let checked = document.getElementById(id).getElementsByTagName('input')[0].checked
        this.checking = !checked
      }
    },
    onPanMove (event) {
      if (this.checking == null) { return };
      let id = document.elementFromPoint(event.center.x, event.center.y).id
      if (id.startsWith('dayOfMonthNumber')) {
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
      this.pushDayOfMonthStateToStore(day, active)
    },
    pushDayOfMonthStateToStore(day, active) {
      this.$store.commit('setDayOfMonth', {
        dayOfMonth: day,
        active: active
      })
    }
  },
  beforeMount () {
    for (let i = 0; i < 31; i++) {
      let d = i + 1
      this.days.push({
        label: d < 10 ? '0' + d : '' + d,
        number: d,
        id: 'dayOfMonth_' + d
      })
    }
  }
}
</script>

<style scoped>
  #dayOfMonthContainer {
    height: 250px;
  }

  ul {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(4, 1fr);

    grid-template-areas:
    'dm01 dm02 dm03 dm04 dm05 dm06 dm07 dm08 dm09 dm10'
    'dm11 dm12 dm13 dm14 dm15 dm16 dm17 dm18 dm19 dm20'
    'dm21 dm22 dm23 dm24 dm25 dm26 dm27 dm28 dm29 dm30'
    'dm31 .    .    .    .    .    .    .    .    .   ';
  }

  #dayOfMonth_1 { grid-area: dm01 }
  #dayOfMonth_2 { grid-area: dm02 }
  #dayOfMonth_3 { grid-area: dm03 }
  #dayOfMonth_4 { grid-area: dm04 }
  #dayOfMonth_5 { grid-area: dm05 }
  #dayOfMonth_6 { grid-area: dm06 }
  #dayOfMonth_7 { grid-area: dm07 }
  #dayOfMonth_8 { grid-area: dm08 }
  #dayOfMonth_9 { grid-area: dm09 }
  #dayOfMonth_10 { grid-area: dm10 }
  #dayOfMonth_11 { grid-area: dm11 }
  #dayOfMonth_12 { grid-area: dm12 }
  #dayOfMonth_13 { grid-area: dm13 }
  #dayOfMonth_14 { grid-area: dm14 }
  #dayOfMonth_15 { grid-area: dm15 }
  #dayOfMonth_16 { grid-area: dm16 }
  #dayOfMonth_17 { grid-area: dm17 }
  #dayOfMonth_18 { grid-area: dm18 }
  #dayOfMonth_19 { grid-area: dm19 }
  #dayOfMonth_20 { grid-area: dm20 }
  #dayOfMonth_21 { grid-area: dm21 }
  #dayOfMonth_22 { grid-area: dm22 }
  #dayOfMonth_23 { grid-area: dm23 }
  #dayOfMonth_24 { grid-area: dm24 }
  #dayOfMonth_25 { grid-area: dm25 }
  #dayOfMonth_26 { grid-area: dm26 }
  #dayOfMonth_27 { grid-area: dm27 }
  #dayOfMonth_28 { grid-area: dm28 }
  #dayOfMonth_29 { grid-area: dm29 }
  #dayOfMonth_30 { grid-area: dm30 }
  #dayOfMonth_31 { grid-area: dm31 }
</style>




