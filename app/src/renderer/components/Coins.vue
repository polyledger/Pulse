<template>
  <div class="container">
    <div class="mt-3">
      <div class="d-flex justify-content-center">
        <img id="logo" src="~@/assets/img/logo.png" alt="Polyledger">
      </div>
    </div>

    <div class="alert alert-danger alert-dismissible" role="alert" v-show="alert.error">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
      </button>
      <i class="icon icon-bug"></i> {{ alert.error }}
    </div>

    <div class="row">
      <div class="flextable table-actions">
        <div class="flextable-item">
          <div class="input-with-icon">
            <input type="text" class="form-control" placeholder="Search coins" v-model="query">
            <span class="icon icon-magnifying-glass"></span>
          </div>
        </div>
        <div class="flextable-item">
          <select class="form-control float-right" v-model="currency" @change="getTickers" style="width: 100px;">
            <option value="AUD">A$ AUD</option>
            <option value="CAD">C$ CAD</option>
            <option value="BRL">R$ BRL</option>
            <option value="CHF">CHF CHF</option>
            <option value="CLP">$ CLP</option>
            <option value="CNY">¥ CNY</option>
            <option value="CZK">Kč CZK</option>
            <option value="DKK">kr DKK</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="HKD">$ HKD</option>
            <option value="HUF">Ft HUF</option>
            <option value="IDR">Rp IDR</option>
            <option value="ILS">₪ ILS</option>
            <option value="INR">₹​ INR</option>
            <option value="JPY">¥ JPY</option>
            <option value="KRW">₩ KRW</option>
            <option value="MXN">$ MXN</option>
            <option value="MYR">RM MYR</option>
            <option value="NZD">$ NZD</option>
            <option value="PHP">₱ PHP</option>
            <option value="PKR">₨ PKR</option>
            <option value="PLN">zł PLN</option>
            <option value="RUB">₽ RUB</option>
            <option value="SEK">kr SEK</option>
            <option value="SGD">$ SGD</option>
            <option value="THB">฿ THB</option>
            <option value="TRY">₺ TRY</option>
            <option value="USD" selected>$ USD</option>
            <option value="ZAR">R ZAR</option>
          </select>
        </div>
      </div>

      <div class="table-responsive table-hover">
        <table class="table">
          <thead>
            <tr>
              <th class="header">Rank</th>
              <th class="header">Cryptocurrency</th>
              <th class="header">Price</th>
              <th class="header">Market Cap</th>
              <th class="header">24h Change</th>
            </tr>
          </thead>
          <tbody>
            <router-link :to="`coins/${ticker.symbol}`" tag="tr" v-for="ticker in filteredTickers" :key="ticker.symbol">
              <td>{{ ticker.rank }}</td>
              <td>{{ ticker.name }}</td>
              <td>{{ formatCurrency(ticker[`price_${currency.toLowerCase()}`]) }}</td>
              <td>{{ formatCurrency(ticker[`market_cap_${currency.toLowerCase()}`]) }}</td>
              <td :class="['delta-indicator', ticker.percent_change_24h > 0 ? 'delta-positive' : 'delta-negative']">{{ ticker.percent_change_24h }}%</td>
            </router-link>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Coinage from 'coinage-lib'
import constants from '../constants'

export default {
  name: 'coins',
  data () {
    return {
      alert: {
        error: null,
        info: null,
        success: null,
        warning: null
      },
      currency: 'USD',
      query: '',
      tickers: []
    }
  },
  methods: {
    formatCurrency (number) {
      if (number) {
        return parseFloat(number).toLocaleString('en-US', {
          style: 'currency',
          currency: this.currency,
          currencyDisplay: 'symbol',
          useGrouping: true
        })
      }
    },
    getTickers () {
      Coinage.getTickers(constants.SUPPORTED_COINS, this.currency).then(tickers => {
        this.tickers = tickers
      }).catch(error => {
        this.error = error
      })
    },
    showChart () {
      console.log('Showing chart...')
    }
  },
  computed: {
    filteredTickers () {
      return this.tickers.filter(ticker => {
        return ticker.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      })
    }
  },
  mounted () {
    this.getTickers()
  }
}
</script>

<style>
  .delta-indicator {
    display: table-cell;
  }
  tr:hover {
    cursor: pointer;
  }
</style>
