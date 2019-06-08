<template>
  <div id="app">
    <h1 id="title">Cron Expression Generator</h1>
    <minute class="container"/>
    <hour class="container"/>
    <day-of-month class="container"/>
    <month class="container"/>
    <day-of-week class="container"/>
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

export default {
  name: 'app',
  components: {
    Minute,
    Hour,
    DayOfMonth,
    Month,
    DayOfWeek,
    CronExpression
  },
  beforeCreate () {
    this.$store.commit('setup')
  }
}
</script>

<style lang="scss">
* { margin: 0; padding: 0; }

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
  '.  .   .   .   .';
}

#title {grid-area: tit }
#minuteContainer { grid-area: mic}
#hourContainer { grid-area: hoc }
#dayOfMonthContainer { grid-area: dmc }
#monthContainer { grid-area: moc }
#dayOfWeekContainer { grid-area: dwc }
#cronExpressionGridItem { grid-area: cex }

// @media (min-width: 1280px) { 
// } 

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: white;
  border-radius: 5px;
  padding: 5px 30px 30px 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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

.container h2 {
  text-align: center;
  padding: 1em;
  user-select: none;
}

body {
  background: rgb(240, 240, 240);
}

h1 {
  text-align: center;
}

.uiButton {
  background: #6c5ce7;
  color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.uiButton:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
