<template>
  <div id="triggerCalendarContainer" v-recognizer:swipe.right="onSwipeRight" v-recognizer:swipe.left="onSwipeLeft">

    <div v-for="cell of cells" :key="cell.id" :id="cell.id" :style='{ "grid-area": cell.gridArea}' class="cell" :class="{ active: cell.isActive }">
      {{cell.content}}
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import parser from 'cron-parser'

export default {
  name: 'TriggerCalendar',
  data () {
    return {
      cells: [],
      dayMapping: null,
      year: -1
    }
  },
  methods: {
    /**
     * adds a cell to the cells-array,
     * which is used to display data in the year-grid
     */
    initCell (id, gridArea, content = '') {
      this.cells.push({
        id: id,
        gridArea: gridArea,
        content: content,
        isActive: false
      })
    },
    /**
     * fills the grid with the day-layout of the provided year
     */
    initYear (year) {
      this.clearYearLayout()
      this.dayMapping = new Map()
      // for every month
      for (let month = 1; month <= 12; month++) {
        // fetch the first day of the month
        let date = moment(`${year}-${month < 10 ? '0' + month : month}-01`)
        // get the weekday number (1-7) for the previously fetched first day
        let start = date.isoWeekday()
        let monthPrefix = this.getMonthPrefix(month)
        let day = 1

        // find the index of the first-day-cell in the cells array
        let index = this.cells.findIndex((element) => {
          return element.id === `${monthPrefix}_${start}`
        })

        // if the previous search was successful
        if (index > -1) {
          // iterate over all days of the currently looked at month
          while (date.month() + 1 === month) {
            // set the day-number in the correct cell
            this.cells[index].content = day
            // keep a mapping of the day to the corresponding index in the cell array
            this.dayMapping.set(`${year}-${month}-${day}`, index)

            date.add(1, 'days')
            index++
            day++
          }
        }
      }

      // find index of year-label-cell in the cell array
      let yearLabelIndex = this.cells.findIndex((element) => {
        return element.id === 'yea_la'
      })
      // if the previous search was successful
      if (yearLabelIndex > -1) {
        // set the year label, to the provided year-number
        this.cells[yearLabelIndex].content = `${year}`
        // save the year number also as member of this component for later usage
        this.year = parseInt(year)
      }

      this.updateCalendarTriggerHighlighting()
    },
    getMonthPrefix (month) {
      switch (month) {
        case 1:
          return 'jan'
        case 2:
          return 'feb'
        case 3:
          return 'mar'
        case 4:
          return 'apr'
        case 5:
          return 'may'
        case 6:
          return 'jun'
        case 7:
          return 'jul'
        case 8:
          return 'aug'
        case 9:
          return 'sep'
        case 10:
          return 'oct'
        case 11:
          return 'nov'
        case 12:
          return 'dec'
        default:
          break
      }
    },
    /**
     * uses the computed simplified expression,
     * to return an iterator which iterates over the upcoming days
     * which hold a trigger-time
     * with the simplified expression, the time-part (hour and minute)
     * of the expression is ignored to reduce calculation work
     */
    getDailyTriggersIterator () {
      try {
        let iterator = null
        if (this.year === moment().year()) {
          iterator = parser.parseExpression(this.simplifiedExpression, {
            currentDate: moment().subtract(1, 'days').toDate()
          })
        }
        else {
          iterator = parser.parseExpression(this.simplifiedExpression, {
            currentDate: moment(`${this.year}-01-01`).subtract(1, 'days').toDate()
          })
        }
        return iterator
      }
      catch (err) {
        console.log('Error: ' + err.message)
      }
      return null
    },
    /**
     * iterates over all days and sets their isActive flag to false
     */
    setAllDaysInactive () {
      for (let day of this.dayMapping.keys()) {
        let index = this.dayMapping.get(day)
        if (index) {
          this.cells[index].isActive = false
        }
      }
    },
    clearYearLayout () {
      if (this.dayMapping && this.dayMapping.size > 0) {
        for (let day of this.dayMapping.keys()) {
          this.cells[this.dayMapping.get(day)].content = ''
          this.cells[this.dayMapping.get(day)].isActive = false
        }
      }
    },
    onSwipeLeft () {
      this.initYear(this.year > 0 ? this.year + 1 : moment().year())
    },
    onSwipeRight () {
      if (this.year > 0 && this.year > moment().year()) {
        this.initYear(this.year - 1)
      }
      else {
        this.$toasted.show('You can\'t go in the past!', {
          type: 'error'
        })
        // wiggle the calendar
        this.$anime.timeline().add({
          targets: this.$el,
          easing: 'easeInOutSine',
          duration: 500,
          translateX: [{ value: 16 }, { value: 16 * -1 }, { value: 16 / 2 }, { value: 16 / -2 }, { value: 0 }]
        })
      }
    },
    updateCalendarTriggerHighlighting () {
      if (this.simplifiedExpression.includes('x')) {
        this.setAllDaysInactive()
      }
      else {
        this.setAllDaysInactive()
        let iterator = this.getDailyTriggersIterator()
        let date = null

        if (!iterator) {
          console.warn('could not get daily-trigger-iterator; iterator was null')
          return
        }

        while ((date = moment(iterator.next().toDate())).year() === this.year) {
          let index = this.dayMapping.get(`${date.year()}-${date.month() + 1}-${date.date()}`)
          if (typeof index === 'number') {
            this.cells[index].isActive = true
          }
        }
      }
    }
  },
  beforeMount () {
    /**
     * construct grid layout
     */

    // create 12 7x6 cell-arrays for the months
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        for (let c = 0; c < 42; c++) {
          switch (`${i}-${j}`) {
            case '0-0':
              this.initCell(`jan_${c + 1}`, `jan-${c < 10 ? '0' + c : c}`)
              break
            case '1-0':
              this.initCell(`feb_${c + 1}`, `feb-${c < 10 ? '0' + c : c}`)
              break
            case '2-0':
              this.initCell(`mar_${c + 1}`, `mar-${c < 10 ? '0' + c : c}`)
              break
            case '3-0':
              this.initCell(`apr_${c + 1}`, `apr-${c < 10 ? '0' + c : c}`)
              break
            case '0-1':
              this.initCell(`may_${c + 1}`, `may-${c < 10 ? '0' + c : c}`)
              break
            case '1-1':
              this.initCell(`jun_${c + 1}`, `jun-${c < 10 ? '0' + c : c}`)
              break
            case '2-1':
              this.initCell(`jul_${c + 1}`, `jul-${c < 10 ? '0' + c : c}`)
              break
            case '3-1':
              this.initCell(`aug_${c + 1}`, `aug-${c < 10 ? '0' + c : c}`)
              break
            case '0-2':
              this.initCell(`sep_${c + 1}`, `sep-${c < 10 ? '0' + c : c}`)
              break
            case '1-2':
              this.initCell(`oct_${c + 1}`, `oct-${c < 10 ? '0' + c : c}`)
              break
            case '2-2':
              this.initCell(`nov_${c + 1}`, `nov-${c < 10 ? '0' + c : c}`)
              break
            case '3-2':
              this.initCell(`dec_${c + 1}`, `dec-${c < 10 ? '0' + c : c}`)
              break
            default:
              break
          }
        }
      }
    }

    // create cells for the month labels
    this.initCell('jan_la', 'jan-la', 'Jan')
    this.initCell('feb_la', 'feb-la', 'Feb')
    this.initCell('mar_la', 'mar-la', 'Mar')
    this.initCell('apr_la', 'apr-la', 'Apr')
    this.initCell('may_la', 'may-la', 'May')
    this.initCell('jun_la', 'jun-la', 'June')
    this.initCell('jul_la', 'jul-la', 'July')
    this.initCell('aug_la', 'aug-la', 'Aug')
    this.initCell('sep_la', 'sep-la', 'Sep')
    this.initCell('oct_la', 'oct-la', 'Oct')
    this.initCell('nov_la', 'nov-la', 'Nov')
    this.initCell('dec_la', 'dec-la', 'Dec')

    // create a cell for the year label
    this.initCell('yea_la', 'yea-la')

    // create cells for the week-day lables on the bottom
    for (let row = 0; row < 4; row++) {
      this.initCell(`wd${row}_mo`, `wd${row}-mo`, 'M')
      this.initCell(`wd${row}_tu`, `wd${row}-tu`, 'T')
      this.initCell(`wd${row}_we`, `wd${row}-we`, 'W')
      this.initCell(`wd${row}_th`, `wd${row}-th`, 'T')
      this.initCell(`wd${row}_fr`, `wd${row}-fr`, 'F')
      this.initCell(`wd${row}_sa`, `wd${row}-sa`, 'S')
      this.initCell(`wd${row}_su`, `wd${row}-su`, 'S')
    }

    // construct the layout of the current year in the previous generated cells
    this.initYear(moment().year())
  },
  computed: {
    /**
     * if the current cron expression is valid:
     *    ignores the minute and hour part of the expression,
     *    by exchanging both with only the first number: '0'
     * else:
     *    returns unmodified expression
     */
    simplifiedExpression () {
      let expression = this.$store.getters.expression
      if (expression.includes('x')) {
        return expression
      }
      else {
        let parts = expression.split(' ')
        parts[0] = '0'
        parts[1] = '0'
        return parts.join(' ')
      }
    }
  },
  watch: {
    simplifiedExpression (val) {
      this.updateCalendarTriggerHighlighting()
    }
  }
}
</script>

<style scoped>
  #triggerCalendarContainer {
    user-select: none;
    display: grid;

    grid-template-columns: repeat(33, 1fr);
    grid-template-rows: repeat(23, 1fr);

    grid-template-areas:
    '.      yea-la yea-la yea-la yea-la yea-la yea-la yea-la .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      .      '
    '.      jan-la jan-la jan-la jan-la jan-la jan-la jan-la .      feb-la feb-la feb-la feb-la feb-la feb-la feb-la .      mar-la mar-la mar-la mar-la mar-la mar-la mar-la .      apr-la apr-la apr-la apr-la apr-la apr-la apr-la .      '
    '.      jan-00 jan-01 jan-02 jan-03 jan-04 jan-05 jan-06 .      feb-00 feb-01 feb-02 feb-03 feb-04 feb-05 feb-06 .      mar-00 mar-01 mar-02 mar-03 mar-04 mar-05 mar-06 .      apr-00 apr-01 apr-02 apr-03 apr-04 apr-05 apr-06 .      '
    '.      jan-07 jan-08 jan-09 jan-10 jan-11 jan-12 jan-13 .      feb-07 feb-08 feb-09 feb-10 feb-11 feb-12 feb-13 .      mar-07 mar-08 mar-09 mar-10 mar-11 mar-12 mar-13 .      apr-07 apr-08 apr-09 apr-10 apr-11 apr-12 apr-13 .      '
    '.      jan-14 jan-15 jan-16 jan-17 jan-18 jan-19 jan-20 .      feb-14 feb-15 feb-16 feb-17 feb-18 feb-19 feb-20 .      mar-14 mar-15 mar-16 mar-17 mar-18 mar-19 mar-20 .      apr-14 apr-15 apr-16 apr-17 apr-18 apr-19 apr-20 .      '
    '.      jan-21 jan-22 jan-23 jan-24 jan-25 jan-26 jan-27 .      feb-21 feb-22 feb-23 feb-24 feb-25 feb-26 feb-27 .      mar-21 mar-22 mar-23 mar-24 mar-25 mar-26 mar-27 .      apr-21 apr-22 apr-23 apr-24 apr-25 apr-26 apr-27 .      '
    '.      jan-28 jan-29 jan-30 jan-31 jan-32 jan-33 jan-34 .      feb-28 feb-29 feb-30 feb-31 feb-32 feb-33 feb-34 .      mar-28 mar-29 mar-30 mar-31 mar-32 mar-33 mar-34 .      apr-28 apr-29 apr-30 apr-31 apr-32 apr-33 apr-34 .      '
    '.      jan-35 jan-36 jan-37 jan-38 jan-39 jan-40 jan-41 .      feb-35 feb-36 feb-37 feb-38 feb-39 feb-40 feb-41 .      mar-35 mar-36 mar-37 mar-38 mar-39 mar-40 mar-41 .      apr-35 apr-36 apr-37 apr-38 apr-39 apr-40 apr-41 .      '

    '.      may-la may-la may-la may-la may-la may-la may-la .      jun-la jun-la jun-la jun-la jun-la jun-la jun-la .      jul-la jul-la jul-la jul-la jul-la jul-la jul-la .      aug-la aug-la aug-la aug-la aug-la aug-la aug-la .      '
    '.      may-00 may-01 may-02 may-03 may-04 may-05 may-06 .      jun-00 jun-01 jun-02 jun-03 jun-04 jun-05 jun-06 .      jul-00 jul-01 jul-02 jul-03 jul-04 jul-05 jul-06 .      aug-00 aug-01 aug-02 aug-03 aug-04 aug-05 aug-06 .      '
    '.      may-07 may-08 may-09 may-10 may-11 may-12 may-13 .      jun-07 jun-08 jun-09 jun-10 jun-11 jun-12 jun-13 .      jul-07 jul-08 jul-09 jul-10 jul-11 jul-12 jul-13 .      aug-07 aug-08 aug-09 aug-10 aug-11 aug-12 aug-13 .      '
    '.      may-14 may-15 may-16 may-17 may-18 may-19 may-20 .      jun-14 jun-15 jun-16 jun-17 jun-18 jun-19 jun-20 .      jul-14 jul-15 jul-16 jul-17 jul-18 jul-19 jul-20 .      aug-14 aug-15 aug-16 aug-17 aug-18 aug-19 aug-20 .      '
    '.      may-21 may-22 may-23 may-24 may-25 may-26 may-27 .      jun-21 jun-22 jun-23 jun-24 jun-25 jun-26 jun-27 .      jul-21 jul-22 jul-23 jul-24 jul-25 jul-26 jul-27 .      aug-21 aug-22 aug-23 aug-24 aug-25 aug-26 aug-27 .      '
    '.      may-28 may-29 may-30 may-31 may-32 may-33 may-34 .      jun-28 jun-29 jun-30 jun-31 jun-32 jun-33 jun-34 .      jul-28 jul-29 jul-30 jul-31 jul-32 jul-33 jul-34 .      aug-28 aug-29 aug-30 aug-31 aug-32 aug-33 aug-34 .      '
    '.      may-35 may-36 may-37 may-38 may-39 may-40 may-41 .      jun-35 jun-36 jun-37 jun-38 jun-39 jun-40 jun-41 .      jul-35 jul-36 jul-37 jul-38 jul-39 jul-40 jul-41 .      aug-35 aug-36 aug-37 aug-38 aug-39 aug-40 aug-41 .      '

    '.      sep-la sep-la sep-la sep-la sep-la sep-la sep-la .      oct-la oct-la oct-la oct-la oct-la oct-la oct-la .      nov-la nov-la nov-la nov-la nov-la nov-la nov-la .      dec-la dec-la dec-la dec-la dec-la dec-la dec-la .      '
    '.      sep-00 sep-01 sep-02 sep-03 sep-04 sep-05 sep-06 .      oct-00 oct-01 oct-02 oct-03 oct-04 oct-05 oct-06 .      nov-00 nov-01 nov-02 nov-03 nov-04 nov-05 nov-06 .      dec-00 dec-01 dec-02 dec-03 dec-04 dec-05 dec-06 .      '
    '.      sep-07 sep-08 sep-09 sep-10 sep-11 sep-12 sep-13 .      oct-07 oct-08 oct-09 oct-10 oct-11 oct-12 oct-13 .      nov-07 nov-08 nov-09 nov-10 nov-11 nov-12 nov-13 .      dec-07 dec-08 dec-09 dec-10 dec-11 dec-12 dec-13 .      '
    '.      sep-14 sep-15 sep-16 sep-17 sep-18 sep-19 sep-20 .      oct-14 oct-15 oct-16 oct-17 oct-18 oct-19 oct-20 .      nov-14 nov-15 nov-16 nov-17 nov-18 nov-19 nov-20 .      dec-14 dec-15 dec-16 dec-17 dec-18 dec-19 dec-20 .      '
    '.      sep-21 sep-22 sep-23 sep-24 sep-25 sep-26 sep-27 .      oct-21 oct-22 oct-23 oct-24 oct-25 oct-26 oct-27 .      nov-21 nov-22 nov-23 nov-24 nov-25 nov-26 nov-27 .      dec-21 dec-22 dec-23 dec-24 dec-25 dec-26 dec-27 .      '
    '.      sep-28 sep-29 sep-30 sep-31 sep-32 sep-33 sep-34 .      oct-28 oct-29 oct-30 oct-31 oct-32 oct-33 oct-34 .      nov-28 nov-29 nov-30 nov-31 nov-32 nov-33 nov-34 .      dec-28 dec-29 dec-30 dec-31 dec-32 dec-33 dec-34 .      '
    '.      sep-35 sep-36 sep-37 sep-38 sep-39 sep-40 sep-41 .      oct-35 oct-36 oct-37 oct-38 oct-39 oct-40 oct-41 .      nov-35 nov-36 nov-37 nov-38 nov-39 nov-40 nov-41 .      dec-35 dec-36 dec-37 dec-38 dec-39 dec-40 dec-41 .      '
    '.      wd0-mo wd0-tu wd0-we wd0-th wd0-fr wd0-sa wd0-su .      wd1-mo wd1-tu wd1-we wd1-th wd1-fr wd1-sa wd1-su .      wd2-mo wd2-tu wd2-we wd2-th wd2-fr wd2-sa wd2-su .      wd3-mo wd3-tu wd3-we wd3-th wd3-fr wd3-sa wd3-su .      ';
  }

  .cell {
    font-size: 7px;
  }

  .active {
    background: lightgreen;
  }
</style>
