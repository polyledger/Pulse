<template>
  <div class="container">
    <div class="row m-t">
      <div class="col-md-12">
        <img id="logo" src="~@/assets/img/logo.png" alt="Polyledger">
      </div>
    </div>
    <div class="row m-b">
      <div class="col-sm-4">
        <div :class="['statcard', isPositive(bitcoin.change) ? 'statcard-success' : 'statcard-danger']">
          <div class="p-a">
            <span class="statcard-desc">BTC-USD</span>
            <h3 class="statcard-number">
              ${{ bitcoin.price }}
              <small :class="['delta-indicator', isPositive(bitcoin.change) ? 'delta-positive' : 'delta-negative']">{{ bitcoin.change }}%</small>
            </h3>
            <div class="m-t">
              <span><small>High:</small> {{ bitcoin.high }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><small>Low:</small> {{ bitcoin.low }}</span>
            </div>
            <hr class="statcard-hr m-b-0">
          </div>
          <canvas
            id="bitcoin"
            class="sparkline"
            data-chart="spark-line"
            :data-value="`[{strokeColor:'#1ca8dd', fillColor:'rgba(28,168,221,0.3)', data:[${bitcoin.sparklineData}]}]`"
            :data-labels="`[${bitcoin.sparklineLabels}]`"
            width="378" height="94">
          </canvas>
        </div>
      </div>
      <div class="col-sm-4">
        <div :class="['statcard', isPositive(ether.change) ? 'statcard-success' : 'statcard-danger']">
          <div class="p-a">
            <span class="statcard-desc">ETH-USD</span>
            <h3 class="statcard-number">
              ${{ ether.price }}
              <small :class="['delta-indicator', isPositive(ether.change) ? 'delta-positive' : 'delta-negative']">{{ ether.change }}%</small>
            </h3>
            <div class="m-t">
              <span><small>High:</small> {{ ether.high }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><small>Low:</small> {{ ether.low }}</span>
            </div>
            <hr class="statcard-hr m-b-0">
          </div>
          <canvas
            id="ether"
            class="sparkline"
            data-chart="spark-line"
            :data-value="`[{strokeColor:'#1ca8dd', fillColor:'rgba(28,168,221,0.3)', data:[${ether.sparklineData}]}]`"
            :data-labels="`[${ether.sparklineLabels}]`"
            width="378" height="94">
          </canvas>
        </div>
      </div>
      <div class="col-sm-4">
        <div :class="['statcard', isPositive(litecoin.change) ? 'statcard-success' : 'statcard-danger']">
          <div class="p-a">
            <span class="statcard-desc">LTC-USD</span>
            <h3 class="statcard-number">
              ${{ litecoin.price }}
              <small :class="['delta-indicator', isPositive(litecoin.change) ? 'delta-positive' : 'delta-negative']">{{ litecoin.change }}%</small>
            </h3>
            <div class="m-t">
              <span><small>High:</small> {{ litecoin.high }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><small>Low:</small> {{ litecoin.low }}</span>
            </div>
            <hr class="statcard-hr m-b-0">
          </div>
          <canvas
            id="litecoin"
            data-chart="spark-line"
            :data-value="`[{strokeColor:'#1ca8dd', fillColor:'rgba(28,168,221,0.3)', data:[${litecoin.sparklineData}]}]`"
            :data-labels="`[${litecoin.sparklineLabels}]`"
            width="378" height="94">
          </canvas>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <ul class="list-group">
          <li class="list-group-header">
            Your Accounts
          </li>
          <li class="list-group-item" v-for="account in accounts">
            <img class="img-circle media-object pull-left" src="" width="32" height="32">
            <div class="media-body">
              <strong>{{ account }}</strong>
              <br>
              {{ getBalance(account) }} ETH
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import { mapGetters } from 'vuex'
  import drawChart from '@/assets/js/drawChart.js'

  const web3 = new Web3(new Web3.providers.HttpProvider())

  export default {
    name: 'home-page',
    data () {
      return {
        accounts: web3.eth.accounts
      }
    },
    computed: mapGetters([
      'bitcoin', 'ether', 'litecoin'
    ]),
    methods: {
      getBalance (address) {
        return web3.fromWei(web3.eth.getBalance(address).toString(10), 'ether')
      },
      isPositive (price) {
        return price > 0
      }
    },
    created () {
      this.$store.dispatch('getInitialPrices')
      this.$store.dispatch('getStats')
      this.$store.dispatch('getHistoricalRates')
      this.$store.dispatch('subscribeToFeed')
      setTimeout(() => {
        drawChart()
      }, 1000)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    height: 100%;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    padding: 60px 80px;
    width: 100%;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 100px;
  }
</style>
