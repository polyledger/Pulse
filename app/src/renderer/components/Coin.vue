<template>
  <div class="container">
    <div class="mt-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <router-link to="/coins">
          <i class="icon icon-arrow-with-circle-left" style="font-size: 24px;"></i>
        </router-link>
        <img id="logo" src="~@/assets/img/logo.png" alt="Polyledger">
        <div></div>
      </div>
    </div>

    <div class="alert alert-danger alert-dismissible" role="alert" v-show="alert.error">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
      </button>
      <i class="icon icon-bug"></i> {{ alert.error }}
    </div>

    <div class="dashhead">
      <div class="dashhead-titles">
        <h6 class="dashhead-subtitle">{{ type }}</h6>
        <h3 class="dashhead-title" v-cloak>{{ ticker.name }} <span class="text-muted">{{ticker.symbol}}</span></h3>
      </div>

      <div class="dashhead-toolbar">
        <h5>{{ formatCurrency(ticker.price_usd) }}</h5>
      </div>
    </div>

    <div class="ex-line-graphs mt-5 mb-3">
      <canvas :id="`chart-${ticker.id}`" width="400" height="400" data-chart="line"></canvas>
    </div>

    <div class="d-flex justify-content-center mb-5">
      <div class="btn-group dashhead-toolbar-item btn-group-thirds">
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '1day'}]" @click="setPeriod('1day')">24 Hours</button>
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '7day'}]" @click="setPeriod('7day')">7 Days</button>
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '30day'}]" @click="setPeriod('30day')">1 Month</button>
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '90day'}]" @click="setPeriod('90day')">3 Months</button>
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '180day'}]" @click="setPeriod('180day')">6 Months</button>
        <button type="button" :class="['btn', 'btn-outline-primary', {active: period == '365day'}]" @click="setPeriod('365day')">1 Year</button>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-md-3">
        <h4>Market Cap</h4>
        <p class="lead">{{ formatCurrency(ticker.market_cap_usd) }}</p>
      </div>
      <div class="col-md-3">
        <h4>Supply</h4>
        <p class="lead">{{ formatNumber(ticker.total_supply) }} {{ ticker.symbol }}</p>
      </div>
      <div class="col-md-3">
        <h4>24H Volume</h4>
        <p class="lead">{{ formatCurrency(ticker['24h_volume_usd']) }}</p>
      </div>
      <div class="col-md-3">
        <h4>Rank</h4>
        <p class="lead">{{ ticker.rank }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import Coinage from 'coinage-lib'

let transpose = (a) => {
  return Object.keys(a[0]).map(c => {
    return a.map(r => { return r[c] })
  })
}

var Charts = {

  line: function (element, elData, timeOnly) {
    if (typeof window.chart !== 'undefined') {
      window.chart.destroy()
    }

    var data = elData.datasets || []
    var labels = elData.labels || {}

    labels = labels.map(label => {
      let value = timeOnly ? new Date(label).toLocaleTimeString() : new Date(label).toLocaleDateString()
      return value
    })

    data = {
      labels: labels,
      datasets: data.map(function (set, i) {
        return {
          data: set,
          fill: true,
          backgroundColor: 'rgba(28,168,221,.03)',
          borderColor: '#42a5f5',
          pointBorderColor: '#fff',
          lineTension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 20
        }
      })
    }

    var options = {
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            color: 'rgba(255,255,255,.05)',
            zeroLineColor: 'rgba(255,255,255,.05)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#a2a2a2',
            fontSize: 14
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#a2a2a2',
            fontSize: 14
          }
        }]
      }
    }

    window.chart = new window.Chart(element.get(0).getContext('2d'), { // eslint-disable-line no-new
      type: 'line',
      data: data,
      options: options
    })
  }
}

export default {
  name: 'coin',
  data () {
    return {
      alert: {
        error: null,
        info: null,
        success: null,
        warning: null
      },
      currency: 'USD',
      dataset: [],
      labels: [],
      period: '1day',
      ticker: {},
      type: 'price'
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
    formatNumber (number) {
      if (number) {
        return parseFloat(number).toLocaleString()
      }
    },
    setPeriod (period) {
      this.period = period
      window.$(`#chart-${this.ticker.id}`).removeClass('js-chart-drawn')
      Coinage.getHistory(this.coin, this.type, period).then(history => {
        let transposed = transpose(history)  // Transpose the returned data
        this.dataset = transposed[1]
        this.labels = transposed[0]
        let element = window.$(`#chart-${this.ticker.id}`)

        let timeOnly = this.period === '1day'

        Charts.line(element, { datasets: [this.dataset], labels: this.labels }, timeOnly)
        window.$(`#chart-${this.ticker.id}`).addClass('js-chart-drawn')
      }).catch(error => {
        this.alert.error = error
      })
    }
  },
  mounted () {
    this.coin = this.$route.params.symbol

    Coinage.getTickers([this.coin]).then(tickers => {
      this.ticker = tickers[0]

      Coinage.getHistory(this.coin, 'price', '1day').then(history => {
        let transposed = transpose(history)  // Transpose the returned data
        this.dataset = transposed[1]
        this.labels = transposed[0]
        let element = window.$(`#chart-${this.ticker.id}`)

        Charts.line(element, { datasets: [this.dataset], labels: this.labels }, true)
        window.$(`#chart-${this.ticker.id}`).addClass('js-chart-drawn')
      }).catch(error => {
        this.alert.error = error
      })
    }).catch(error => {
      this.alert.error = error
    })
  }
}
</script>
