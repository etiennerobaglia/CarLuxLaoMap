<template>
<div>
<div v-show="true">{{populationGroups}}</div>
<div v-show="true">total: {{popTotal}}</div>
<br>
<div class="population-groups">
  <div 
    v-for="(popGroupValue, popGroupName, index) in populationGroups"
    :key="index"
    :style="{ width: groupWidth(popGroupValue)}"
    class="population-group"
  >
    <div
      class="population-group-box"
      v-if="popGroupValue"
      :class="{
        ['population-group-'+(index+1)]: true,
      }"
      @mouseover="currentToolTip = index"
    >
      {{currentToolTip}}
      {{popGroupName}}
      <!-- i: {{index}}
      isfirst: {{isFirstGroup(index)}}
      isLast: {{isLastGroup(index)}} -->
    </div>
    <span
      v-if="currentToolTip == index"
      class="population-group-tooltip"
    >
      {{popGroupValue}}
      {{groupWidth(popGroupValue)}}
    </span>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'InfoPopBar',
  props: ['populationGroups', 'popTotal'],
  data() {
    return {
      currentToolTip: false,
    }
  },
  methods: {
    groupWidth(commu){
      let width = (commu*100)/this.popTotal;
      return width + '%'
    },
    isLastGroup(index, value) {
      return (index === Object.keys(this.populationGroups).length - 1) && value? true : false;
    },
    isFirstGroup(index, value) {
      return (index == 0) && value ? true : false;
    }
  }
};
</script>

<style scoped>

  .population-groups {
    display: flex;
    border-radius: 3px;
    height: 2rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border-radius: 3px;
  }
  /* .population-group{
    width: 100% !important;} */
  .population-group-box{
    color: white;
    font-size: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
      text-transform: capitalize;
  }
  .population-group-first{
    border-bottom-left-radius: 3px;
  }
  .population-group-last{
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .population-group-1{
    background-color: red;
  }

  .population-group-2{
    background-color: blue;
  }

  .population-group-3{
    background-color: green;
  }

  .population-group-4{
    background-color: purple;
  }

  .population-group-5{
    background-color: black;
  }

</style>
