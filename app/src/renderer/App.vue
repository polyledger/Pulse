<template>
  <div id="app">
    <div class="window">
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
  @import './assets/css/toolkit-inverse.min.css';

  #logo {
    height: 40px;
    width: 150px;
  }
</style>
