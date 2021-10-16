<template>
  <div class="dropdown-container">
    <div class="select-container">
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
    <span class="select-reset" @click="selected=''">
      <svg class="svg-icon" viewBox="0 0 20 20">
        <path fill="black" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
      </svg>
    </span>
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
.select-container {
  display: flex;
  align-items: baseline;
  margin-bottom: .65rem;
  justify-content: space-between;
  width: 100%;
}

.dropdown {
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid #7d7d7d;
  padding-left: .2rem;
  margin-right: .65rem;
  border: 1px solid #7d7d7d;
  border-radius: 2px;
  width: 55%;
  height: 2.25rem;
  cursor: pointer;
}

.dropdown-container {
  display: flex;
  align-items: baseline;
}
.select-reset {
  cursor: pointer;
  height: 12px;
  width: 12px;
}
.select-reset:hover {

}
</style>
