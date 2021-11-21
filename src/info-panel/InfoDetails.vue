<template>
  <section class="details">
    <header
      class="details-header"
      :class="{'details-header-active': showDetails}"
      @click="showDetails = !showDetails"
    >
      <div class="details-title-container">
        <h3 class="details-title">
          {{title}}
        </h3>
      </div>
      <svg
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
          v-if="
            typeof value !== 'object' 
            && value !== null
            && value !== ''
            && value !== 'NA'"
        >
          <span class="detail-name">
            {{name.toString().split('_').join(' ')}}: 
          </span>
          <span class="detail-value">{{value}}</span>
        </div>
      </div>

      <div
        v-for="(value, name) in details"
        :key="name"
        class="detail-item"
        v-show="
          typeof value === 'object' 
          && value != undefined 
          && value != null
          && Object.keys(value).length"
      >
        <span class="detail-name detail-item-list-title">
          {{name.toString().split('_').join(' ')}}:
        </span>
        <ul 
          class="detail-item-list"
        >
          <div
            v-for="(rowValue, rowName) in value"
            :key="rowName"
            v-show="
            typeof rowValue !== 'object' 
            && rowValue !== null
            && rowValue !== ''
            && rowValue !== 'NA'"
          >
            <li class="detail-item-list-pair">
              <span class="detail-item-list-name">
                {{rowName.toString()
                    .split('nb').join('N° of')
                    .split('_').join(' ')}}
              </span>
              <span class="detail-item-list-value">{{rowValue}}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoDetails',
  props: {
    title: String,
    icon: String,
    details: Object,
    showDetails: Boolean,
  }
}

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
    height: 2.5rem;
  }

  .details-header-active{
    color: #D92E40;
  }

  .details-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .details-title-icon {
    height: 1.75rem;
    margin: 0 .5rem 0 .3rem
  }
  .details-title {
    font-size: .95rem;
    font-weight: 600;
  }

  .details-content {
    margin: 0 .6rem 1.25rem;
    font-size: .8rem;
  }

  .details-header-active .arrow {
    transform: rotate(-180deg);
    fill: #D92E40
  }

  .arrow {
    height: 1.25rem;
    display: block;
    transition: all 0.3s ease;
    fill: rgb(56, 56, 56)
  }

  .detail-item:not(:last-of-type) {
    margin-bottom: .1rem;
  }

  .detail-item-simple {
    display: flex;
    justify-content: space-between;
  }

  .detail-name {
    font-weight: 600;
    text-transform: capitalize;
    margin-right: .5rem;
  }
  .detail-value {
    text-align: justify;
  }

  .detail-item-list {
    margin: 0 20% 0 6%;
    border-left: 1px solid darkgrey;
    padding-left: 3%;
  }

  .detail-item-list-title {
  }

  .detail-item-list-pair {
    display: flex;
    justify-content: space-between;
    font-size: .7rem;
  } 

  .detail-item-list-name {
    font-weight: 600;
    text-transform: capitalize;
  }

</style>