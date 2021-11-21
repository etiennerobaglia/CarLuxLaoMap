<template>
  <l-layer-group
    layer-type="overlay"
    name="Villages"
  >
  
  <l-feature-group
    v-for="feature in filteredVillages"
    :key="feature.properties.key"
    :ref="feature.properties.key"
    @click="handleVillageClick(feature)"
    @mouseover="overedVillage = feature.properties.key"
    @mouseout="overedVillage = null"
  >
  
    <l-circle-marker
      :visible="displayVillagesDot"
      :lat-lng="[feature.properties.town.geometry.coordinates[1], feature.properties.town.geometry.coordinates[0]]"
      
      :stroke="true"
      :weight='selectedVillage(feature.properties.key) ? zoom/3 : zoom/4.5'
      :opacity="1"
      :color="'white'"
      
      :fill="true"
      :radius="selectedVillage(feature.properties.key) ? zoom : zoom/1.4"
      :fillColor="villageColor(feature.properties.projects)"
      :fillOpacity="1"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(feature.properties.key)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
          className: toolTipclassName(feature.properties.projects),
          offset: [14, 0]
        }"
      >
        {{feature.properties['name-mou-english']}}
      </l-tooltip>
    </l-circle-marker>

    <l-circle-marker
      :visible="displayVillagesArea"
      :lat-lng="[feature.properties.town.geometry.coordinates[1], feature.properties.town.geometry.coordinates[0]]"
      :stroke="true"
      :weight="selectedVillage(feature.properties.key) ? 2 : 1.25"
      :color="'white'"
      :opacity="1"
      :fillOpacity="1"
      :radius="selectedVillage(feature.properties.key) ? 5 : 3.5"
      :fillColor="villageColor(feature.properties.projects)"
      :options="{interactive: false,}"
    >
      <l-tooltip
        v-show="filters.displayVillageName || selectedVillage(feature.properties.key)"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
          className: toolTipclassName(feature.properties.projects),
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
      :color="villageColor(feature.properties.projects)"
      :fillColor="villageColor(feature.properties.projects)"
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
      overedVillage: null,
      clickedVillage: null,
      latLngVillagesArea,
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
          
          let includedVillage;
          if (this.filters.villageSelection == null) includedVillage = true;
          else
           if (this.filters.villageSelection.includes(feature.properties.key)) 
              includedVillage = true
          else includedVillage = false;
          
          let includedProject;
          if (this.filters.projectSelection == 'all') includedProject = true;
          else includedProject = feature.properties.projects.join('').includes(this.filters.projectSelection);
          
          let includedDistrict;
          if (this.filters.districtSelection == 'all') includedDistrict = true
          else includedDistrict = feature.properties.district.includes(this.filters.districtSelection)
          
          let includedActivity;
          if (this.filters.activitySelection == 'all') includedActivity = true
          else if 
            (this.filters.activitySelection == 'baseline'
              && !!feature.properties['baseline_strategy'].population.total) 
            includedActivity = true
          else if
            (this.filters.activitySelection == 'with_infra'
              && (feature.properties['sls2'].infrastructure.type
              || feature.properties['drr4'].infrastructure.type)
            )
            includedActivity = true
          else if
            (
              this.filters.activitySelection == 'infra_bridge'
              && (
               (feature.properties['sls2'].infrastructure.type && feature.properties['sls2'].infrastructure.type.includes('ridge'))
               || 
               (feature.properties['drr4'].infrastructure.type && feature.properties['drr4'].infrastructure.type.includes('ridge'))
              )
            )
            includedActivity = true
          else if
            (
              this.filters.activitySelection == 'infra_box_culvert'
              && (
               (feature.properties['sls2'].infrastructure.type && feature.properties['sls2'].infrastructure.type.includes('Box Culvert'))
               || 
               (feature.properties['drr4'].infrastructure.type && feature.properties['drr4'].infrastructure.type.includes('Box Culvert'))
              )
            )
            includedActivity = true
          else if
            (
              this.filters.activitySelection == 'infra_wire_constuction'
              && (
               (feature.properties['sls2'].infrastructure.type && feature.properties['sls2'].infrastructure.type.includes('Wire construction'))
               || 
               (feature.properties['drr4'].infrastructure.type && feature.properties['drr4'].infrastructure.type.includes('Wire construction'))
              )
            )
            includedActivity = true
          else if
            (
              this.filters.activitySelection == 'infra_road'
              && (
               (feature.properties['sls2'].infrastructure.type && feature.properties['sls2'].infrastructure.type.includes('Road'))
               || 
               (feature.properties['drr4'].infrastructure.type && feature.properties['drr4'].infrastructure.type.includes('Road'))
              )
            )
            includedActivity = true
          else includedActivity = false

          let villageAvailability = includedVillage && includedProject && includedDistrict && includedActivity;

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
    handleVillageClick(feature){
      if (this.clickedVillage != feature.properties.key) {
        this.$emit('village', feature)
        this.clickedVillage = feature.properties.key
      }
      else {
        this.$emit('village', {});
        this.clickedVillage = null
      }
    },
    selectedVillage(key) {
      if (key == this.overedVillage || key == this.clickedVillage) return true
      else return false
    },
    villageColor(project) {
      // DRR only
      if (project.includes('DRR4')&& !project.includes('SLS2')) return '#1f752f'
      // DRR & SLS
      else if (project.includes('DRR4')) return '#824908'
      // SLS only
      else return '#3e128a';
    },
    toolTipclassName(project) {
      // DRR only
      if (project.includes('DRR4')&& !project.includes('SLS2')) return 'village-label-drr'
      // DRR & SLSê
      else if (project.includes('DRR4')) return 'village-label-drr-sls'
      // SLS only
      else return 'village-label-sls';
    },
  },
};
</script>

<style>

</style>
