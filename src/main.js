import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import './global.css';
import VueGapi from 'vue-gapi'

let cliendID = "481834503208-381snrc1m9pp0rm5knmarqg3crfhinrr.apps.googleusercontent.com";

Vue.config.productionTip = false

// styling
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
// end styling

Vue.prototype.$clientId = cliendID;

Vue.use(VueGapi, {
  // apiKey: '<YOUR_API_KEY>',
  clientId: cliendID,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/drive.file',
})

Vue.mixin({
  methods: {
    unslugify: function (string, capitalizeAllWords) {
      let seperatesWords = string.toString().split('_')
      let mergedWords = [];
      seperatesWords.forEach( (word, i) => {
        if (word == "nb") word = 'N° of';
        if (capitalizeAllWords || i == 0) word = word.charAt(0).toUpperCase() + word.slice(1);
        mergedWords.push(word)
      });
      return mergedWords.join(' ')
    },
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app')
