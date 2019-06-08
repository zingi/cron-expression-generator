<template>
  <div id="minuteContainer">
    <header class="inputHeader">
      <h2>Minutes</h2>
      <select-all-button :expression="minuteExpression" @selectAllClicked="(val) => selectAllClicked(val)"/>
    </header>
    <ul v-recognizer:pan.start="onPanStart" v-recognizer:pan.move="onPanMove" v-recognizer:pan.end="onPanEnd">
      <li v-for="minute in minutes" :key="minute.id" :id="minute.id">
        <toggle-button :content="minute.label" :toggleId="'minuteNumber_' + minute.number" @toggled="(val) => minuteToggled(minute.number, val)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'
import SelectAllButton from './SelectAllButton'
import { mapGetters } from 'vuex'

export default {
  name: 'Minute',
  components: {
    ToggleButton,
    SelectAllButton
  },
  data () {
    return {
      minutes: [],
      checking: null
    }
  },
  methods: {
    onPanStart (event) {
      let id = event.target.id
      if (id.startsWith('minuteNumber')) {
        id = id.replace('Number', '')
        let checked = document.getElementById(id).getElementsByTagName('input')[0].checked
        this.checking = !checked
      }
    },
    onPanMove (event) {
      if (this.checking == null) { return };
      // let id = event.target.id;
      // make it mobile-browser compatible
      let id = document.elementFromPoint(event.center.x, event.center.y).id

      if (id.startsWith('minuteNumber')) {
        id = id.replace('Number', '')
        let inputElem = document.getElementById(id).getElementsByTagName('input')[0]
        /**
         * if .checked=true is directly accessed, it doesn't update the model value,
         * so trigger an event in order to change the checked AND model value
         */
        if (inputElem.checked != this.checking) {
          inputElem.click()
        }
      }
    },
    onPanEnd (event) {
      this.checking = null
    },
    minuteToggled (minute, active) {
      this.pushMinuteStateToStore(minute, active)
    },
    pushMinuteStateToStore (minute, active) {
      this.$store.commit('setMinute', {
        minute: minute,
        active: active
      })
    },
    selectAllClicked (all) {
      for (let i = 0; i < 60; i++) {
        let inputElem = document.getElementById('minute_' + i).getElementsByTagName('input')[0]
        if (all && !inputElem.checked) {
          inputElem.click()
        }
        else if (!all && inputElem.checked) {
          inputElem.click()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'minuteExpression'
    ])
  },
  beforeMount () {
    for (let i = 0; i < 60; i++) {
      this.minutes.push({
        label: i < 10 ? '0' + i : '' + i,
        number: i,
        id: 'minute_' + i
      })
    }
  }
}
</script>

<style scoped>
  #minuteContainer {
    height: 250px;
  }

  ul {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(6, 1fr);

    grid-template-areas:
    'm00 m01 m02 m03 m04 m05 m06 m07 m08 m09'
    'm10 m11 m12 m13 m14 m15 m16 m17 m18 m19'
    'm20 m21 m22 m23 m24 m25 m26 m27 m28 m29'
    'm30 m31 m32 m33 m34 m35 m36 m37 m38 m39'
    'm40 m41 m42 m43 m44 m45 m46 m47 m48 m49'
    'm50 m51 m52 m53 m54 m55 m56 m57 m58 m59'
  }

  #minute_0 {grid-area: m00 };
  #minute_1 {grid-area: m01 };
  #minute_2 {grid-area: m02 };
  #minute_3 {grid-area: m03 };
  #minute_4 {grid-area: m04 };
  #minute_5 {grid-area: m05 };
  #minute_6 {grid-area: m06 };
  #minute_7 {grid-area: m07 };
  #minute_8 {grid-area: m08 };
  #minute_9 {grid-area: m09 };
  #minute_10 {grid-area: m10 };
  #minute_11 {grid-area: m11 };
  #minute_12 {grid-area: m12 };
  #minute_13 {grid-area: m13 };
  #minute_14 {grid-area: m14 };
  #minute_15 {grid-area: m15 };
  #minute_16 {grid-area: m16 };
  #minute_17 {grid-area: m17 };
  #minute_18 {grid-area: m18 };
  #minute_19 {grid-area: m19 };
  #minute_20 {grid-area: m20 };
  #minute_21 {grid-area: m21 };
  #minute_22 {grid-area: m22 };
  #minute_23 {grid-area: m23 };
  #minute_24 {grid-area: m24 };
  #minute_25 {grid-area: m25 };
  #minute_26 {grid-area: m26 };
  #minute_27 {grid-area: m27 };
  #minute_28 {grid-area: m28 };
  #minute_29 {grid-area: m29 };
  #minute_30 {grid-area: m30 };
  #minute_31 {grid-area: m31 };
  #minute_32 {grid-area: m32 };
  #minute_33 {grid-area: m33 };
  #minute_34 {grid-area: m34 };
  #minute_35 {grid-area: m35 };
  #minute_36 {grid-area: m36 };
  #minute_37 {grid-area: m37 };
  #minute_38 {grid-area: m38 };
  #minute_39 {grid-area: m39 };
  #minute_40 {grid-area: m40 };
  #minute_41 {grid-area: m41 };
  #minute_42 {grid-area: m42 };
  #minute_43 {grid-area: m43 };
  #minute_44 {grid-area: m44 };
  #minute_45 {grid-area: m45 };
  #minute_46 {grid-area: m46 };
  #minute_47 {grid-area: m47 };
  #minute_48 {grid-area: m48 };
  #minute_49 {grid-area: m49 };
  #minute_50 {grid-area: m50 };
  #minute_51 {grid-area: m51 };
  #minute_52 {grid-area: m52 };
  #minute_53 {grid-area: m53 };
  #minute_54 {grid-area: m54 };
  #minute_55 {grid-area: m55 };
  #minute_56 {grid-area: m56 };
  #minute_57 {grid-area: m57 };
  #minute_58 {grid-area: m58 };
  #minute_59 {grid-area: m59 };
</style>