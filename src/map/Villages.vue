<template>
  <l-layer-group
    layer-type="overlay"
    name="Villages"
  >
    <l-circle-marker
      v-for="(feature, index) in filteredVillages"
      :visible="displayVillages"
      :key="feature.properties.key"
      :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
      
      :stroke="true"
      :weight='(index == overedVillage || index == clickedVillage) ? 1.65*2.25 : 2.25 '
      :opacity="1"
      :color="displayBorderCircle(feature.properties.projects)"
      
      :fill="true"
      :radius="(index == overedVillage || index == clickedVillage) ? villageRadius*1.65 : villageRadius"
      :fillColor="displayInnerCircle(feature.properties.projects)"
      :fillOpacity="1"
      
      @click="$emit('village', feature); clickedVillage = index"
      @mouseover="overedVillage = index"
      @mouseout="overedVillage = -1"
    >
      <!-- :color="villageColor(feature.properties.projects)"
      :fillColor="villageColor(feature.properties.projects)" -->
      <l-tooltip
        v-show="filters.displayVillageName"
        :options="{
          permanent: true,
          direction: 'auto',
          interactive: true,
        }"
      >
          <!-- className: toolTipclassName(feature.properties.projects) -->
      {{feature.properties['name-mou-english']}}
      </l-tooltip>
    </l-circle-marker>

    <l-geo-json
      :geojson="villagesArea"
    />


  </l-layer-group>
</template>

<script>
import { LLayerGroup, LCircleMarker, LTooltip, LGeoJson } from 'vue2-leaflet';

import villages from '../assets/villages-marker';
import villagesArea from '../assets/villages-area-census-2015';


export default {
  name: 'Villages',
  components: {
    LLayerGroup,
    LCircleMarker,
    LTooltip,
    LGeoJson
  },
  data() {
    return {
      tooltipOptions: {
        permanent: true,
        direction: 'auto',
      },
      villages: villages,
      villageRadius: 5,
      overedVillage: -1,
      clickedVillage: -1,
      villagesArea
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
        };
      },
    },
    zoom: Number,
  },
  computed: {
    filteredVillages() {
      return this.villages.features.filter(
        (feature) => {

          const includedProject = feature.properties.projects.join('').includes(this.filters.villagesSelection);
          
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
    // filteredVillages() {
    //   return this.villages.features.filter(
    //     (feature) => {
    //       const includedProject = feature.properties.projects.join('').includes(this.filters.villagesSelection);
    //       let includedDistrict;
    //       if (this.filters.districtSelection == 'all') includedDistrict = true
    //       else includedDistrict = feature.properties.district.includes(this.filters.districtSelection)
    //       const villageAvailability = includedProject && includedDistrict;
    //       return villageAvailability
    //     }
    //   );
    // },
    displayVillages(){
      if (this.zoom>7) return true
      else return false
    },
    hoverRadius() {
      return 10
    },
    setRadius() {
      if (this.zoom>7) return (this.zoom/1.9)
      else return 2.75
    },
  },
  methods: {
    increaseRadius(){
      this.villageRadius = this.villageRadius*3;
    },
    villageColor(project) {
      if (project.includes('SLS2') && project.includes('DRR4')) return this.$mapStyleDRRSLSVillageColor;
      else if (project.includes('SLS2')) return this.$mapStyleSLSVillageColor;
      else if (project.includes('DRR4')) return this.$mapStyleDRRVillageColor;
      else return '#000'
    },
    displayInnerCircle(project) {
      if (project.includes('SLS2')) return this.$LightRed;
      else return this.$LightBlack;
    },
    displayBorderCircle(project) {
      if (project.includes('DRR4')&& !project.includes('SLS2'))  return this.$LightRed
      else if (project.includes('DRR4')) return this.$LightBlack
      else return this.$White;
    },
    toolTipclassName(project) {
      if (project.includes('SLS2') && project.includes('DRR4')) {
        return 'village-label-drr-sls';}
      else if (project.includes('SLS2')) {
        return 'village-label-sls';
      } 
      else if (project.includes('DRR4')) {
        return 'village-label-drr';
      }
      else return '#000'
    },
  },
};
</script>

<style>

</style>
