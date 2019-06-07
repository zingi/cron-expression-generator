<template>
  <div id="monthContainer">
    <h2>Month</h2>
    <ul v-recognizer:pan.start="onPanStart" v-recognizer:pan.move="onPanMove" v-recognizer:pan.end="onPanEnd">
      <li v-for="month in months" :key="month.id" :id="month.id">
        <toggle-button :content="month.label" :toggleId="'monthNumber_' + month.number" @toggled="(val) => monthToggled(month.number, val)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'

export default {
  name: 'Month',
  components: {
    ToggleButton
  },
  data () {
    return {
      months: [],
      checking: null
    }
  },
  methods: {
    onPanStart (event) {
      let id = event.target.id
      if (id.startsWith('monthNumber')) {
        id = id.replace('Number', '')
        let checked = document.getElementById(id).getElementsByTagName('input')[0].checked
        this.checking = !checked
      }
    },
    onPanMove (event) {
      if (this.checking == null) { return };
      let id = document.elementFromPoint(event.center.x, event.center.y).id
      if (id.startsWith('monthNumber')) {
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
    monthToggled (day, active) {
      this.pushMonthStateToStore(day, active)
    },
    pushMonthStateToStore(day, active) {
      this.$store.commit('setMonth', {
        month: day,
        active: active
      })
    }
  },
  beforeMount () {
    this.months.push({ label: 'Jan.', number: 1, id: 'month_1'})
    this.months.push({ label: 'Feb.', number: 2, id: 'month_2'})
    this.months.push({ label: 'Mar.', number: 3, id: 'month_3'})
    this.months.push({ label: 'Apr.', number: 4, id: 'month_4'})
    this.months.push({ label: 'May', number: 5, id: 'month_5'})
    this.months.push({ label: 'June', number: 6, id: 'month_6'})
    this.months.push({ label: 'July', number: 7, id: 'month_7'})
    this.months.push({ label: 'Aug.', number: 8, id: 'month_8'})
    this.months.push({ label: 'Sep.', number: 9, id: 'month_9'})
    this.months.push({ label: 'Oct.', number: 10, id: 'month_10'})
    this.months.push({ label: 'Nov.', number: 11, id: 'month_11'})
    this.months.push({ label: 'Dec.', number: 12, id: 'month_12'})
  }
}
</script>

<style scoped>
  #monthContainer {
    height: 250px;
  }

  ul {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);

    grid-template-areas:
    'mo01 mo02 mo03 mo04 mo05 mo06'
    'mo07 mo08 mo09 mo10 mo11 mo12';
  }

  #month_1 { grid-area: mo01 }
  #month_2 { grid-area: mo02 }
  #month_3 { grid-area: mo03 }
  #month_4 { grid-area: mo04 }
  #month_5 { grid-area: mo05 }
  #month_6 { grid-area: mo06 }
  #month_7 { grid-area: mo07 }
  #month_8 { grid-area: mo08 }
  #month_9 { grid-area: mo09 }
  #month_10 { grid-area: mo10 }
  #month_11 { grid-area: mo11 }
  #month_12 { grid-area: mo12 }
</style>