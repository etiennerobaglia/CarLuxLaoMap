<template>
<div 
  class="checkbox"
  :class="{ 'checkbox-active': toggleValue }"
>
  <label :for="title" class="filter-label">
    {{title}}
  </label>
  <input 
    class="toggle"
    type="checkbox"
    name="village-name"
    v-model="toggleValue" />
</div>


</template>

<script>
export default {
  name: 'Toggle',
  data() {
    return {
      toggleValue: this.defaultValue,
    }
  },
  props: {
    name: String,
    title: String,
    defaultValue: Boolean,
  },
  created() {
    this.$emit(this.name, this.toggleValue);
  },
  updated() {
    this.$emit(this.name, this.toggleValue);
  },
};
</script>

<style scoped>

.checkbox-active .filter-label {
  color: #D22F3D;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox:not(:last-of-type) {
  margin-bottom: .75rem;
}
.checkbox input {
  margin-right: 4.5rem;
}
.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 40px;
  height: 20px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #7d7d7d;
  transition: background-color ease 0.2s;
}

.toggle:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 2;
  width: 16px;
  height: 16px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  color: #fff;
  text-shadow: -1px -1px rgba(0,0,0,0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  transition: all ease 0.2s;
}

.toggle:checked {
  background-color: #D22F3D;
}

.toggle:checked:before {
  left: 21px;
}
</style>
