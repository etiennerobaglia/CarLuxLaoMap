<template>
  <div class="dropdown-container">
    <label class="filter-label">{{title}}:</label>
    <select
      class="dropdown"
      :name="'name'"
      v-model="selected">
      <option disabled value="">{{ defaultValue }}</option>
      <option
        v-for="option in options"
        :key="option.name"
        :value="option.value">
          {{option.name}}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'FilterSelect',
  data() {
    return {
      selected: '',
    };
  },
  props: {
    options: Array,
    defaultValue: String,
    name: String,
    title: String,
  },
  created() {
    this.$emit(this.name, this.selected);
  },
  updated() {
    this.$emit(this.name, this.selected);
  },
};
</script>

<style scoped>
.dropdown-container {
  display: flex;
  align-items: baseline;
  margin-bottom: .65rem;
  justify-content: space-between;
}

.dropdown {
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid #7d7d7d;
  padding-left: .2rem;
  margin-right: 1.25rem;
  /* margin-bottom: .75rem; */
  border: 1px solid #7d7d7d;
  border-radius: 2px;
  /* box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1); */
  width: 55%;
  height: 2.25rem;
  cursor: pointer;
}
</style>
