<template>
  <div id="app-root">
    <Overlay
      :isAppLoaded="isAppLoaded"
      :isSignedIn="isSignedIn"
      :userName="userName"
      :villagesDB="villagesDB"
      :DBDownloadError="DBDownloadError"
      :DBParseError="DBParseError"
      @login="login()"
    />
    <div class="logo-container">
    </div>
    <div class="side-panel">
      <button class="logout-button" @click="logout()" v-if="isSignedIn">
           Log out {{userName}}.
      </button>
      <div
        class="side-panel-filters"
      >
        <div 
          class="side-panel-title"
          @click="displayFilter=!displayFilter"
        >
          <span>Filters</span>
          <span class="side-panel-button">
            <svg v-show="displayFilter" class="side-panel-button-cross" viewBox="0 0 20 20">
              <path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
            </svg>
            <span class="side-panel-button-plus" v-show="!displayFilter" style="">+</span>
          </span>
          </div>
        <Filters
          v-if="displayFilter"
          @filters="updatesFilters"
          :villagesDB="villagesDB"
        />
      </div>
      <div 
        class="side-panel-info"
          v-if="village == null ? false : true"
      >
        <div 
          v-show="village"
          class="side-panel-title"
          @click="displayPanel=!displayPanel"
        >
          <span>Village</span>
          <span class="side-panel-button">
            <svg v-show="displayPanel" class="side-panel-button-cross" viewBox="0 0 20 20">
              <path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
            </svg>
            <span class="side-panel-button-plus" v-show="!displayPanel" style="">+</span>
          </span>
        </div>
        <InfoPanel
          v-if="displayPanel"
          :village="village"
        />
      </div>
    </div>
    <Map
      @village="updatesVillage"
      :filters="filters"
      :villagesDB="villagesDB"
    />
    </div>
</template>

<script>

import Overlay from './Overlay.vue';
import Map from './map/Map.vue';
import InfoPanel from './info-panel/InfoPanel.vue';
import Filters from './filtering/Filters.vue';
import * as csv from "csvtojson";

export default {
  name: 'App',
  components: {
    Overlay,
    Map,
    Filters,
    InfoPanel,
  },
  data() {
    return {
      isAppLoaded: false,
      isSignedIn: null,
      DBDownloadError: null,
      DBParseError: null,
      filters: Object,
      village: null,
      displayFilter: true,
      displayPanel: true,
      villagesDB: null,
      oauthToken: null,
    };
  },
  computed: {
    userName() {
      const user = this.$gapi.getUserData()
      if (user) {
        return user.fullName
      } else {
        return null;
      }
    }
  },
  created() {
    // Subscribe to authentication status changes
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn
      if (isSignedIn) {
        this.requestVillagesDB();
      }
      else {
        this.isAppLoaded = true;
      }
    })
  },
  methods: {
    updatesFilters(emittedFilters) {
      this.filters = emittedFilters;
    },
    updatesVillage(emittedVillage) {
      this.village = emittedVillage;
    },
    login() {
      this.$gapi.login()
      .then(({ currentUser}) => {
          if (currentUser.vc && currentUser.vc['access_token']) this.oauthToken = currentUser.vc['access_token']
      })
    },
    logout() {
      this.$gapi.logout();
      this.villagesDB = null;
      this.village = null;
      this.DBDownloadError = null;
    },
    requestVillagesDB() {
        this.$gapi.getGapiClient().then( gapi =>
            gapi.client.request({
            'method': 'GET',
            'path': '/drive/v3/files/1ukxTcJL6dLtbDlOHt0S0pdbuauEsUx3oxgbmPzN0mvs/export',
            'params': {
              'mimeType': 'text/csv'
            }
          })
          .execute((response, responseur) => this.handleRequestVillagesDB(response, responseur))
        )
    },
    handleRequestVillagesDB(response, responseur) {
      if (response) {
        if (response.error && response.error.message) {
          this.isAppLoaded = true;
          this.DBDownloadError = response.error.message;
        }
        else this.logout();
      }
      else {
        let inputCSV = JSON.parse(responseur).gapiRequest.data.body;
          csv({
            ignoreEmpty: true,
            checkType: true,
            colParser:{
              'geometry.coordinates': function(value) {
                return JSON.parse(value)
              },
            }
          })
            .on('error',(err)=>{
              console.log(err)
              this.DBParseError = err
              this.isAppLoaded = true;
            })
            .fromString(inputCSV)
            .then((outputJson) => {
              if (!this.DBParseError) {
                this.villagesDB = outputJson
                this.isAppLoaded = true;
              }
            } )
      }
    },
  },
  watch: { 
    village: function(newVal) {
      if (window.matchMedia("(max-width: 990px)").matches) {
        if (newVal.properties)  {
          this.displayFilter = false;
        }
      }
      this.displayPanel = true;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}

#app-root {
  height: 100vh;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d3d3d;
}

.logo-container {
  position: absolute;
  left: 8px;
  z-index: 1000;
  background-image: url("./assets/carluxlao_logo.png");
  background-size: cover;
  background-position: center center;
  width: 100px;
  height: 75px;
  bottom: 12px;
}

.logout-button {
  position: absolute;
  top: 4px;
  right: 4px;
  background: white;
  border: 2px solid #D22F3D;
  padding: .05rem .3rem;
  border-radius: 2px;
  font-weight: 500
}

.logout-button:hover {
  color: #D22F3D;
  cursor: pointer;
}

.login-link-icon {
  width: 2rem;
  margin-left: 1.5rem;
}

.side-panel {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  max-height: calc(100vh - 16px);
  z-index: 1000;
  position: fixed;
  right: 8px;
}

.side-panel-content {
  border: 3px solid #D22F3D;
  border-radius: 1px;
  padding: 1rem 1.5rem;
  background: white;
  overflow: scroll;
}

.side-panel-title {
  background: #D22F3D;
  color: white;
  padding: .25rem .9rem;
  font-weight: 500;
  font-size: 1.1rem;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto; 
  position: relative
}
.side-panel-button {
  margin-left: .75rem;
}
.side-panel-button-cross {
  height: 12px;
  fill: white;
}
.side-panel-button-plus {
  /* font-size: 1.1rem; */
}
.side-panel-info {
  max-height: 100%;
  overflow: scroll;
  /* Turn on custom 8px wide scrollbar */
  min-height: 100%;
}
.side-panel-info::-webkit-scrollbar {
  width: 8px; /* 1px wider than Lion. */
  /* This is more usable for users trying to click it. */
  background-color: rgba(0,0,0,0);
  -webkit-border-radius: 100px;
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
.side-panel-info::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
.side-panel-info::-webkit-scrollbar-thumb:vertical {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0,0,0,0.5);
  -webkit-border-radius: 100px;
}
.side-panel-info::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0,0,0,0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}

.side-panel-content  {
  width: 345px;
  max-width: 345px;
  max-width: calc(100vw - 16px) ;
  overflow: hidden
}

.side-panel-filters {
  margin-bottom: 8px;
}


@media (max-width: 990px) { 
  .side-panel{
    bottom: 8px;
    max-height: 80%;
 }
 .logo-container {
   top: 0;
   right: 8px;
   left: auto;
 }
}
</style>
