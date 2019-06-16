<template>
  <div id="app">
    <h1 id="title">Cron Expression Generator</h1>
    <minute class="container"/>
    <hour class="container"/>
    <day-of-month class="container"/>
    <month class="container"/>
    <day-of-week class="container"/>
    <trigger-table class="container"/>
    <cron-expression />
  </div>
</template>

<script>
import Minute from './components/Minute'
import Hour from './components/Hour'
import DayOfMonth from './components/DayOfMonth'
import Month from './components/Month'
import DayOfWeek from './components/DayOfWeek'
import CronExpression from './components/CronExpression'
import TriggerTable from './components/TriggerTable'

export default {
  name: 'app',
  components: {
    Minute,
    Hour,
    DayOfMonth,
    Month,
    DayOfWeek,
    CronExpression,
    TriggerTable
  },
  beforeCreate () {
    this.$store.commit('setup')
  }
}
</script>

<style lang="scss">
* { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;

  display: grid;

  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: minmax(0, 1fr) 400px 400px 400px minmax(0, 1fr);
  grid-template-rows: 40px 300px 300px minmax(0, 1fr);

  grid-template-areas:
  '.  tit tit tit .'
  '.  hoc mic dwc .'
  '.  dmc moc cex .'
  '.  ttc .   .   .';
}

#title {grid-area: tit }
#minuteContainer { grid-area: mic}
#hourContainer { grid-area: hoc }
#dayOfMonthContainer { grid-area: dmc }
#monthContainer { grid-area: moc }
#dayOfWeekContainer { grid-area: dwc }
#cronExpressionGridItem { grid-area: cex }
#triggerTableContainer { grid-area: ttc }

@media (min-width: 1280px) {
  #minuteContainer        { height: 300px; }
  #hourContainer          { height: 300px; }
  #dayOfMonthContainer    { height: 300px; }
  #monthContainer         { height: 300px; }
  #dayOfWeekContainer     { height: 300px; }
  #cronExpressionGridItem { height: 300px; }
  .container {
    padding: 5px 30px 30px 30px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .inputHeader {
    padding: 0.5em 0 0.5em 0;
  }
}

@media (min-width: 834px) and (max-width: 1280px) {
  #app {
    grid-template-columns: minmax(0, 1fr) 400px 400px minmax(0, 1fr);
    grid-template-rows: 40px 300px 300px 300px minmax(0, 1fr);

    grid-template-areas:
    '.  tit tit  .'
    '.  hoc mic  .'
    '.  dwc dmc  .'
    '.  moc cex  .'
    '.  ttc .    .'
    '.  .   .    .';
  }
  #minuteContainer        { height: 300px; }
  #hourContainer          { height: 300px; }
  #dayOfMonthContainer    { height: 300px; }
  #monthContainer         { height: 300px; }
  #dayOfWeekContainer     { height: 300px; }
  #cronExpressionGridItem { height: 300px; }

  .container {
    padding: 5px 30px 30px 30px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .inputHeader {
    padding: 0.5em 0 0.5em 0;
  }
}

@media (min-width: 600px) and (max-width: 833px) {
  #app {
    grid-template-columns: 5px 1fr 1fr 5px;
    grid-template-rows: 40px 200px 200px 200px minmax(0, 1fr);

    grid-template-areas:
    '. tit tit .'
    '. hoc mic .'
    '. dwc dmc .'
    '. moc cex .';
  }

  .container {
    padding: 5px 5px 5px 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  #minuteContainer        { height: 200px; }
  #hourContainer          { height: 200px; }
  #dayOfMonthContainer    { height: 200px; }
  #monthContainer         { height: 200px; }
  #dayOfWeekContainer     { height: 200px; }
  #cronExpressionGridItem { height: 200px; }
  .inputHeader {
    padding: 0 0 0.5em 0;
  }
}

@media (max-width: 599px) {
  #app {
    grid-column-gap: 0;
    grid-row-gap: 5px;
    grid-template-columns: 0.02fr 1fr 0.02fr;
    grid-template-rows: 30px 200px 200px 200px 200px 200px 200px;

    grid-template-areas:
    'tit tit tit'
    '.   hoc .  '
    '.   mic .  '
    '.   dwc .  '
    '.   dmc .  '
    '.   moc .  '
    '.   cex .  ';
  }

  .container {
    padding: 5px 5px 5px 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  #hourContainer {
    height: 200px;
  }
  #minuteContainer {
    height: 200px;
  }
  #dayOfWeekContainer {
    height: 200px;
  }
  #dayOfMonthContainer {
    height: 200px;
  }
  #monthContainer {
    height: 200px;
  }
  #cronExpressionGridItem {
    height: 200px;
  }
  .inputHeader {
    padding: 0 0 0.5em 0;
  }
  h1 {
    font-size: 1.5em;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;

  background: white;
  border-radius: 5px;
}

.container ul {
  flex: 1;
  display: inline-grid;
  box-sizing: border-box;

  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.container li {
  list-style: none;
  display: inline-block;
}

.inputHeader {
  display: flex;
  justify-content: space-between;
}

.inputHeader h2 {
  text-align: left;
  user-select: none;
}

body {
  background: rgb(240, 240, 240);
}

h1 {
  text-align: center;
}

button {
  cursor: pointer;
}
.uiButton {
  background: #6c5ce7;
  color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
</style>
