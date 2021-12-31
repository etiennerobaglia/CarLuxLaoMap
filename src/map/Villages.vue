<template>
  <l-layer-group
    layer-type="overlay"
    name="Villages"
    v-if="villages != null"
  >
  
    <l-feature-group
      v-for="village in filteredVillages"
      :key="village.properties.key"
      :ref="village.properties.key"
      @click="handleVillageClick(village)"
      @mouseover="overedVillage = village.properties.key"
      @mouseout="overedVillage = null"
    >
    
      <l-circle-marker
        :visible="displayVillagesDot"
        :lat-lng="[village.properties.town.geometry.coordinates[1], village.properties.town.geometry.coordinates[0]]"
        
        :stroke="true"
        :weight='selectedVillage(village.properties.key) ? zoom/3 : zoom/4.5'
        :opacity="1"
        :color="'white'"
        
        :fill="true"
        :radius="selectedVillage(village.properties.key) ? zoom : zoom/1.4"
        :fillColor="villageColor(village.properties.projects)"
        :fillOpacity="1"
      >
        <l-tooltip
          v-show="filters.displayVillageName || selectedVillage(village.properties.key)"
          :options="{
            permanent: true,
            direction: 'auto',
            interactive: true,
            className: toolTipclassName(village.properties.projects),
            offset: [14, 0]
          }"
        >
          {{village.properties['name-mou-english']}}
        </l-tooltip>
      </l-circle-marker>

      <l-circle-marker
        :visible="displayVillagesArea"
        :lat-lng="[village.properties.town.geometry.coordinates[1], village.properties.town.geometry.coordinates[0]]"
        :stroke="true"
        :weight="selectedVillage(village.properties.key) ? 2 : 1.25"
        :color="'white'"
        :opacity="1"
        :fillOpacity="1"
        :radius="selectedVillage(village.properties.key) ? 5 : 3.5"
        :fillColor="villageColor(village.properties.projects)"
        :options="{interactive: false,}"
      >
        <l-tooltip
          v-show="filters.displayVillageName || selectedVillage(village.properties.key)"
          :options="{
            permanent: true,
            direction: 'auto',
            interactive: true,
            className: toolTipclassName(village.properties.projects),
            offset: [14, 0]
          }"
        >
          {{village.properties['name-mou-english']}}
        </l-tooltip>
      </l-circle-marker>
      <l-polygon
        :visible="displayVillagesArea"
        :lat-lngs="village.geometry.coordinates"
        :weight="selectedVillage(village.properties.key) ? 5 : 3.5"
        :opacity="selectedVillage(village.properties.key) ? 1 : .875"
        :fillOpacity="selectedVillage(village.properties.key) ? .4 : .125"
        :color="villageColor(village.properties.projects)"
        :fillColor="villageColor(village.properties.projects)"
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
      overedVillage: null,
      clickedVillage: null,
      tooltipclassName: 'village-label',
    };
  },
  props: {
    villages: null,
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
      return this.villages.filter(
        (village) => {
          
          // Apply Village Filter
          let includedVillage;
          if (this.filters.villageSelection == null) includedVillage = true;
          else
           if (this.filters.villageSelection.includes(village.properties.key)) 
              includedVillage = true
          else includedVillage = false;
          
          // Apply Project Filter
          let includedProject;
          if (this.filters.projectSelection == 'all') includedProject = true;
          else includedProject = village.properties.projects.join('').includes(this.filters.projectSelection);
          
          // Apply District Filter
          let includedDistrict;
          if (this.filters.districtSelection == 'all') includedDistrict = true
          else includedDistrict = village.properties.district.includes(this.filters.districtSelection)
          
          // Apply Activity Filter
          let includedActivity;
          if (this.filters.activitySelection == 'all') includedActivity = true
          // ---- baseline
          else if 
            (this.filters.activitySelection == 'baseline'
              && !!village.properties.data
              && !!village.properties.data['baseline_strategy'])
            includedActivity = true
          // ---- any infra
          else if
            (this.filters.activitySelection == 'with_infra'
            && (village.properties.data &&
                (village.properties.data['SLS2_infrastructure']
                 || village.properties.data['DRR4_infrastructure']))
            )
            includedActivity = true
          // ---- bridge
          else if (this.infrastructureFilter(village, 'infra_bridge', 'ridge'))
            includedActivity = true
          // ---- box culvert
          else if (this.infrastructureFilter(village, 'infra_box_culvert', 'Box Culvert'))
            includedActivity = true
          // ---- wire construction
          else if (this.infrastructureFilter(village, 'infra_wire_constuction', 'Wire construction'))
            includedActivity = true
          // ---- road
          else if (this.infrastructureFilter(village, 'infra_road', 'Road'))
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
    handleVillageClick(village){
      if (this.clickedVillage != village.properties.key) {
        this.$emit('village', village)
        this.clickedVillage = village.properties.key
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
    infrastructureFilter(village, filterName, infraName) {
      return (this.filters.activitySelection == filterName
              && ( village.properties.data &&
                    ((  village.properties.data['SLS2_infrastructure'] 
                    && village.properties.data['SLS2_infrastructure'].type
                    && village.properties.data['SLS2_infrastructure'].type.includes(infraName))
                  || (  village.properties.data['DRR4_infrastructure']
                    && village.properties.data['DRR4_infrastructure'].type
                    && village.properties.data['DRR4_infrastructure'].type.includes(infraName))
              )))
    }
  },
};
</script>

<style>

</style>
