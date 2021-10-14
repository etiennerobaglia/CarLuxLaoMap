<template>
  <section>
    <div v-if="false">
      <span v-if="true" >Filters: {{filters}}</span>
      <span v-if="false" > --- Zoom: {{zoom}}</span><br>
      <span v-if="false" > Bounds: {{bounds}}</span>
      <span v-if="false" > --- Coordinates: {{clickCoordinates}}</span>
      <span v-if="false" >  village: {{village}}</span>
    </div>
    <l-map
      class="map"
      style="height: 100vh; width: calc(100vw);"
      ref="map"
      
      :zoom="zoom"
      :minZoom="5"
      :maxZoom="17"
      @update:zoom="zoomUpdated"
      @click="clickMap"
      :center="center"

      :options="mapOptions"

        :bounds="bounds"
    >
      <!-- :max-bounds="maxBounds" -->
      <l-control-scale
        position="topleft"
        :imperial="false"
        :metric="true"
      />
      <l-control-layers
        position="topleft"
      />
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"/>
      <Villages
        @village="village => $emit('village', village)"
        :filters="filters"
        :zoom="zoom"
      />
      <LaoBasemap
        :zoom="zoom"
        :filters="filters"
      />
    </l-map>
  </section>
</template>

<script>
import {
  LMap, LTileLayer, LControlScale, LControlLayers,
} from 'vue2-leaflet';
// import L from 'leaflet';
import Villages from './Villages.vue';
import LaoBasemap from './LaoBasemap.vue';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LControlLayers,
    Villages,
    LaoBasemap,
  },
  data() {
    return {
      map: null,
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: false,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
        {
          name: 'ESRI Satellite',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution:
            '&copy; <a href="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer">ESRI</a>',
        },
        {
          url: '',
          attribution: '',
          name: 'Blank',
          visible: true,
        },
      ],
      mapOptions: {
        zoomControl: false,
      },
      zoom: 8,
      center: [18.280, 103.9],
      // bounds: [[], []],
      clickCoordinates: String,
    };
  },
  computed: {
    bounds(){
      if (this.filters.districtSelection == "Phaxay") return [[19.4795,102.8059], [19.1075,103.3951]]
      if (this.filters.districtSelection == "Kham") return [[20.036579887949696, 103.34976196289064], [19.483423604156762, 103.88259887695314]]
      if (this.filters.districtSelection == "Nonghet") return [[19.906218644480862, 103.60656738281251], [19.290405639497994, 104.2327880859375]]
      if (this.filters.districtSelection == "Houameang") return [[20.342051676448612, 103.43902587890626], [19.791256751409104, 104.16961669921875]]
      if (this.filters.districtSelection == "all") return [[20.24158281954221, 102.8759765625], [19.16592425362802, 104.19433593750001]]
      else return false
    },
    // clickCoordinates() {
    //   var clickCoordinates = 'test';
    //   if (this.map) {
    //     this.map.on('click', function(e){
    //       var coord = e.latlng;
    //       var lat = coord.lat;
    //       var lng = coord.lng;
    //       let coordinates =  lat + ", " + lng;
    //       console.log(coordinates);
    //       clickCoordinates = 'test';
    //     });
    //     return clickCoordinates;
    //   }
    //   else return 'false'
    // }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    clickMap(e) {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      let coordinates =  lat + ", " + lng;
      this.clickCoordinates = coordinates;
    }
    // fitArea() {
    //   // if (district == "Phaxai") 
    //   this.bounds = 
    // },
  },
  props: {
    filters: {
      required: true,
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
    })
  },
};
</script>

<style scoped>
#map {
  z-index: -1;
}
.leaflet-container {
    background: white;
    outline: 0;
}
</style>
