<template>
  <div id="cronExpressionGridItem">
    <div id="cronExpressionContainer" :class="{ notPopped: !isPopped, popped: isPopped }" :style="{ transform: 'scale(' + currentScale + ')' }"
    v-pressure @pressureChange="handlePressureChange" @pressureEnd="handlePressureEnd">
      <div id="controls">
        <button v-if="!isPopped" @click="popClicked" class="uiButton">pop</button>
        <button v-if="!isPopped" class="uiButton">copy expression</button>
      </div>
      <div id="outputContainer">
        <div class="cronElement">
          <span class="timeLabel">Minutes</span> <br>
          <span id="cronMinutes">{{ isPopped ? (minute.length > maxPopLength ? minute.substring(0, maxPopLength) + '...' : minute) : minute }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Hours</span> <br>
          <span id="cronHours">{{ isPopped ? (hour.length > maxPopLength ? hour.substring(0, maxPopLength) + '...' : hour) : hour  }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Day of Month</span> <br>
          <span id="cronDayOfMonth">{{ isPopped ? (dayOfMonth.length > maxPopLength ? dayOfMonth.substring(0, maxPopLength) + '...' : dayOfMonth) : dayOfMonth  }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Month</span> <br>
          <span id="cronMonth">{{ isPopped ? (month.length > maxPopLength ? month.substring(0, maxPopLength) + '...' : month) : month }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Day Of Week</span> <br>
          <span id="cronDayOfWeek">{{ isPopped ? (dayOfWeek.length > maxPopLength ? dayOfWeek.substring(0, maxPopLength) + '...' : dayOfWeek) : dayOfWeek }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CronExpression',
  data () {
    return {
      isPopped: false,
      maxPopLength: 5,
      currentScale: 1
    }
  },
  methods: {
    handlePressureChange (event) {
      if (!this.isPopped) { return }

      this.currentScale = 1 + event.force

      if (event.force > 0.6) {
        this.isPopped = false
      }
    },
    handlePressureEnd (event) {
      this.currentScale = 1
    },
    popClicked () {
      this.isPopped = true;
    }
  },
  computed: {
    ...mapGetters({
      minute: 'minuteExpression',
      hour: 'hourExpression',
      dayOfMonth: 'dayOfMonthExpression',
      month: 'monthExpression',
      dayOfWeek: 'dayOfWeekExpression'
    })
  }
}
</script>

<style scoped>
  #cronExpressionContainer {
    display: flex;
    flex-direction: column;
    overflow: auto;

    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  #outputContainer {
    /* max-height: 220px; */

    overflow: auto;

    display: inline-block;
    display: flex;
    flex: 1;
    justify-content: center; /* align horizontal */
    align-items: flex-start; /* align vertical */
  }

  .cronElement {
    padding: 5px;
    font-size: 1em;
    flex: 1;
    /* max-width: 100px; */
    word-break: break-word;
  }

  .timeLabel {
    font-size: 0.5em;
    text-decoration: underline;
    color: #95a5a6;
  }

  .notPopped {
    background: white;
    height: 250px;
  }

  .popped {
    position: fixed;
    height: 50px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    backdrop-filter: blur(5px);
  }

  @supports not (backdrop-filter: blur(5px)) {
    .popped {
      background: white;
    }
  }

  #controls {
    display: flex;
    margin-bottom: 10px;
  }

  button {
    border: none;
    width: 100%;
    max-height: 30px;
    padding: 3px 6px 3px 6px;
    margin: 0 10px 0 10px;
    border-radius: 3px;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
</style>
