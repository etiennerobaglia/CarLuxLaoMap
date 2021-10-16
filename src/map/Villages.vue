<template>
  <l-layer-group
    layer-type="overlay"
    name="Villages"
  >
  
  <l-feature-group
    v-for="(feature, index) in filteredVillages"
    :key="feature.properties.key"
    :ref="feature.properties.key"
    @click="$emit('village', feature); clickedVillage = index"
    @mouseover="overedVillage = index"
    @mouseout="overedVillage = -1"
  >
  
    <l-circle-marker
      :visible="displayVillagesDot"
      :lat-lng="[feature.properties.coordinates.lat, feature.properties.coordinates.lon]"
      
      :stroke="true"
      :weight='selectedVillage(index) ? 1.65*2.25 : 2.25'
      :opacity="1"
      :color="colorBorderCircle(feature.properties.projects)"
      
      :fill="true"
      :radius="selectedVillage(index) ? villageRadius*1.65 : villageRadius"
      :fillColor="colorInnerCircle(feature.properties.projects)"
      :fillOpacity="1"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(index)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
        }"
      >
        {{feature.properties['name-mou-english']}}
      </l-tooltip>
    </l-circle-marker>
    <l-circle-marker
      :visible="displayVillagesArea"
      :lat-lng="[feature.properties.coordinates.lat, feature.properties.coordinates.lon]"
      :stroke="false"
      :fillOpacity="1"
      :radius="selectedVillage(index) ? 4.15 : 3.25"
      :fillColor="'black'"
      :options="{interactive: false,}"
    />
    <l-polygon
      :visible="displayVillagesArea"
      :lat-lngs="feature.geometry.coordinates"
      :weight="selectedVillage(index) ? 1.65*2.25 : 2.25"
      :opacity="1"
      :fillOpacity="selectedVillage(index) ? 0.8 : 0.35"
      :color="colorBorderCircle(feature.properties.projects)"
      :fillColor="colorInnerCircle(feature.properties.projects)"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(index)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
          className: 'leaflet-tooltip-village-area',
        }"
      >
        {{feature.properties['name-mou-english']}}
      </l-tooltip>
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
    let featureGeoCoordLatlng = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 2, false)
    feature.geometry.coordinates = featureGeoCoordLatlng;
  });
  console.log(latLng);
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
      villageRadius: 5,
      overedVillage: -1,
      clickedVillage: -1,
      latLngVillagesArea,
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
          if (this.filters.villagesSelection == 'baseline')
            includedProject = feature.properties.baseline_strategy.distance_to_province_capital
          else includedProject = feature.properties.projects.join('').includes(this.filters.villagesSelection);
          
          let includedDistrict;
          if (this.filters.districtSelection == 'all') includedDistrict = true
          else includedDistrict = feature.properties.district.includes(this.filters.districtSelection)
          
          let includedActivity;
          if (this.filters.activitySelection == 'all' || this.filters.activitySelection == '') includedActivity = true
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

          const villageAvailability = includedProject && includedDistrict && includedActivity;

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
    selectedVillage(villageIndex) {
      if (villageIndex == this.overedVillage || villageIndex == this.clickedVillage) return true
      else return false
    },
    colorInnerCircle(project) {
      if (project.includes('SLS2')) return this.$LightRed;
      else return this.$LightBlack;
    },
    colorBorderCircle(project) {
      if (project.includes('DRR4')&& !project.includes('SLS2'))  return this.$LightRed
      else if (project.includes('DRR4')) return this.$LightBlack
      else return this.$White;
    },
  },
};
</script>

<style>

</style>
