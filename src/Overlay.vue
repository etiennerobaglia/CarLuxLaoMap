<template>
  <div>
    <div class="overlay loading-overlay" v-if="!isAppLoaded">
      <div class="loader">Loading...</div>
      <div class="logo-container-overlay">
      </div>
    </div>
    <div class="overlay picker-overlay" v-else-if="isGooglePicker">
    </div>
    <div class="overlay login-overlay" v-else-if="GapiInitError">
      <div class="login-dialbox">
        <div class="login-title">
          <h2>
            Connection Impossible
          </h2>
          <svg class="login-link-icon" viewBox="0 0 20 20">
            <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
          </svg>
        </div>
        <p>Private Navigation can prevent signing in with Google. Please use another browser window.</p>
        <p>Error Message: <em>{{GapiInitError.details}}</em></p>
      </div> 
    </div>
    <div class="overlay login-overlay" v-else-if="!isSignedIn && !villagesDB">
      <div class="login-dialbox login-dialbox-clickable" @click="$emit('login');">
        <div class="login-title">
          <h2>
            Click here to Log In
          </h2>
          <svg class="login-link-icon" viewBox="0 0 20 20">
            <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
          </svg>
        </div>
        <p>Privacy add-on can prevent signing in with Google. You should try to disable add-ons like Ghostery, Privacy Badger etc., on this website.</p>
      </div> 
    </div>
    <div class="overlay login-overlay" v-else-if="DBDownloadError && DBDownloadError.includes('Permission: Request had insufficient authentication scopes') && !isGooglePicker">
      <div class="login-dialbox">
        <div class="login-title">
          <h2>
            Error: <em>no access</em>
          </h2>
          <svg class="login-link-icon" viewBox="0 0 20 20">
            <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
          </svg>
        </div>
        <p>This Application is not allowed to access Google Drive, logout and login again.</p>
        <p>Error Message: <em>{{DBDownloadError}}</em></p>
      </div> 
    </div>
    <div class="overlay login-overlay" v-else-if="DBDownloadError && !isGooglePicker">
      <div class="login-dialbox login-dialbox-clickable" @click="$emit('picker');">
        <div class="login-title">
          <h2>
            No access: <em>Click here to allow access</em>
          </h2>
          <svg class="login-link-icon" viewBox="0 0 20 20">
            <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
          </svg>
        </div>
        <p>No access can derive from the following:
          <ul>
            <li>This Application is not allowed to use the file. Click here to allow. </li>
            <li>This Application is not allowed to access Google Drive, logout and login again. </li>
            <li>The user <strong>{{userName}}</strong> doesn't have access to the database file, the access should be shared within Google Drive/Spreadsheet.</li>
          </ul>
        </p>
        <p>Error Message: <em>{{DBDownloadError}}</em></p>
      </div> 
    </div>
    <div class="overlay login-overlay" v-else-if="DBParseError">
      <div class="login-dialbox login-dialbox-clickable" @click="$emit('requestVillagesDB');">
        <div class="login-title">
          <h2>
            Error: <em>file malformed</em>
          </h2>
          <svg class="login-link-icon" viewBox="0 0 20 20">
            <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
          </svg>
        </div>
        <p>The file seems malformed.</p>
        <p>Fix the file and <strong>clik here to retry</strong>.</p>
        <p>Error Message: <em>{{DBParseError}}</em></p>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    isGooglePicker: null,
    isAppLoaded: null,
    isSignedIn: null,
    userName: null,
    villagesDB: null,
    DBDownloadError: null,
    DBParseError: null,
    GapiInitError: null,
  },
}
</script>

<style>

.loading-overlay .logo-container-overlay {
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 185px;
  /* margin-top: 2rem; */

    background-image: url("./assets/carluxlao_logo.png");
  background-position: center center;
  
}

.overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 166, 166, 0.712);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay {
  background: white;
  z-index:1100;
  flex-direction: column;
}

.login-overlay {
  z-index:1050;
  background: rgba(255, 255, 255, 0.883);
}
.picker-overlay {
  z-index:999;
  background: rgba(255, 255, 255, 0.883);
}
.login-dialbox {
  border: 3px solid #D22F3D;
  background: white;
  max-width: 420px;
  margin: 2rem;
  padding: 2.6rem 3rem;

}
.login-dialbox p {
  font-size: .825rem
}

.login-dialbox p ul {
 margin-left: 1.25rem
}

.login-title {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
}

.login-dialbox-clickable:hover {
  color: #D22F3D;
  cursor: pointer;
}


.login-dialbox-clickable:hover .login-link-icon {
  fill: #D22F3D;
}


/* LOADER */
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 8px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #D22F3D;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* end LOADER */

</style>