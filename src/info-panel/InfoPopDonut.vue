<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'InfoPopDonut',
  extends: Doughnut,
  mixins: [reactiveProp],
  data() {
    return {
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Ethnic group',
          position: 'left'
        },
        legend: {
          display: true,
          position: 'right',
          
        }
      }
    }
  },
  mounted () {
    this.renderChart(
      this.chartData, 
      this.options
    );
  }
}
</script>

<style scoped>

</style>
