<template>
  <div id="triggerTableContainer">
    <table v-if="!expression.includes('x')">
      <tr>
        <th>Date</th>
        <th>Countdown</th>
        <th></th>
      </tr>
      <tr v-for="(trigger, index) in triggers" :key="`trigger-${index}`">
        <td>{{ trigger.timestamp.format('DD MMM YYYY HH:mm') }}</td>
        <td class="untilTableData">{{ trigger.until }}</td>
        <td class="imminentTableData">
          <div class="imminentDiv" :class="{ hidden: trigger.untilSeconds > 60}" v-anime="{ rotate: '1turn', scale: 0.5, borderRadius: '50%', duration: 4000, direction: 'alternate', loop: true }"></div>
        </td>
      </tr>
    </table>
    <span v-else id="hint">To display the next few upcoming trigger times, define all expression parts.</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import parser from 'cron-parser'
import { setInterval, clearInterval } from 'timers'
import moment from 'moment'

export default {
  name: 'TriggerTable',
  data () {
    return {
      triggers: [],
      refreshInterval: null,
      entryCount: 10,
      displayedExpression: ''
    }
  },
  methods: {
    calcTriggers () {
      let upcomingTriggersIterator = this.getUpcomingTriggersIterator()
      // if the cron expression did change since the last tick, clear all previous caclulated triggers
      if (this.displayedExpression !== this.expression) {
        this.triggers = []
        this.displayedExpression = this.expression
      }
      // if there are no calculated upcoming trigger times and the iterator is valid
      if (this.triggers.length < 1 && upcomingTriggersIterator != null) {
        for (let i = 0; i < this.entryCount; i++) {
          this.addTrigger(upcomingTriggersIterator.next().toDate())
        }
      }
      // if there are previous calculated trigger times
      else if (upcomingTriggersIterator) {
        // check if the nearest time is already past
        if (this.triggers[0].timestamp.isBefore(moment())) {
          this.triggers = []
          for (let i = 0; i < this.entryCount; i++) {
            this.addTrigger(upcomingTriggersIterator.next().toDate())
          }
        }
        // update the countdown for all trigger times
        else {
          for (let trigger of this.triggers) {
            trigger.update()
          }
        }
      }
      // if the current cron expression is not valid, clear previous calculated trigger times
      else {
        this.triggers = []
      }
    },
    addTrigger (date) {
      let timestamp = moment(date)

      this.triggers.push({
        timestamp: timestamp,
        until: '-',
        untilSeconds: -1,
        update: function () {
          let duration = moment.duration(this.timestamp.diff(moment()), 'milliseconds')
          if (duration.asDays() > 1) {
            this.until = '...'
          }
          else {
            let h = duration.hours()
            let m = duration.minutes()
            let s = duration.seconds()
            this.until = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
          }
          this.untilSeconds = duration.asSeconds()
        }
      })

      this.triggers[this.triggers.length - 1].update()
    },
    getUpcomingTriggersIterator () {
      if (!this.expression.includes('x')) {
        try {
          let iterator = parser.parseExpression(this.expression)
          return iterator
        }
        catch (err) {
          console.log('Error: ' + err.message)
        }
      }
      return null
    }
  },
  computed: {
    ...mapGetters([
      'expression'
    ])
  },
  beforeMount () {
    this.refreshInterval = setInterval(this.calcTriggers, 1000)
  },
  beforeDestroy () {
    clearInterval(this.refreshInterval)
  }
}
</script>

<style scoped>
  #triggerTableContainer {
    box-sizing: border-box;
    overflow: auto;
  }

  table {
    width: 100%;
  }

  th { user-select: none; }
  td { font-family: 'Courier New', Courier, monospace; }

  .untilTableData {
    user-select: none;
    background: #ecf0f1;
    border-radius: 5px;
    text-align: center;
  }

  .imminentTableData { text-align: center; }

  .imminentDiv {
    background-color: #e74c3c;
    width: 10px;
    height: 10px;
  }

  #hint {
    margin: 20px 10px 0 10px;
  }

  .hidden {
    visibility: hidden;
  }
</style>
