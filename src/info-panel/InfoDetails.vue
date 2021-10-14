<template>
  <section class="details">
    <header 
      class="details-header"
      @click="showDetails = !showDetails"
    >
      <h3 class="details-title">
        {{title}}
      </h3>
      <svg
        :class="{ active: showDetails }"
        class="arrow"
        viewBox="0 0 24 24"
      >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
    </header>
    <div
      v-show="showDetails"
      class="details-content"
    >
      <div
        v-for="(value, name, index) in details"
        :key="index"
        class="detail-item"
      >
        <div
          class="detail-item-simple"
          v-if="typeof value !== 'object' && value"
        >
          <span>{{name}}: </span>
          <span class="detail-value">{{value}}</span>
        </div>
      </div>

      <div
        v-for="(value, name) in details"
        :key="name"
        class="detail-item"
      >
        <table
          v-if="typeof value == 'object'"
          class="detail-item-table"
        >
          <thead class="detail-item-table-title">
            <th colspan=2>{{name}}</th>
          </thead>
          <tbody>
            <tr
              v-for="(rowValue, rowName) in value"
              :key="rowName"
              v-show="rowValue"
            >
              <td>{{rowName}}</td>
              <td class="detail-item-table-value">{{rowValue}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoDetails',
  props: {
    title: String,
    details: Object,
    showDetails: Boolean,
  },
  // data() {
  //   return{
  //   }
  // }
  computed: {
    // simpleDetails() {
    //   let simpleDetails = [];
    //   for (const propertyName in this.details) {
    //     if (Object.hasOwnProperty.call(this.details, propertyName)) {
    //       const propertyValue = this.details[propertyName];
    //       const property = {
    //         name: propertyName,
    //         value: propertyValue
    //       }
    //       if (typeof propertyValue != 'object') simpleDetails.push(property)
    //     }
    //   }
    //   return simpleDetails
    // },
    // objectDetails() {
    //   let objectDetails = [];
    //   for (const propertyName in this.details) {
    //     if (Object.hasOwnProperty.call(this.details, propertyName)) {
    //       const propertyValue = this.details[propertyName];
    //       if (typeof propertyValue == 'object') {
    //         const property = {
    //           name: propertyName,
    //           value: []
    //         }
    //         for (const nestedPropertyName in propertyValue) {
    //           if (Object.hasOwnProperty.call(propertyValue, nestedPropertyName)) {
    //             const nestedPropertyValue = propertyValue[nestedPropertyName];
                
    //           }
    //         }
    //       }
    //     }
    //   }
      // return objectDetails
    // }
  },
  methods: {

  }
}
// function objectToArray(object){
//   let array = [];
//   for (const propertyName in object) {
//     if (Object.hasOwnProperty.call(object, propertyName)) {
//       const propertyValue = object[propertyName];
//       const property = {
//         name: propertyName,
//         value: propertyValue
//       }
//       array.push(property)
//     }
//   }
//   return array
// }

</script>

<style scoped>

  .details {
    border-top: 1px solid darkgrey;
  }
  .details:last-of-type {
    border-bottom: 1px solid darkgrey;
  }
  .details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: .625rem .075rem;
  }
  .details-title {
    font-size: .875rem;
    font-weight: 500;
  }

  .details-content {
    margin-bottom: 1rem;
    font-size: .85rem;
  }

  .arrow.active {
    transform: rotate(-180deg);
  }
  .arrow {
    height: 1.25rem;
    display: block;
    transition: all 0.3s ease;
    fill: rgb(56, 56, 56)
  }

  .detail-item-table {
    border: 1px solid black;
    width: 100%;
    margin: .5rem;
    border-radius: 3px;
  }

  .detail-item-table-title {
    border-bottom: 1px solid black;
    background: whitesmoke;
    width: 100%;
  }

  .detail-item-table-value {
    text-align: right;
    border-left: 1px solid grey
  }
</style>