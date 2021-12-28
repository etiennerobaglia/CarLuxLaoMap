<template>
  <nav class="side-panel-content filters">

    <FilterSelect
      v-if="villagesDB"
      :title="'Villages'"
      :name="'villageSelection'"
      :options="villagesKeyList"
      :defaultValue="'Select Village'"
      @villageSelection="selection => {
        filters.villageSelection = selection;
      }"
      :multiple='true'
      :label="'properties.key'"
    />
    <FilterSelect
      :title="'Projects'"
      :name="'projectSelection'"
      :defaultValue="'Select Project'"
      :options="[
        { value: 'all', name: 'All Villages'},
        { value: 'SLS2', name: 'SLS2'},
        { value: 'DRR4', name: 'DRR4'},
      ]"
      @projectSelection="selection => {
        filters.projectSelection = selection;
      }"
    />
    <FilterSelect
      :title="'Districts'"
      :name="'districtSelection'"
      :defaultValue="'Select District'"
      :options="[
        { value: 'all', name: 'All Districts'},
        { value: 'Phaxay', name: 'Phaxay'},
        { value: 'Kham', name: 'Kham'},
        { value: 'Houameang', name: 'Huameuang'},
        { value: 'Nonghet', name: 'Nonghed'}
      ]"
      @districtSelection="selection => {
        filters.districtSelection = selection;
      }"
    />
    <FilterSelect
      :title="'Activities'"
      :name="'activitySelection'"
      :defaultValue="'Select Activity'"
      :options="[
        { value: 'all', name: 'All Villages'},
        { value: 'baseline', name: 'Baseline Strategy'},
        { value: 'with_infra', name: 'Infra. All'},
        { value: 'infra_bridge', name: 'Infra. Bridge'},
        { value: 'infra_box_culvert', name: 'Infra. Box Culvert'},
        { value: 'infra_wire_constuction', name: 'Infra. Irrigation'},
        { value: 'infra_road', name: 'Infra. Road'},

      ]"
      @activitySelection="selection => {
        filters.activitySelection = selection;
      }"
    />
    <Toggle
      :title="'Names'"
      :name="'displayVillageName'"
      :defaultValue="false"
      @displayVillageName="status => {
        filters.displayVillageName = status;
      }"
    />
    <Toggle
      :title="'Areas'"
      :name="'displayVillageArea'"
      :defaultValue="false"
      @displayVillageArea="status => {
        filters.displayVillageArea = status;
      }"
    />
  </nav>
</template>

<script>
import Toggle from './Toggle.vue';
import FilterSelect from './FilterSelect.vue';

export default {
  name: 'Filters',
  components: {
    Toggle,
    FilterSelect
  },
  data() {
    return {
      filters: {
        villageSelection: String,
        districtSelection: String,
        activitySelection: String,
        projectSelection: String,
        displayVillageName: Boolean,
        displayVillageArea: Boolean,
      },
    };
  },
  props: {
    villagesDB: null,
  },
  computed: {
    villagesKeyList() {
      let keys = [];
      this.villagesDB.forEach(village => {
        keys.push(village.properties.key)
      });
      return keys;
    }
  },
  created() {
    this.$emit('filters', this.filters);
  },
  updated() {
    this.$emit('filters', this.filters);
  },
};
</script>

<style>
.filters {
  padding-top: .75rem;
  padding-bottom: .75rem;
}
.filters-title {
  margin-bottom: .85rem;
}
.filter-label{
  font-size: .95rem;
  font-weight: 600;
}
</style>
