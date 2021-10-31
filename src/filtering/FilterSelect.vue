<template>
  <div 
  class="dropdown-container"
  :class="{ 'dropdown-container-active': selected != 'all' || value != null }"
  >
    <div 
      class="select-container"
    >
      <label class="filter-label">{{title}}</label>
      <multiselect 
        v-model="value"
        v-if="multiple"
        :options="options"
        
        :searchable="true"
        :close-on-select="false"
        :show-labels="false"
        placeholder="Search Village"
        :max-height="200"
        :custom-label="customLabel"
        :multiple="true"
      >
        <!-- value="name"
        label="name" -->
            <template 
              slot="selection" 
              slot-scope="{ values, search, isOpen }">
              <div
                style="display: flex;
                  justify-content: space-between"
                v-if="!isOpen"
              > 
                <span 
                  class="multiselect__single"
                  style="

                  "
                  v-if="!values.length && !isOpen">
                    All Villages
                </span>
                <div
                v-else-if="values.length && !isOpen"
                class="multiselect__single"
                style="color: #D22F3D;
                  font-weight: 500;"
                >{{ values.length }} village<span v-if="values.length > 1">s</span> selected</div>
                <div class="search-icon">
                  <svg 
                    style="padding: 2px 1px 0" 
                    height="15px" viewBox="0 0 20 20">
                    <path d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
                      c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
                      c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
                      s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path>
                  </svg>
                </div>
              </div>
              <span v-else></span>

            </template>
      </multiselect>
      <select
        v-else
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
    <span
      class="select-reset" 
      @click="
        selected='all';
        value=null"
    >
      <svg class="select-reset-icon" viewBox="0 0 20 20">
        <path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
      </svg>
    </span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'FilterSelect',
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      // selected: String,
      selected: 'all',
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    options: Array,
    defaultValue: String,
    name: String,
    title: String,
    label: String,
  },
  methods: {
    customLabel(element) {
      if (element == 'all') return 'All Villages'
      else return element.split('_').reverse().join(' ')
    }
  },
  created() {
    if (this.multiple) this.$emit(this.name, this.value);
    else this.$emit(this.name, this.selected);
  },
  updated() {
    if (this.multiple) this.$emit(this.name, this.value);
    else this.$emit(this.name, this.selected);
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.select-container {
  display: flex;
  align-items: center;
  margin-bottom: .65rem;
  justify-content: space-between;
  width: 100%;
}

.dropdown {
  margin-left: 1rem;
  padding-left: .2rem;
  margin-right: .65rem;
  border: 1px solid #7d7d7d;
  color: rgb(50, 50, 50);
  border-radius: 2px;
  width: 55%;
  height: 1.75rem;
  cursor: pointer;
  background: transparent
}

.dropdown-container-active .dropdown {
  border: 1px solid #D22F3D;
  color: #D22F3D;
  font-weight: 500;
}

.dropdown-container-active .filter-label{
  color: #D22F3D
}

.dropdown-container-active .select-reset-icon {
  display: block;
}

.dropdown-container-active .select-reset  {
  cursor: pointer;
}

.dropdown-container {
  display: flex;
  align-items: baseline;
}
.select-reset {
  height: 14px;
  width: 14px;
}

.select-reset-icon {
  display: none;
}
.select-reset-icon path {
  fill: #D22F3D
}

.select-reset-icon:hover path {
  fill: black
}


/* --- MULTISELECT */
.multiselect {
  min-height: 0;
  margin-left: 1rem;
  margin-right: .65rem;
  width: 55%
}

.multiselect__select {
  height: 32px;
  width: 22px;
  display: none;
}
.multiselect__select::before {
  color: rgb(68, 68, 68);
  border-color: rgb(68, 68, 68) transparent transparent
}

.multiselect__option {
  line-height: 1;
  padding: 4px;
  min-height: 0;
}
.multiselect__option::after {
  line-height: 1;
}
.multiselect__element {
  font-size: .8rem;
}

.multiselect__input {
  font-size: .8rem;
  min-height: 0;
  line-height: 1;
  margin: 2px 0;
}
.multiselect__single {
  font-size: .85rem;
  min-height: 0;
  line-height: 1;
  margin: 0;
  padding: 3px 3px;

}
.multiselect__tags {
  padding: 4px 4px 2px 4px;
  min-height: 0;
  font-size: 0;
  height: 1.75rem;
  border: 1px solid #7d7d7d;
  color: rgb(50, 50, 50);
  border-radius: 2px;
}

.dropdown-container-active  .multiselect__tags {
  border: 1px solid #D22F3D;
}
.dropdown-container-active .search-icon {
  fill: #D22F3D
}

.multiselect__tag {
  padding: 5px 18px 4px 5px;
  font-size: .8rem;
  margin: 0 4px 2px 0px;
  background: rgb(246, 246, 246);
  color: #D22F3D;
  /* border: 1px solid lightgrey */
}
.multiselect__tag-icon::after {
  color: darkgrey;
}

.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
  background: rgb(114, 114, 114);
  color: #D22F3D;
}

.multiselect__option {
  color: inherit
}
.multiselect__option--highlight {
  color: inherit;
  background:whitesmoke;
}

.multiselect__option--selected {
  background:transparent;
  color: #D22F3D;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: transparent;
  color: inherit
}

</style>
