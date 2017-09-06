<template>
  <div class="container">
    <div class="row m-t">
      <div class="col-md-12">
        <img id="logo" src="~@/assets/img/logo.png" alt="Polyledger">
      </div>
    </div>
    <div class="row">
      <div class="alert alert-success alert-dismissible" role="alert" v-show="alert.success">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-check"></i> {{ alert.success }}
      </div>
      <div class="alert alert-info alert-dismissible" role="alert" v-show="alert.info">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-info"></i> {{ alert.info }}
      </div>
      <div class="alert alert-warning alert-dismissible" role="alert" v-show="alert.warning">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-warning"></i> {{ alert.warning }}
      </div>
      <div class="alert alert-danger alert-dismissible" role="alert" v-show="alert.error">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-bug"></i> {{ alert.error }}
      </div>
    </div>
    <div class="row">
      <div class="hr-divider m-b">
        <h3 class="hr-divider-content hr-divider-heading">Coins</h3>
      </div>

      <form class="form-inline m-b text-center">
        <div class="row">
          <div class="col-md-4 col-md-offset-3">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="Search for..." style="width: 250px;" v-model="query">
              <span class="icon icon-magnifying-glass form-control-feedback"></span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <select class="form-control" style="width: 150px;" v-model="currency" @change="getTickers">
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
          <div class="col-md-3"></div>
        </div>
      </form>

      <div class="table-responsive">
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
            <tr v-for="ticker in filteredTickers">
              <td>{{ ticker.rank }}</td>
              <td>{{ ticker.name }}</td>
              <td>{{ formatCurrency(ticker[`price_${currency.toLowerCase()}`]) }}</td>
              <td>{{ formatCurrency(ticker[`market_cap_${currency.toLowerCase()}`]) }}</td>
              <td :class="[ticker.percent_change_24h > 0 ? 'positive-delta' : 'negative-delta']">{{ ticker.percent_change_24h }}%</td>
            </tr>
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
  name: 'home',
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
  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 150px;
  }
  .positive-delta {
    color: #2ecc71;
  }
  .negative-delta {
    color: #e74c3c;
  }
</style>
