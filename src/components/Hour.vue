<template>
  <div id="hourContainer">
    <h2>Hours</h2>
    <ul v-recognizer:pan.start="onPanStart" v-recognizer:pan.move="onPanMove" v-recognizer:pan.end="onPanEnd">
      <li v-for="hour in hours" :key="hour.id" :id="hour.id">
        <toggle-button :content="hour.label" :toggleId="'hourNumber_' + hour.number" @toggled="(val) => hourToggled(hour.number, val)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'

export default {
  name: 'Hour',
  components: {
    ToggleButton
  },
  data () {
    return {
      hours: [],
      checking: null
    }
  },
  methods: {
    onPanStart (event) {
      let id = event.target.id
      if (id.startsWith('hourNumber')) {
        id = id.replace('Number', '')
        let checked = document.getElementById(id).getElementsByTagName('input')[0].checked
        this.checking = !checked
      }
    },
    onPanMove (event) {
      if (this.checking == null) { return };
      let id = document.elementFromPoint(event.center.x, event.center.y).id
      if (id.startsWith('hourNumber')) {
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
    hourToggled (hour, active) {
      this.pushHourStateToStore(hour, active)
    },
    pushHourStateToStore(hour, active) {
      this.$store.commit('setHour', {
        hour: hour,
        active: active
      })
    }
  },
  beforeMount () {
    for (let i = 0; i < 24; i++) {
      this.hours.push({
        label: i < 10 ? '0' + i : '' + i,
        number: i,
        id: 'hour_' + i
      })
    }
  }
}
</script>

<style scoped>
  #hourContainer {
    height: 250px;
  }

  ul {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 1fr);

    grid-template-areas:
    'h00 h01 h02 h03 h04 h05 h06 h07 h08 h09 h010 h11'
    'h12 h13 h14 h15 h016 h17 h18 h19 h20 h21 h22 h23';
  }

  #hour_0 {grid-area: h00 };
  #hour_1 {grid-area: h01 };
  #hour_2 {grid-area: h02 };
  #hour_3 {grid-area: h03 };
  #hour_4 {grid-area: h04 };
  #hour_5 {grid-area: h05 };
  #hour_6 {grid-area: h06 };
  #hour_7 {grid-area: h07 };
  #hour_8 {grid-area: h08 };
  #hour_9 {grid-area: h09 };
  #hour_10 {grid-area: h10 };
  #hour_11 {grid-area: h11 };
  #hour_12 {grid-area: h12 };
  #hour_13 {grid-area: h13 };
  #hour_14 {grid-area: h14 };
  #hour_15 {grid-area: h15 };
  #hour_16 {grid-area: h16 };
  #hour_17 {grid-area: h17 };
  #hour_18 {grid-area: h18 };
  #hour_19 {grid-area: h19 };
  #hour_20 {grid-area: h20 };
  #hour_21 {grid-area: h21 };
  #hour_22 {grid-area: h22 };
  #hour_23 {grid-area: h23 };
</style>
