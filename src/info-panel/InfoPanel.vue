<template>
  <aside 
    class="side-panel-content info-panel"
  >
    <header class="panel-header">
      <h1 class="panel-name">
        {{village.properties['name-mou-english']}}<br>
        {{village.properties['name-lao']}}
      </h1>
      <div class="panel-header-info" >
        <div class="panel-projects">
          <span
            class="panel-project"
            v-for="project in village.properties.projects"
            :key="project"
          >
            {{project}}
          </span>
        </div>
        <span class="panel-side-info"> Alt: {{village.geometry.coordinates[2]}}m </span>
        <span class="panel-side-info"> {{village.properties.district}} District </span>
      </div>
    </header>
    <InfoVillageStats
      :villageStats="village.properties.data"
    />
    <InfoDetails
      v-if="
        village.properties.projects.includes('DRR4')
        && village.properties['drr4'].infrastructure.type"
      :title="'DRR4 Infrastuctures'"
      :details="village.properties['drr4'].infrastructure"
      :showDetails="false"
    />
    <InfoDetails
      v-if="village.properties.baseline_strategy.distance_to_province_capital"
      :title="'Baseline Strategy'"
      :details="village.properties.baseline_strategy"
      :showDetails="false"
    />
    <InfoDetails
      v-if="
        village.properties.projects.includes('SLS2') 
        && village.properties['sls2'].infrastructure.type"
      :title="'SLS2 Infrastuctures'"
      :details="village.properties['sls2'].infrastructure"
      :showDetails="false"
    />
    <InfoDetails
      v-if="
        village.properties.projects.includes('SLS2')
        && village.properties['sls2'].beneficiaries.weaving
      "
      :title="'SLS2 Beneficiaries'"
      :details="village.properties['sls2'].beneficiaries"
      :showDetails="false"
    />
  </aside>
</template>

<script>
import InfoDetails from './InfoDetails.vue';
import InfoVillageStats from './InfoVillageStats.vue';

export default {
  name: 'InfoPanel',
  components: {
    InfoVillageStats,
    InfoDetails
  },
  props: ['village'],
  data() {
    return{
      displayDDR4Infrastructures: false,
      displaySLS2Infrastructures: false,
      displaySLS2Beneficiaries: false,
    }
  },
};
</script>

<style>
  .info-panel {
  }
  .panel-header {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
  .panel-name {
  }
  .panel-header-info {
    font-size: .85rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .panel-projects {
    text-align: right;
  }
  .panel-project{
    font-weight: inherit;
    font-size: inherit;
  }
  .panel-project:not(:last-of-type)::after {
    content: "|"
  }
  .panel-side-info {
    font-weight: inherit;
    font-size: inherit;
    text-align: right;
  }
  .panel-description {
    font-size: .85rem;
    margin-block: 1.75rem;
  }
</style>
