<template>
  <div id="app">
    <minute class="container"/>
    <hour class="container"/>
    <day-of-month class="container"/>
    <month class="container"/>
    <day-of-week class="container"/>
  </div>
</template>

<script>
import Minute from './components/Minute'
import Hour from './components/Hour'
import DayOfMonth from './components/DayOfMonth'
import Month from './components/Month'
import DayOfWeek from './components/DayOfWeek'

export default {
  name: 'app',
  components: {
    Minute,
    Hour,
    DayOfMonth,
    Month,
    DayOfWeek,
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
  grid-template-rows: 10px 300px 300px minmax(0, 1fr);

  grid-template-areas: 
  '.  .   .   .   .'
  '.  hoc mic dwc .'
  '.  dmc moc .   .'
  '.  .   .   .   .';
}

#minuteContainer { grid-area: mic}
#hourContainer { grid-area: hoc }
#dayOfMonthContainer { grid-area: dmc }
#monthContainer { grid-area: moc }
#dayOfWeekContainer { grid-area: dwc }

// @media (min-width: 1280px) { 
//   #app {

//   }
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
}

body {
  background: rgb(240, 240, 240)
}
</style>
