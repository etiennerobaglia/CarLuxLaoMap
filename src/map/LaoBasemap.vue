<template>
  <l-layer-group
    layer-type="overlay"
    name="Lao Administrative"
  >


    <l-marker
      v-for="feature in XhkHpnMainTowns.features"
      :visible="displayXhkHpnInfo"
      :key="feature.properties['name:en']"
      :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
      :options="{interactive: false}"
    >
      <l-icon>
        <div class="dot-marker">
          <svg class="svg-icon" viewBox="0 0 20 20">
              <path fill="black" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
          </svg>
          <div>{{feature.properties['name:en']}}</div>
      </div>
      </l-icon>
    </l-marker>

    <l-marker
      v-for="feature in XhkHpnVteCities.features"
      :key="feature.properties['name:en']"
      :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
      :options="{interactive: false}"
    >
      <l-icon>
        <div class="dot-marker">
          <svg class="svg-icon" viewBox="0 0 20 20">
              <path fill="black" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
          </svg>
          <div>{{feature.properties['name:en']}}</div>
      </div>
      </l-icon>
    </l-marker>
    
    <l-geo-json
      :name="'XhkHpnPrimaryRoads'"
      :geojson="XhkHpnPrimaryRoads"
      :visible="displayXhkHpnInfo"
      :options="{
        color: $mapStyleRoadsColor,
        weight: .7,
        interactive: false,
      }"
    />
    <l-geo-json
      :name="'XhkHpnSecondaryRoads'"
      :visible="displayXhkHpnInfo"
      :geojson="XhkHpnSecondaryRoads"
      :options="{
        color: $mapStyleRoadsColor,
        weight: .7,
        interactive: false,
      }"
    />
    <l-geo-json
      :name="'PhaxayLake'"
      :geojson="PhaxayLake"
      :visible="displayXhkHpnInfo"
      :options="{
        fillColor: $mapStyleWaterColor,
        opacity: 0,
        fillOpacity: 1,
      }"
    />
    <l-geo-json
      :name="'LaoPDRDistricts'"
      :geojson="LaoPDRDistricts"
      :options="{
        interactive: false,
        color: $mapStyleWhite,
        weight: 1,
        onEachFeature: (feature, layer) => onEachFeatureDistrict(feature, layer)
      }"
    />
    <l-geo-json
      :name="'XhkHpnRivers'"
      :visible="displayXhkHpnInfo"
      :geojson="XhkHpnRivers"
      :options="{
        color: $mapStyleWaterColor,
        weight: .7,
        interactive: false,
      }"
    />
  </l-layer-group>
</template>

<script>
import { 
  LLayerGroup,
  LGeoJson,
  LMarker,
  LIcon } from 'vue2-leaflet';
import L from 'leaflet';

import XhkHpnPrimaryRoads from '../assets/xhk_hpn-primary_roads';
import XhkHpnSecondaryRoads from '../assets/xhk_hpn-secondary_roads';
import PhaxayLake from '../assets/phaxay-lake';
import XhkHpnVteCities from '../assets/xhk_hpn_vte-cities';
import LaoPDRDistricts from '../assets/lao_pdr-districts';
import XhkHpnMainTowns from '../assets/xhk_hpn-main-towns';
import XhkHpnRivers from '../assets/xhk_hpn-rivers';

export default {
  name: 'LaoBasemap',
  components: {
    LLayerGroup,
    LGeoJson,
    LMarker,
    LIcon
  },
  props: {
    filters: Object,
    zoom: Number,
  },
  data() {
    return {
      XhkHpnPrimaryRoads,
      XhkHpnSecondaryRoads,
      LaoPDRDistricts,
      XhkHpnMainTowns,
      PhaxayLake,
      XhkHpnVteCities,
      XhkHpnRivers,
    };
  },
  computed: {
    setRadiusTowns() {
      return this.zoom/3.5
    },
    setRadiusCities() {
      if (this.zoom>7) return this.zoom/2.5
      else return 4
    },
    displayXhkHpnInfo(){
      if (this.zoom>8) return true
      else return false
    }
  },
  methods: {
    onEachFeatureDistrict(feature, layer) {
      if (this.$interventionDistricts.includes(feature.properties.ADM2_EN)) {
          layer.setStyle({
            fillColor: this.$mapStyleRed,
          })
          // .bindTooltip(
          //   feature.properties['ADM2_EN'],
          //   {
          //     permanent: true,
          //     direction: 'auto',
          //     className: 'tooltip-town'
          //   })
      }
      else if (feature.properties.ADM1_EN == 'Houaphan' 
          || feature.properties.ADM1_EN == 'Xiengkhouang') {
          layer
          .setStyle({
            fillColor: this.$mapStyleDarkGrey,
          })
          // .bindTooltip(
          //   feature.properties['ADM2_EN'],
          //   {
          //     permanent: true,
          //     direction: 'auto',
          //     className: 'tooltip-town'
          //   })
      }
      else {
        layer.setStyle({
          fillColor: this.$mapStyleLightGrey,
        })
      }
    },
    geojsonOptions(geojson) {
      switch (geojson.name) {
        case 'xhk_hpn-rivers':
          return {
            color: this.$mapStyleWaterColor,
            weight: .7,
            interactive: false,
          }
        case 'phaxay-lake':
          return {
            fillColor: this.$mapStyleWaterColor,
            opacity: 0,
            fillOpacity: 1,
          }
        case 'lao_pdr-districts':
          return {
            interactive: false,
            color: this.$mapStyleWhite,
            weight: 1,
            onEachFeature: (feature, layer) => {
              if (this.$interventionDistricts.includes(feature.properties.ADM2_EN)) {
                  layer.setStyle({
                    fillColor: this.$mapStyleRed,
                  }).bindTooltip(
                    feature.properties['ADM2_EN'],
                    {
                      permanent: true,
                      direction: 'auto',
                      className: 'tooltip-town'
                    })
              }
              else if (feature.properties.ADM1_EN == 'Houaphan' 
                  || feature.properties.ADM1_EN == 'Xiengkhouang') {
                  layer
                  .setStyle({
                    fillColor: this.$mapStyleDarkGrey,
                  })
                  .bindTooltip(
                    feature.properties['ADM2_EN'],
                    {
                      permanent: true,
                      direction: 'auto',
                      className: 'tooltip-town'
                    })
              }
              else {
                layer.setStyle({
                  fillColor: this.$mapStyleLightGrey,
                })
              }
            }
          }
        
        case 'xhk_hpn-primary_roads':
          return {
            color: this.$mapStyleRoadsColor,
            weight: .7,
            interactive: false,
          }
        case 'xhk_hpn-secondary_roads':
          return {
            color: this.$mapStyleRoadsColor,
            weight: .7,
            interactive: false,
          }
        case 'xhk_hpn-main-towns':
          return {
            pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
              opacity: 0,
              fillColor: this.$mapStyleBlack,
              fillOpacity: 1,
              radius: 4.5,
              weight: 1,
            })
            .bindTooltip(feature.properties['name:en'], {
              permanent: false,
              direction: 'auto',
              className: 'tooltip-town'
            })
          }
        case 'xhk_hpn_vte-cities':
          return {
            pointToLayer: (feature, latlng) => 
              L
              .circleMarker(latlng, {
                opacity: 0,
                fillColor: this.$mapStyleBlack,
                fillOpacity: 1,
                radius: 4,
                weight: 1,
              })
              .bindTooltip(feature.properties['name:en'], {
                permanent: true,
                direction: 'auto',
                className: 'tooltip-city'
              })
          }
        default:
          return;
      }
    },
  },
};
</script>

<style>

</style>
