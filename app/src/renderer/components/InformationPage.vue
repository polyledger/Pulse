<template>
  <div class="container" id="wrapper">
    <div class="row">
      <img id="logo" src="~@/assets/img/logo-2.png" alt="Polyledger">
    </div>
    <div class="row">
      <div class="col-md-6">
        <system-information></system-information>
      </div>
      <div class="col-md-6">
        <node-information></node-information>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './InformationPage/SystemInformation'
  import NodeInformation from './InformationPage/NodeInformation'

  export default {
    name: 'information-page',
    components: { NodeInformation, SystemInformation }
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
    height: 100%;
    width: 100%;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 100px;
  }
</style>
