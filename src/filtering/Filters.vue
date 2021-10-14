<template>
<!-- <div class="filters-container"> -->
  <!-- <h2 class="filters-title">Filters</h2> -->
  <nav class="side-panel-content filters">
    <FilterSelect
      :title="'Projects'"
      :name="'villagesSelection'"
      :defaultValue="'Select Project'"
      :options="[
        { value: 'SLS2', name: 'SLS2'},
        { value: 'DRR4', name: 'DRR4'},
        { value: '', name: 'SLS2&DRR4'},
        { value: '', name: 'Baseline Strategy'}
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
    <VillageNameToggle
      @displayVillageName="status => {
        filters.displayVillageName = status;
      }"
    />
  </nav>
<!-- </div> -->
</template>

<script>
import VillageNameToggle from './VillageNameToggle.vue';
import FilterSelect from './FilterSelect.vue';

export default {
  name: 'Filters',
  components: {
    VillageNameToggle,
    FilterSelect
  },
  data() {
    return {
      filters: {
        villagesSelection: String,
        districtSelection: String,
        activitySelection: String,
        displayVillageName: Boolean,
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
