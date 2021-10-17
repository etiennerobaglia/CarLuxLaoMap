<template>
  <nav class="side-panel-content filters">
    <FilterSelect
      :title="'Projects'"
      :name="'villagesSelection'"
      :defaultValue="'Select Project'"
      :options="[
        { value: 'all', name: 'All Vilages'},
        { value: 'SLS2', name: 'SLS2'},
        { value: 'DRR4', name: 'DRR4'},
        { value: 'baseline', name: 'Baseline Strategy'}
      ]"
      @villagesSelection="selection => {
        filters.villagesSelection = selection;
      }"
    />
    <FilterSelect
      :title="'Districts'"
      :name="'districtSelection'"
      :defaultValue="'Select District'"
      :options="[
        { value: 'all', name: 'All Districts'},
        { value: 'Phaxay', name: 'Phaxai'},
        { value: 'Kham', name: 'Kham'},
        { value: 'Houameang', name: 'Huamuang'},
        { value: 'Nonghet', name: 'Nonghet'}
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
        { value: 'with_infra', name: 'With Infrastructure'},
        { value: 'without_infra', name: 'Without Infrastructure'},
      ]"
      @activitySelection="selection => {
        filters.activitySelection = selection;
      }"
    />
    <Toggle
      :title="'Village Names'"
      :name="'displayVillageName'"
      :defaultValue="false"
      @displayVillageName="status => {
        filters.displayVillageName = status;
      }"
    />
    <Toggle
      :title="'Village Area'"
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
        villagesSelection: String,
        districtSelection: String,
        activitySelection: String,
        displayVillageName: Boolean,
        displayVillageArea: Boolean,
      },
    };
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
