export default class CronExpressionHandler {
  calcExpression (arr, min, max) {
    if (arr.slice(min, max + 1).every(val => { return val })) {
      return '*'
    }
    if (arr.slice(min, max + 1).every(val => { return !val })) {
      return '-'
    }

    let result = ''
    let i = arr.indexOf(true, min)

    while (i <= max && i >= min) {
      if (i == max) {
        result += result.length > 0 ? ',' : ''
        result += i
        // quit while
        i += 1
      }
      // find streak
      else if (arr[i + 1]) {
        let j = i + 1
        while (true) {
          // if max or not-trigger reached
          if (j == max || !arr[j + 1]) {
            break
          }
          // if streak continous
          else {
            j += 1
          }
        }
        result += result.length > 0 ? ',' : ''
        result += i + '-' + j

        // if streak reached max, quit while
        if (j == max) {
          i = max + 1
        }
        // continue processing on nex trigger after found streak
        i = arr.indexOf(true, j + 1)
      }
      // find potential pattern
      else {
        let breakCount = 0
        // b is the currently looked-at index for counting breaks between the first two triggers of a pattern
        let b = i
        let didReachEnd = false
        // count breaks of potential pattern
        while (!arr[++b] && !didReachEnd) {
          if (b == max) {
            didReachEnd = true
          }
          else {
            breakCount++
          }
        }
        // if there are only breaks until the ond of the array, it can't be a pattern
        if (didReachEnd) {
          result += result.length > 0 ? ',' : ''
          result += i
          // quit while
          i = max + 1
        }
        /**
         * if there were a certian amount of breaks between the following trigger
         * check if this pattern is recurring and check how long it is recurring
         * for example: t b b t ...(b b t b b t ?) => 'x-y/3'
         */
        else {
          let findingPattern = true
          let lastGoodStep = -1
          // start checking pattern on the last index of break which is a trigger
          // p is the currently looked-at index of 'finding a pattern'
          let p = b
          while (findingPattern && p <= max) {
            // check if pattern step would be out of bounds
            if (p + breakCount >= max) {
              // check if there were an actual pattern step
              if (lastGoodStep > 0) {
                // check if the pattern started at the beginnig of the array
                if (i == min) {
                  result = '*/' + (breakCount + 1)
                }
                else {
                  result += result.length > 0 ? ',' : ''
                  result += i + '-' + p + '/' + (breakCount + 1)
                }
              }
              else {
                result += result.length > 0 ? ',' : ''
                result += i
              }
              findingPattern = false
              i = arr.indexOf(true, lastGoodStep > 0 ? p + 1 : i + 1)
            }
            // check if break count is recurring
            else if (arr.slice(p + 1, p + breakCount + 1).every(val => { return !val })) {
              // if on next pattern-step is a trigger, pattern can continue
              if (arr[p + breakCount + 1]) {
                lastGoodStep = p

                if (p + breakCount + 1 == max) {
                  if (i == min) {
                    result = '*/' + (breakCount + 1) // TODO: find usecase
                  }
                  else {
                    result += result.length > 0 ? ',' : ''
                    result += i + '-' + max + '/' + (breakCount + 1)
                  }
                  // stop finding pattern: inner loop
                  findingPattern = false
                  // stop iterating over array: outer loop
                  i = -1
                }

                p = p + breakCount + 1
              }
              // if on next pattern-step is wrongly a break
              else {
                // check if there was at least one actual pattern step
                if (lastGoodStep > 0) {
                  result += result.length > 0 ? ',' : ''
                  result += i + '-' + p + '/' + (breakCount + 1)
                }
                // otherwise just add the trigger number as single value to the result
                else {
                  result += result.length > 0 ? ',' : ''
                  result += i
                }

                if (p < max) {
                  i = arr.indexOf(true, lastGoodStep > 0 ? p + 1 : i + 1)
                }
                else {
                  i = max + 1
                }
                findingPattern = false
              }
            }
            // break count is not recurring
            else {
              // check if there was at least one actual pattern step
              if (lastGoodStep > 0) {
                result += result.length > 0 ? ',' : ''
                result += i + '-' + p + '/' + (breakCount + 1)
              }
              else {
                result += result.length > 0 ? ',' : ''
                result += i
              }
              i = arr.indexOf(true, lastGoodStep > 0 ? p + 1 : i + 1)
              findingPattern = false
            }
          }
        }
      }
    }
    // should never print x; if x was printed something went wrong
    return result.length > 0 ? result : 'x'
  }

  calcMinuteExpression (arr) {
    return this.calcExpression(arr, 0, 59)
  }

  calcHourExpression (arr) {
    return this.calcExpression(arr, 0, 23)
  }

  calcDayOfMonthExpression (arr) {
    return this.calcExpression(arr.unshift(false), 1, 31)
  }

  calcMontExpression (arr) {
    return this.calcExpression(arr.unshift(false), 1, 12)
  }

  calcDayOfWeekExpression (arr) {
    return this.calcExpression(arr, 0, 6)
  }
}
