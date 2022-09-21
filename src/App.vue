<template>
  <div class="header-container">
    <div>
      <router-link to="/#">
        <img
          src="./assets/images/Chords2.svg"
          alt="chords-logo"
          class="logo"
        />
      </router-link>

      <div
        v-if="loggedUser"
        class="nav-links"
      >
        <router-link
          to="/#"
          class="top"
          >Buy</router-link
        >
        |
        <router-link
          to="/Profile"
          class="top"
          >Sell</router-link
        >
      </div>
    </div>
    <div class="search-profile-container">
      <div class="profile-cmp">
        <router-link
          v-if="loggedUser"
          to="/Profile"
          class="profile-icon"
        >
          <span
            class="profile-circle"
            :style="{ background: userGradient }"
            >{{ loggedUser.charAt(0) }}</span
          >
        </router-link>
        <router-link
          v-if="loggedUser"
          to="/Profile"
          class="top"
        >
          Profile</router-link
        >
        <span
          v-if="loggedUser"
          class="profile-options text"
          >|</span
        >
        <router-link
          to="/#"
          class="profile-options text"
          v-if="loggedUser"
          @click="logout"
          title="Logout"
        >
          <span>Logout</span>
        </router-link>
        <span
          v-if="loggedUser"
          class="profile-options"
          >|</span
        >
        <span
          v-if="loggedUser"
          class="profile-options text"
          >Cart</span
        >
      </div>

      <div
        class="box"
        @click=";(expandBox = '350px'), (radius = '0px')"
        v-if="loggedUser"
      >
        <form name="search">
          <input
            type="text"
            class="input"
            name="txt"
            placeholder="Search"
            onclick="this.value = '';"
            :style="{ width: expandBox, borderRadius: radius }"
            @blur=";(expandBox = ''), (radius = '50px')"
          />

          <img
            class="search-icon"
            src="./assets/images/search.png"
          />
        </form>
      </div>
    </div>
  </div>

  <hr />

  <div class="login">
    <Login
      class="login-form"
      @logged-user="setLoggedUser"
      v-if="isLoginVisible == true"
    />
    <router-view
      :class="{ loggedin: loggedUser, loggedout: !loggedUser }"
      class="loginform"
    />
  </div>

  <div class="footer">
    <FooterRow />
  </div>
</template>

<script>
// import HeaderRow from './components/HeaderRow.vue'
import FooterRow from './components/FooterRow.vue'
import Login from './components/Login.vue'
import { provide } from 'vue'
import store from './store'

export default {
  components: { FooterRow, Login },
  name: 'App',
  setup() {
    provide('store', store)
  },
  data() {
    return {
      loggedUser: '',
      loginform: false,
      isLoginVisible: true,
      search: '',
      records: [],
      expandBox: 'none',
      userGradient: '',
      radius: '',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedUser')
      localStorage.removeItem('userId')
      document.location.reload(true) // force page reload
      window.location = '/'
    },
    setLoggedUser(loggedInUser) {
      this.loggedUser = loggedInUser
    },
    login() {
      this.loginform = true
    },
    // shrinkBox() {
    //   console.log('test')
    // },
  },
  mounted() {
    if (localStorage.loggedUser) {
      this.loggedUser = localStorage.loggedUser
      this.userGradient = localStorage.userGradient
      // console.log(localStorage)
      console.log('loggedUSER ID: ' + localStorage.userId)
    }
    if (localStorage.userId) {
      this.isLoginVisible = false
    }
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 6.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.text {
  cursor: pointer;
}

.text:hover {
  text-decoration: underline;
}

.logo {
  width: 14rem;
}

.nav-links {
  margin-top: 0.75rem;
}

.search-profile-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.profile-cmp {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.box {
  display: block;
  position: relative;
  margin-top: 1rem;
  background-color: #ffffff;
}

.input {
  padding: 10px;
  width: 40px;
  height: 40px;
  background: none;
  border: 1px solid #201f1b;
  border-radius: 50px;
  box-sizing: border-box;
  font-size: 15px;
  color: #000000;
  outline: none;
  transition: 0.7s;
}

.box img {
  position: absolute;
  z-index: 1;
  top: 1.35rem;
  right: 0.1rem;
  vertical-align: middle;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 15px;
  color: #030303;
  transition: 0.2s;
}

.login {
  background-color: rgba(255, 255, 255, 0.65);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 2rem;
}

.loggedout {
  z-index: -1;
  max-height: 50rem;
  transform: translateY(-105%) scale(0.9);
  overflow-y: hidden;
  margin-bottom: -70%;
}

.loggedin {
  transform: none;
  z-index: 0;
  max-height: none;
  margin-top: 1rem;
  margin-bottom: -8rem;
}

.search-icon {
  width: 18px;
  height: 18px;
  background-color: #ffffff;
}

.profile-cmp {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: right;
}

.profile-circle {
  height: 30px;
  width: 30px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.profile-icon {
  margin-right: 0.5em;
}

.profile-icon:hover {
  text-decoration: none;
}

.footer {
  position: absolute;
  margin-top: 5rem;
  width: clamp(40rem, 80%, 80rem);
  z-index: 0;
}
</style>
