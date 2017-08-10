<template>
  <div id="app">
    <div class="window">
      <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
          <div class="btn-group">
            <router-link class="btn btn-default" tag="button" to="/home" active-class="active">
              <span class="icon icon-home"></span>
            </router-link>
            <router-link class="btn btn-default" tag="button" to="/information" active-class="active">
              <span class="icon icon-info-with-circle"></span>
            </router-link>
          </div>
       </div>
      </header>
      <div class="window-content">
        <div class="pane-group">
          <div class="pane">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import '../../node_modules/photonkit/dist/css/photon.css';
  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import './assets/css/toolkit-light.min.css';
</style>
