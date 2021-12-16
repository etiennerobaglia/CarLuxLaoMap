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
        <span class="panel-side-info"> Alt: {{village.properties.town.geometry.coordinates[2]}}m </span>
        <span class="panel-side-info"> {{village.properties.district}} District </span>
      </div>
    </header>
    <InfoVillageStats
      :villageStats="village.properties.mou"
    />
    <InfoDetails
      :key="name"
      v-for="(value, name) in village.properties.data"
      :title="name"
      :details="value"
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
  methods: {
    infrastructureName(longTypeName) {
      if (longTypeName.includes('Box Culvert')) return 'Box Culvert'
      if (longTypeName.includes('ridge')) return 'Bridge'
      if (longTypeName.includes('Wire construction')) return 'Irrigation System'
      if (longTypeName.includes('Road')) return 'Road'
    },
  }
};
</script>

<style>
  .info-panel {
  }
  .panel-header {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
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

</style>
