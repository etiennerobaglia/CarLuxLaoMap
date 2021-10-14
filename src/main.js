import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import './global.css';

Vue.config.productionTip = false

// map styling
Vue.prototype.$mapStyleBlack = 'rgb(34, 34, 34)'
Vue.prototype.$mapStyleWhite = '#fff'
Vue.prototype.$mapStyleLightGrey = '#afb1b3'
Vue.prototype.$mapStyleDarkGrey = 'black'
Vue.prototype.$mapStyleRed = 'red'
Vue.prototype.$mapStyleVillageRadius = 2.75
Vue.prototype.$mapStyleSLSVillageColor = '#975100'
Vue.prototype.$mapStyleDRRVillageColor = '#522e96'
Vue.prototype.$mapStyleWaterColor = 'rgba(58,136,232,1.0)'
Vue.prototype.$mapStyleRoadsColor = '#bcbcbc'
Vue.prototype.$interventionDistricts = ['Huameuang', 'Kham', 'Nonghed', 'Phaxay']


Vue.prototype.$White = '#fff';
Vue.prototype.$LightBlack = '#3b3b3b';
Vue.prototype.$DarkRed = '#D22F3D';
Vue.prototype.$MiddleRed = '#D92E40';
Vue.prototype.$LightRed = '#f70f0f';

new Vue({
  render: h => h(App),
}).$mount('#app')
