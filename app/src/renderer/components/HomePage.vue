<template>
  <div class="container">
    <div class="row m-t">
      <div class="col-md-12">
        <img id="logo" src="~@/assets/img/logo.png" alt="Polyledger">
      </div>
    </div>
    <div class="row">
      <div class="alert alert-success alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-check"></i> Woot! Something was successful.
      </div>
      <div class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-info"></i> Hello, this is an informational alert.
      </div>
      <div class="alert alert-warning alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-warning"></i> Pay attention! This is a warning.
      </div>
      <div class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
        </button>
        <i class="icon icon-bug"></i> Oh snap! There was an error that occurred.
      </div>
    </div>
    <div class="row">
      <div class="hr-divider m-t m-b">
        <h3 class="hr-divider-content hr-divider-heading">Coins</h3>
      </div>

      <form class="form-inline m-b text-center">
        <div class="row">
          <div class="col-md-4 col-md-offset-3">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="Search for..." style="width: 250px;">
              <span class="icon icon-magnifying-glass form-control-feedback"></span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <select class="form-control" style="width: 150px;">
                <option>A$ AUD</option>
                <option>C$ CAD</option>
                <option>R$ BRL</option>
                <option>CHF CHF</option>
                <option>$ CLP</option>
                <option>¥ CNY</option>
                <option>Kč CZK</option>
                <option>kr DKK</option>
                <option>€ EUR</option>
                <option>£ GBP</option>
                <option>$ HKD</option>
                <option>Ft HUF</option>
                <option>Rp IDR</option>
                <option>₪ ILS</option>
                <option>₹​ INR</option>
                <option>¥ JPY</option>
                <option>₩ KRW</option>
                <option>$ MXN</option>
                <option>RM MYR</option>
                <option>$ NZD</option>
                <option>₱ PHP</option>
                <option>₨ PKR</option>
                <option>zł PLN</option>
                <option>₽ RUB</option>
                <option>kr SEK</option>
                <option>$ SGD</option>
                <option>฿ THB</option>
                <option>₺ TRY</option>
                <option selected>$ USD</option>
                <option>R ZAR</option>
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
            <tr v-for="ticker in tickers">
              <td>{{ ticker.rank }}</td>
              <td>{{ ticker.name }}</td>
              <td>$ {{ ticker.price_usd }}</td>
              <td>$ {{ ticker.market_cap_usd }}</td>
              <td>{{ ticker.percent_change_24h }} %</td>
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
  name: 'home-page',
  data () {
    return {
      tickers: []
    }
  },
  mounted () {
    Coinage.getTickers(constants.SUPPORTED_COINS).then(tickers => {
      console.log(tickers)
      this.tickers = tickers
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>
  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 150px;
  }
</style>
