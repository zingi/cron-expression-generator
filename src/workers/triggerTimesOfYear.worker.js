import moment from 'moment'
import parser from 'cron-parser'

self.addEventListener('message', event => {
  let simplifiedExpression = event.data.simplifiedExpression
  let year = event.data.year
  let dayMapping = event.data.dayMapping
  let iterator = null
  let date = null
  let indexArr = []
  
  try {
    if (year === moment().year()) {
      iterator = parser.parseExpression(simplifiedExpression, {
        currentDate: moment().subtract(1, 'days').toDate()
      })
    }
    else {
      iterator = parser.parseExpression(simplifiedExpression, {
        currentDate: moment(`${year}-01-01`).subtract(1, 'days').toDate()
      })
    }
  }
  catch (err) {
    console.log('Error: ' + err.message)
  }

  while ((date = moment(iterator.next().toDate())).year() === year) {
    let index = dayMapping.get(`${date.year()}-${date.month() + 1}-${date.date()}`)
    if (typeof index === 'number') {
      indexArr.push(index)
    }
  }

  self.postMessage({ indexArr: indexArr,  simplifiedExpression: simplifiedExpression })
})