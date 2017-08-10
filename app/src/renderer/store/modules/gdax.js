import Vue from 'vue'
import Gdax from 'gdax'

const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'LTC-USD'])

const conversionForCoins = {
  'BTC-USD': 'bitcoin',
  'ETH-USD': 'ether',
  'LTC-USD': 'litecoin'
}

let transpose = (a) => {
  return Object.keys(a[0]).map(c => {
    return a.map(r => { return r[c] })
  })
}

const state = {
  bitcoin: { price: undefined, sparklineData: [], sparklineLabels: [] },
  ether: { price: undefined, sparklineData: [], sparklineLabels: [] },
  litecoin: { price: undefined, sparklineData: [], sparklineLabels: [] }
}

const getters = {
  bitcoin: state => state.bitcoin,
  ether: state => state.ether,
  litecoin: state => state.litecoin
}

const mutations = {
  UPDATE_PRICE (state, { data, coin }) {
    let price = parseFloat(data.price)
    state[coin].price = price.toFixed(2)

    // Get the 24 hour change in price
    let change = ((state[coin].price - state[coin].open) / state[coin].open) * 100
    state[coin].change = change.toFixed(2)
  },
  UPDATE_STATS (state, { data, coin }) {
    for (let key in data) {
      state[coin][key] = parseFloat(data[key]).toFixed(2)

      if (key === 'open') {
        // Get the 24 hour change in price
        let change = ((state[coin].price - data[key]) / data[key]) * 100
        state[coin].change = change.toFixed(2)
      }
    }
  },
  UPDATE_HISTORIC_RATES (state, { data, coin }) {
    // Transpose the returned data
    let transposed = transpose(data)
    state[coin].sparklineData = transposed[4].join(', ')
    state[coin].sparklineLabels = transposed[0].join(', ')
  }
}

const actions = {
  getInitialPrices ({ commit }) {
    for (let conversion in conversionForCoins) {
      let coin = conversionForCoins[conversion]
      Vue.http.get(`https://api.gdax.com/products/${conversion}/ticker`).then(response => {
        commit('UPDATE_PRICE', { data: response.data, coin: coin })
      })
    }
  },
  getStats ({ commit }) {
    for (let conversion in conversionForCoins) {
      let coin = conversionForCoins[conversion]
      Vue.http.get(`https://api.gdax.com/products/${conversion}/stats`).then(response => {
        commit('UPDATE_STATS', { data: response.data, coin: coin })
      })
    }
  },
  getHistoricalRates ({ commit }) {
    for (let conversion in conversionForCoins) {
      let coin = conversionForCoins[conversion]
      let start = new Date(Math.round(new Date().getTime()) - 86400000)
      let end = new Date()
      let granularity = 875
      Vue.http.get(`https://api.gdax.com/products/${conversion}/candles?start=${start}&end=${end}&granularity=${granularity}`).then(response => {
        commit('UPDATE_HISTORIC_RATES', { data: response.data, coin: coin })
      })
    }
  },
  subscribeToFeed ({ commit }) {
    websocket.on('message', data => {
      if (data.type === 'match') {
        commit('UPDATE_PRICE', { data: data, coin: conversionForCoins[data.product_id] })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
