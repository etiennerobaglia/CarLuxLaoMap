<template>
  <div id="app-root">
    <!-- <div v-if="false" >{{village}}</div> -->
    <!-- <img class="logo" src="./assets/carluxlao_logo.png"> -->
    <div class="side-panel">
      <div class="side-panel-filters">
        <div class="side-panel-title">Filters</div>
        <Filters
          @filters="updatesFilters"
        />
      </div>
      <div 
        class="side-panel-info"
        v-if="village.properties ? village.properties : false"
      >
        <div class="side-panel-title">Village</div>
        <InfoPanel
          :village="village"
        />
      </div>
    </div>
    <Map 
      @village="updatesVillage"
      :filters="filters"
    />
    </div>
</template>

<script>
import Map from './map/Map.vue';
import InfoPanel from './info-panel/InfoPanel.vue';
import Filters from './filtering/Filters.vue';

export default {
  name: 'App',
  components: {
    Map,
    Filters,
    InfoPanel,
  },
  data() {
    return {
      filters: Object,
      village: Object,
    };
  },
  methods: {
    updatesFilters(emittedFilters) {
      this.filters = emittedFilters;
    },
    updatesVillage(emittedVillage) {
     this.village = emittedVillage;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}

#app-root {
  height: 100vh;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d3d3d;
}

.logo {
  position: absolute;
  overflow: hidden;
  width: 100px;
  bottom: -15px;
  left: 8px;
  z-index: 1000;
}

.side-panel {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width:25vw;
  max-width: 350px;
  max-height: calc(100vh - 16px);
  z-index: 1000;
  position: fixed;
  right: 8px;
}

.side-panel-content {
  border: 3px solid #D22F3D;
  border-radius: 1px;
  padding: 1rem 1.5rem;
  background: white;
  overflow: scroll;
}

.side-panel-title {
  background: #D22F3D;
  color: white;
  padding: .25rem .9rem;
  font-weight: 500;
  font-size: 1.1rem;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  display: inline-block
}

.side-panel-info {
  max-height: 100%;
  overflow: scroll;
}
.side-panel-info .side-panel-content  {
}

.side-panel-filters {
  margin-bottom: 8px;
}


</style>
