import moment from 'moment'
import parser from 'cron-parser'

self.addEventListener('message', event => {
  let simplifiedExpression  = event.data.simplifiedExpression
  let year                  = event.data.year
  let dayMapping            = event.data.dayMapping
  let iterator              = null
  let date                  = null
  let indexArr              = []
  
  /**
  * uses the computed simplified expression,
  * to get an iterator which iterates over the upcoming days which hold a trigger-time
  * with the simplified expression, the time-part (hour and minute)
  * of the expression is ignored to reduce calculation work
  */
  try {
    /**
     * if the looked at year is the current year,
     * start calculations from current date, 
     * since the rest is already in the past
     */
    if (year === moment().year()) {
      iterator = parser.parseExpression(simplifiedExpression, {
        currentDate: moment().subtract(1, 'days').toDate()
      })
    }
    /**
     * if the looked at year is in the future,
     * calculate the trigger-days of the whole year
     */
    else {
      iterator = parser.parseExpression(simplifiedExpression, {
        currentDate: moment(`${year}-01-01`).subtract(1, 'days').toDate()
      })
    }
  }
  catch (err) {
    console.log('Error: ' + err.message)
  }

  /**
   * iterate over all upcoming trigger days of the looked at year
   */
  while ((date = moment(iterator.next().toDate())).year() === year) {
    let index = dayMapping.get(`${date.year()}-${date.month() + 1}-${date.date()}`)
    if (typeof index === 'number') {
      indexArr.push(index)
    }
  }

  /**
   * return the indeces of the trigger-days to the parent
   */
  self.postMessage({ indexArr: indexArr,  simplifiedExpression: simplifiedExpression })
})