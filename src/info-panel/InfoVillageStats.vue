<template>
  <div class="village-stats">
    <div class="village-stats-text">
      <!-- <div class="village-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, eveniet impedit.</div> -->
      <div>
        <div><strong>Population: </strong> {{villageStats.mou.population}}</div>
        <div><strong>Housholds: </strong> {{villageStats.mou.household}}</div>
      </div>
      <div class="village-stat-right">
        <div class="village-stat-right-info"><strong>Females: </strong> {{villageStats.mou.women}} ({{womenRatioRounded}} %)</div>
        <div class="village-stat-right-info"><strong>Males: </strong> {{villageStats.mou.population - villageStats.mou.women}} ({{100-womenRatioRounded}} %)</div>
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
      let ratio = (this.villageStats.mou.women*100)/this.villageStats.mou.population;
      return Math.round(ratio * 10) / 10;
    },
    ethnicities() {
      return {
        "Lao Loum": this.villageStats.mou.laoloum,
        "Hmong": this.villageStats.mou.moung,
        "Khmu": this.villageStats.mou.keummou,
        "Pong": this.villageStats.mou.fong,
        "Tai": this.villageStats.mou.tai,
      }
    },
    ethnicitiesChartData() {
      let labels = []
      let datasets = [
          {
            backgroundColor: [
              // '#d92e40',
              // '#e66968',
              // '#ef9792',
              // '#f2c3bf',
              // '#eeeeee',
'#003f5c',
'#34457d',
'#783f87',
'#b62a71',
'#d92e40',
// '#bf001a',
// '#d3483c',
// '#e47160',
// '#f39787',
// '#ffbcaf',
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
  margin-bottom: 1.5rem;
  align-items: center;
}
.village-stats-text {
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: .85rem;
}

.village-stat-right {
  text-align: right;
}
.village-stat-right-info {
  text-align: inherit;
}

.village-stats-population{
} 

</style>