<template>
  <div class="village-stats">
    <div class="village-stats-text">
      <div class="village-stats-tooltip">Data source:<br> Project MoU</div>
      <div>
        <div><strong>Population: </strong> {{villageStats.population}}</div>
        <div><strong>Households: </strong> {{villageStats.household}}</div>
      </div>
      <div class="village-stat-right">
        <div class="village-stat-right-info"><strong>Females: </strong> {{villageStats.women}} ({{womenRatioRounded}} %)</div>
        <div class="village-stat-right-info"><strong>Males: </strong> {{villageStats.population - villageStats.women}} ({{100-womenRatioRounded}} %)</div>
      </div>
    </div>
    <div class="village-stats-population">
      <InfoPopDonut
        :chart-data="ethnicitiesChartData"
        :height="120"
        :width="100"
      />
    </div>
  </div>
</template>

<script>
import InfoPopDonut from './InfoPopDonut.vue';

export default {
  name: 'InfoVillageStats',
  props: ['villageStats'],
  components: {
    InfoPopDonut
  },
  computed: {
    womenRatioRounded() {
      let ratio = (this.villageStats.women*100)/this.villageStats.population;
      return Math.round(ratio * 10) / 10;
    },
    ethnicities() {
      return {
        "Lao Loum": this.villageStats.laoloum,
        "Hmong": this.villageStats.moung,
        "Khmu": this.villageStats.keummou,
        "Pong": this.villageStats.fong,
        "Tai": this.villageStats.tai,
      }
    },
    ethnicitiesChartData() {
      let labels = []
      let datasets = [
          {
            backgroundColor: [
              '#003f5c',
              '#34457d',
              '#783f87',
              '#b62a71',
              '#d92e40',
            ],
            data: [],
          }
        ]
      for (const propName in this.ethnicities) {
        if (Object.hasOwnProperty.call(this.ethnicities, propName)) {
          const propValue = this.ethnicities[propName];
          labels.push(propName);
          datasets[0].data.push(propValue)
        }
      }
      return {
        labels,
        datasets,
      }
    },
  },
}
</script>

<style scoped>
.village-stats {
  justify-content: space-between;
  align-items: center;
  margin: .75rem .25rem 1.5rem;
}

.village-stats-text {
  margin-bottom: 1.25rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: .85rem;
  cursor: help;
  position: relative;
}

.village-stats-tooltip {
  position: absolute;
  top: -42.5px;
  background: rgb(70, 70, 70);
  color: white;
  border-radius: 3px;
  display: none;
  font-weight: 600;
  padding: .1rem .3rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 100px;
}

.village-stats-text:hover .village-stats-tooltip {
  display: block;
}

.village-stat-right {
  text-align: right;
}
.village-stat-right-info {
  text-align: inherit;
}

</style>