import Vue from 'vue'
import Vuex from 'vuex'
import CronExpressionHandler from './services/CronExpressionHandler'

Vue.use(Vuex)
const ceh = new CronExpressionHandler()

export default new Vuex.Store({
  state: {
    minute: [],
    hour: [],
    dayOfMonth: [],
    month: [],
    dayOfWeek: []
  },
  mutations: {
    setup (state) {
      for (let i = 0; i < 60; i++) {
        if (i < 7) {
          state.dayOfWeek.push(false)
        }
        if (i < 12) {
          state.month.push(false)
        }
        if (i < 24) {
          state.hour.push(false)
        }
        if (i < 31) {
          state.dayOfMonth.push(false)
        }
        state.minute.push(false)
      }
    },
    setMinute (state, payload) {
      Vue.set(state.minute, payload.minute, payload.active)
    },
    setHour (state, payload) {
      Vue.set(state.hour, payload.hour, payload.active)
    },
    setDayOfMonth (state, payload) {
      Vue.set(state.dayOfMonth, payload.dayOfMonth, payload.active)
    },
    setMonth (state, payload) {
      Vue.set(state.month, payload.month, payload.active)
    },
    setDayOfWeek (state, payload) {
      Vue.set(state.dayOfWeek, payload.dayOfWeek, payload.active)
    }
  },
  getters: {
    minuteExpression: state => {
      return ceh.calcMinuteExpression(state.minute)
    },
    hourExpression: state => {
      return ceh.calcHourExpression(state.hour)
    },
    dayOfMonthExpression: state => {
      return ceh.calcDayOfMonthExpression(state.dayOfMonth)
    },
    monthExpression: state => {
      return ceh.calcMonthExpression(state.month)
    },
    dayOfWeekExpression: state => {
      return ceh.calcDayOfWeekExpression(state.dayOfWeek)
    }
  }
})
