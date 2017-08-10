<template>
  <div>
    <div class="title">Node Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Web3:</div>
        <div class="value">{{ web3ApiVersion }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ nodeVersion }}</div>
      </div>
      <div class="item">
        <div class="name">Network:</div>
        <div class="value">{{ networkVersion }}</div>
      </div>
      <div class="item">
        <div class="name">Connected:</div>
        <div class="value">{{ isConnected }}</div>
      </div>
      <div class="item">
        <div class="name">Peer Count:</div>
        <div class="value">{{ peerCount }}</div>
      </div>
      <div class="item">
        <div class="name">Syncing:</div>
        <div class="value">{{ isSyncing }}</div>
      </div>
      <div class="item">
        <div class="name">Mining:</div>
        <div class="value">{{ isMining }}</div>
      </div>
      <div class="item">
        <div class="name">Hash Rate:</div>
        <div class="value">{{ hashrate }}</div>
      </div>
      <div class="item">
        <div class="name">Gas Price (Wei):</div>
        <div class="value">{{ gasPrice }}</div>
      </div>
      <div class="item">
        <div class="name">Current block number:</div>
        <div class="value">{{ currentBlockNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Web3 from 'web3'
  const web3 = new Web3(new Web3.providers.HttpProvider())

  export default {
    data () {
      return {
        web3ApiVersion: web3.version.api,
        nodeVersion: web3.version.node,
        networkVersion: web3.version.network,
        isConnected: web3.isConnected(),
        peerCount: web3.net.peerCount,
        isSyncing: web3.eth.syncing,
        isMining: web3.eth.mining,
        hashrate: web3.eth.hashrate,
        gasPrice: web3.eth.gasPrice.toString(10),
        currentBlockNumber: web3.eth.blockNumber
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
