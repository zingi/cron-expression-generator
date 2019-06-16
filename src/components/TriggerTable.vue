<template>
  <div id="triggerTableContainer">
    <table>
      <tr>
        <th>Date</th>
        <th>Countdown</th>
        <th></th>
      </tr>
      <tr v-for="(trigger, index) in triggers" :key="`trigger-${index}`">
        <td>{{ trigger.timestamp.format('DD MMM YYYY, HH:mm:ss') }}</td>
        <td class="untilTableData">{{ trigger.until }}</td>
        <td class="imminentTableData">
          <div class="imminentDiv" v-if="trigger.untilSeconds < 60" v-anime="{ rotate: '1turn', borderRadius: '50%', duration: 5000, loop: true }"></div>
        </td>
      </tr>
    </table>
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

      if (this.displayedExpression !== this.expression) {
        this.triggers = []
        this.displayedExpression = this.expression
      }

      if (this.triggers.length < 1 && upcomingTriggersIterator != null) {
        for (let i = 0; i < this.entryCount; i++) {
          this.addTrigger(upcomingTriggersIterator.next().toDate())
        }
      }
      else if (upcomingTriggersIterator) {
        if (this.triggers[0].timestamp.isBefore(moment())) {
          this.triggers = []
          for (let i = 0; i < this.entryCount; i++) {
            this.addTrigger(upcomingTriggersIterator.next().toDate())
          }
        }
        else {
          for (let trigger of this.triggers) {
            trigger.update()
          }
        }
      }
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
          if (duration.days() > 0) {
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
  td {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1em;
  }

  .untilTableData {
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
</style>
