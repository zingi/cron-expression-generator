<template>
  <div id="cronExpressionGridItem">
    <div id="cronExpressionContainer" :class="{ notPopped: !isPopped, popped: isPopped }" :style="{ transform: 'scale(' + currentScale + ')' }"
    v-pressure @pressureChange="handlePressureChange" @pressureEnd="handlePressureEnd">
      <div id="controls">
        <button v-if="!isPopped" @click="popClicked" class="uiButton" id="cronExpressionPopButton">pop</button>
        <button v-if="!isPopped" @click="copyExpressionClicked" class="uiButton" :class="{ animatedButton: isExpressionValid }">copy expression</button>
      </div>
      <div id="outputContainer" :class="{ outputContainerNotPopped: !isPopped }">
        <div class="cronElement">
          <span class="timeLabel">Minute</span> <br>
          <span class="expressionPart" id="cronMinutes">{{ minute }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Hour</span> <br>
          <span class="expressionPart" id="cronHours">{{ hour  }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Day of Month</span> <br>
          <span class="expressionPart" id="cronDayOfMonth">{{ dayOfMonth  }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Month</span> <br>
          <span class="expressionPart" id="cronMonth">{{ month }}</span>
        </div>
        <div class="cronElement">
          <span class="timeLabel">Day of Week</span> <br>
          <span class="expressionPart" id="cronDayOfWeek">{{ dayOfWeek }}</span>
        </div>
      </div>

      <span v-if="!isPopped" id="humanReadable">{{ humanReadable }}</span>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cronstrue from 'cronstrue'

export default {
  name: 'CronExpression',
  data () {
    return {
      isPopped: false,
      currentScale: 1
    }
  },
  methods: {
    handlePressureChange (event) {
      if (!this.isPopped) { return }

      this.currentScale = 1 + event.force

      if (event.force > 0.6) {
        this.isPopped = false
        this.currentScale = 1
      }
    },
    handlePressureEnd (event) {
      this.currentScale = 1
    },
    popClicked () {
      this.isPopped = true
    },
    copyExpressionClicked () {
      if (this.expression.includes('x')) {
        this.$toasted.show('Invalid expression. Define all parts of the expression!', {
          type: 'error'
        })
      }
      else {
        this.$clipboard(this.expression)
        this.$toasted.show('expression copied')
      }
    }
  },
  computed: {
    ...mapGetters({
      minute: 'minuteExpression',
      hour: 'hourExpression',
      dayOfMonth: 'dayOfMonthExpression',
      month: 'monthExpression',
      dayOfWeek: 'dayOfWeekExpression',
      expression: 'expression',
      isExpressionValid: 'isExpressionValid'
    }),
    humanReadable () {
      if (this.isExpressionValid) {
        console.log(this.expression)
        return cronstrue.toString(this.expression)
      }
      else {
        return 'invalid expression'
      }
    }
  }
}
</script>

<style scoped>
  #cronExpressionGridItem {
    display: flex;
    flex-direction: column;
  }

  #cronExpressionContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;

    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  #cronExpressionContainer.notPopped {
    padding: 15px;
  }
  #cronExpressionContainer.popped {
    padding: 5px;
  }
  .popped #outputContainer .cronElement .expressionPart {
    margin-top: 10px;
  }

  #humanReadable {
    text-align: center;
    margin-top: 10px;
    overflow: auto;
    flex: 1 1 40%;
  }

  .outputContainerNotPopped {
    border-bottom: #95a5a6 solid 1px;
  }

  #outputContainer {
    overflow: auto;
    display: inline-block;
    display: flex;
    flex: 2 1 60%;
    justify-content: center; /* align horizontal */
    align-items: flex-start; /* align vertical */
  }

  .cronElement {
    padding: 0 5px 5px 5px;
    font-size: 1em;
    flex: 1;
    word-break: break-word;
    min-width: 0; /* for text-overflow: ellipsis to work */
  }

  .timeLabel {
    font-size: 0.5em;
    text-decoration: underline;
    color: #95a5a6;
  }

  .notPopped {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .popped {
    border-radius: 15px;
    position: fixed;
    height: 80px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  .popped .expressionPart {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @supports not (backdrop-filter: blur(5px)) {
    .popped {
      background: white;
    }
  }

  #controls {
    display: flex;
    flex: 1 0 auto;
    margin-bottom: 5px;
  }
  .popped #controls {
    display: none;
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
