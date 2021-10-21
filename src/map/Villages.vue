<template>
  <l-layer-group
    layer-type="overlay"
    name="Villages"
  >
  
  <l-feature-group
    v-for="feature in filteredVillages"
    :key="feature.properties.key"
    :ref="feature.properties.key"
    @click="
      $emit('village', feature);
      clickedVillage = feature.properties.key"
    @mouseover="overedVillage = feature.properties.key"
    @mouseout="overedVillage = null"
  >
  
    <l-circle-marker
      :visible="displayVillagesDot"
      :lat-lng="[feature.properties.coordinates.lat, feature.properties.coordinates.lon]"
      
      :stroke="true"
      :weight='selectedVillage(feature.properties.key) ? zoom/3 : zoom/4.5'
      :opacity="1"
      :color="'white'"
      
      :fill="true"
      :radius="selectedVillage(feature.properties.key) ? zoom : zoom/1.4"
      :fillColor="villageColor"
      :fillOpacity="1"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(feature.properties.key)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
          className: tooltipclassName,
          offset: [14, 0]
        }"
      >
        {{feature.properties['name-mou-english']}}
      </l-tooltip>
    </l-circle-marker>

    <l-circle-marker
      :visible="displayVillagesArea"
      :lat-lng="[feature.properties.coordinates.lat, feature.properties.coordinates.lon]"
      :stroke="true"
      :weight="selectedVillage(feature.properties.key) ? 1.75 : 1.25"
      :color="'white'"
      :opacity="1"
      :fillOpacity="1"
      :radius="selectedVillage(feature.properties.key) ? 4.5 : 3.5"
      :fillColor="villageColor"
      :options="{interactive: false,}"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(feature.properties.key)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
          className: tooltipclassName,
          offset: [14, 0]
        }"
      >
        {{feature.properties['name-mou-english']}}
      </l-tooltip>
    </l-circle-marker>
    <l-polygon
      :visible="displayVillagesArea"
      :lat-lngs="feature.geometry.coordinates"
      :weight="selectedVillage(feature.properties.key) ? 5 : 3.5"
      :opacity="selectedVillage(feature.properties.key) ? 1 : .875"
      :fillOpacity="selectedVillage(feature.properties.key) ? .4 : .125"
      :color="villageColor"
      :fillColor="villageColor"
      :smoothFactor="1.75"
      pane="shadowPane"
    >
    </l-polygon>

  </l-feature-group>
  </l-layer-group>
</template>

<script>
import { 
  LLayerGroup,
  LTooltip,
  LCircleMarker,
  LFeatureGroup,
  LPolygon,
  } from 'vue2-leaflet';
import L from 'leaflet';


import villageAreaAndDotData from '../assets/village-area-dot-data';

function geojsonToLatLng(geojson) {
  let latLng = geojson;
  geojson.features.forEach(feature => {
    let featureGeoCoordLatlng = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 1, false)
    feature.geometry.coordinates = featureGeoCoordLatlng;
  });
  return latLng;

}

let latLngVillagesArea = geojsonToLatLng(villageAreaAndDotData);


export default {
  name: 'Villages',
  components: {
    LLayerGroup,
    LCircleMarker,
    LTooltip,
    LFeatureGroup,
    LPolygon,
  },
  data() {
    return {
      tooltipOptions: {
        permanent: true,
        direction: 'auto',
      },
      villages: villageAreaAndDotData,
      overedVillage: -1,
      clickedVillage: -1,
      latLngVillagesArea,
      villageColor: '#6b3c06',
      tooltipclassName: 'village-label',
    };
  },
  props: {
    filters: {
      type: Object,
      required: true,
      default() {
        return {
          villagesSelection: 'sls',
          displayVillageName: true,
          displayVillageArea: Boolean,
        };
      },
    },
    zoom: Number,
  },
  computed: {
    filteredVillages() {
      return this.villages.features.filter(
        (feature) => {

          let includedProject;
          if (this.filters.villagesSelection == 'all') includedProject = true;
          else if (this.filters.villagesSelection == 'baseline')
            includedProject = feature.properties.baseline_strategy.distance_to_province_capital
          else includedProject = feature.properties.projects.join('').includes(this.filters.villagesSelection);
          
          let includedDistrict;
          if (this.filters.districtSelection == 'all') includedDistrict = true
          else includedDistrict = feature.properties.district.includes(this.filters.districtSelection)
          
          let includedActivity;
          if (this.filters.activitySelection == 'all') includedActivity = true
          else if
            (this.filters.activitySelection == 'with_infra'
              && (feature.properties['sls2'].infrastructure.type
              || feature.properties['drr4'].infrastructure.type)
            )
            includedActivity = true
          else if
            (
              this.filters.activitySelection == 'without_infra'
              && !(feature.properties['sls2'].infrastructure.type
              || feature.properties['drr4'].infrastructure.type)
            )
            includedActivity = true
          else includedActivity = false

          let villageAvailability = includedProject && includedDistrict && includedActivity;

          return villageAvailability
        }
      );
    },
    displayVillagesDot(){
      if (this.zoom>7 && !this.filters.displayVillageArea) return true
      else return false
    },
    displayVillagesArea(){
      if (this.zoom>7 && this.filters.displayVillageArea) return true
      else return false
    },
  },
  methods: {
    selectedVillage(key) {
      if (key == this.overedVillage || key == this.clickedVillage) return true
      else return false
    },
  },
};
</script>

<style>

</style>
