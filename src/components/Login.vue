<template>
  <!-- Login pop up [START] -->
  <section
    class="login"
    v-show="isLoginVisible"
  >
    <div class="body">
      <div class="login-div">
        <div class="login-header">
          <h2>Log in to your Chords account</h2>
        </div>
        <form
          id="login-form"
          @submit.prevent=""
          ref="registerForm"
          action="#"
          novalidate="true"
          class="user-input-form"
        >
          <div class="user-input">
            <div class="input user-email">
              <p>Email address</p>
              <input
                type="text"
                name="userEmail"
                v-model.trim="loginFormValue.loginEmail"
                :rules="loginEmailRules"
              />
            </div>
            <div class="input user-password">
              <p>Password</p>
              <div class="password">
                <input
                  type="password"
                  name="userPassword"
                  class="password-inp"
                  v-model.trim="loginFormValue.loginPassword"
                  @keyup.enter="login"
                  @focus="hideLoginErrorMsg"
                />
              </div>
              <p><span>Forgot your password?</span></p>
            </div>
          </div>
          <p class="errors">{{ loginError }}</p>
          <div
            class="error-msg"
            v-if="isLoginError"
          >
            {{ loginErrorMsg }}
          </div>
          <input
            type="button"
            value="Log In"
            class="log-in-btn"
            :rules="[rules.required, rules.min]"
            @click="login"
            @focus="hideLoginErrorMsg"
          />
        </form>
        <p>
          New to Chords?
          <span
            @click="showSignupHideLogin"
            class="create-acc"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  </section>
  <!-- Login pop up section [ENDS] -->

  <!-- Sign up section [STARTS] -->
  <section
    class="signup"
    v-show="isSignUpVisible"
  >
    <div class="body">
      <form
        id="signup-form"
        @submit.prevent="checkForm"
        ref="registerForm"
        action="#"
        novalidate="true"
      >
        <div class="signup-div">
          <div class="signup-header">
            <h2>Sign Up to Chord</h2>
          </div>
          <div class="user-input">
            <div class="input user-name">
              <p>Username</p>
              <input
                type="text"
                v-model.trim="userDetails.userName"
                class="input"
                placeholder="Enter username"
                @keyup="lowercase"
              />
              <p class="errors">{{ errors.blankUserName }}</p>
            </div>
            <div class="input user-email">
              <p>Email address</p>
              <input
                type="text"
                v-model.trim="userDetails.userEmail"
                class="input"
                placeholder="Enter email"
                @keyup="lowercase"
              />
              <p class="errors">{{ errors.blankEmail }}</p>
              <p class="errors">{{ errors.badEmail }}</p>
            </div>
            <div class="input user-password">
              <p>Password</p>
              <div class="password">
                <input
                  type="password"
                  v-model.trim="userDetails.userPassword"
                  class="input"
                  placeholder="Enter password (min 8 characters)"
                />
                <p class="errors">{{ errors.blankPswrd }}</p>
                <p class="errors">{{ errors.shortPswrd }}</p>
              </div>
            </div>
          </div>
          <div
            class="error-msg"
            v-if="isEmailError"
          >
            {{ emailErrorMsg }}
          </div>
          <input
            type="submit"
            class="sign-up-btn"
            value="Sign up"
          />
          <p>
            <span
              @click="showLoginHideSignup"
              class="create-acc"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  </section>
  <!-- sign up section [ENDS] -->
</template>

<script>
import store from '../store'
const usersApi = 'https://vc-users-login.netlify.app/.netlify/functions/api/'
const MINCHAR = 8

export default {
  name: 'Login',
  data() {
    return {
      isEmailError: false,
      emailErrorMsg: 'Email is already taken',
      isLoginError: false,
      loginErrorMsg: 'Email or Password does not match',
      isLoginVisible: true,
      isSignUpVisible: false,
      isFormValid: true,
      dialog: true,
      loggedUser: '',
      users: [],
      posts: [],
      loginFormValue: {
        loginEmail: '',
        loginPassword: '',
      },
      verify: '',
      userDetails: {
        userName: '',
        userEmail: '',
        userPassword: '',
        userGradient: '',
      },
      errors: {
        blankEmail: '',
        blankPswrd: '',
        blankUserName: '',
        badEmail: '',
        shortPswrd: '',
      },
      loginError: '',
      loginEmailRules: [v => !!v || 'Required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters',
      },
    }
  },

  methods: {
    // Create the hex code for propfile gradient background
    createHex() {
      var hexCode1 = ''
      var hexValues1 = '0123456789abcdef'

      for (var i = 0; i < 6; i++) {
        hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length))
      }
      return hexCode1
    },

    generateGradient() {
      var deg = Math.floor(Math.random() * 360)

      var gradient =
        'linear-gradient(' +
        deg +
        'deg, ' +
        '#' +
        this.createHex() +
        ', ' +
        '#' +
        this.createHex() +
        ')'

      this.userDetails.userGradient = gradient
    },
    showSignupHideLogin() {
      this.isLoginVisible = false
      this.isSignUpVisible = true
    },
    showLoginHideSignup() {
      this.isSignUpVisible = false
      this.isLoginVisible = true
    },
    lowercase() {
      this.userDetails.userName = this.userDetails.userName.toLowerCase()
      this.userDetails.userEmail = this.userDetails.userEmail.toLowerCase()
    },
    login() {
      if (this.loginFormValue.loginEmail && this.loginFormValue.loginPassword) {
        this.users.forEach(element => {
          if (
            element.userEmail == this.loginFormValue.loginEmail &&
            element.userPassword == this.loginFormValue.loginPassword
          ) {
            this.loggedUser = element.userName
            this.userDetails.userGradient = element.userGradient
            this.userDetails.userEmail = element.userEmail
            localStorage.userId = element._id
            localStorage.loggedUser = this.loggedUser
            localStorage.userGradient = this.userDetails.userGradient
            localStorage.userEmail = element.userEmail
          }
        })
        if (this.loggedUser) {
          this.userDetails.user_id = localStorage.userId
          this.userDetails.userGradient = localStorage.userGradient
          this.userDetails.userEmail = localStorage.userEmail
          this.dialog = false // closing form
          this.$emit('logged-user', this.loggedUser) // local storage - update header proile text
          document.location.reload(true) // force page reload to show admin table
          this.isLoginVisible = false
        } else {
          console.log('login failed')
          this.isLoginError = true
        }
      } else {
        this.loginError = 'Please enter the required fields'
      }
    },
    // Signup input form validation checks
    checkForm(e) {
      e.preventDefault()
      this.errors = []
      // validation
      if (!this.userDetails.userName) {
        this.errors.push('Name required.')
        this.errors.blankUserName = 'Name required.'
      }
      if (!this.userDetails.userEmail) {
        this.errors.push('Email required.')
        this.errors.blankEmail = 'Email required.'
      } else if (!this.validEmail(this.userDetails.userEmail)) {
        this.errors.push('Valid email required.')
        this.errors.badEmail = 'Valid email required.'
      }
      if (!this.userDetails.userPassword) {
        this.errors.push('Password required.')
        this.errors.blankPswrd = 'Password required.'
      } else if (this.userDetails.userPassword.length < MINCHAR) {
        this.errors.push('Password needs to be 8 characters or more.')
        this.errors.shortPswrd = 'Password needs to be 8 characters or more.'
      }
      // no error found, call addUser
      if (!this.errors.length) {
        return this.addUser()
      }
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    getAll() {
      fetch(usersApi)
        .then(response => response.json())
        .then(data => {
          // filter data to show only post that match the user_id
          if (localStorage.userId) {
            let postData = []
            data.forEach(element => {
              if (localStorage.userId == element.user_id) {
                postData.push(element)
              }
            })
            this.posts = postData
          } else {
            this.posts = data
          }
          this.loading = false
        })
        .catch(err => {
          if (err) throw err
        })
    },
    addUser() {
      // done
      this.generateGradient()
      if (
        this.userDetails.userName &&
        this.userDetails.userEmail &&
        this.userDetails.userPassword
      ) {
        // check email from database
        this.users.forEach(element => {
          if (element.userEmail == this.userDetails.userEmail) {
            this.isEmailError = true
          }
        })
        if (!this.isEmailError) {
          fetch(usersApi, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.userDetails),
          })
            .then(response => response.text())
            .then(data => {
              this.getAllUsers()
              this.resetData()
              this.showLoginHideSignup()
              console.log(data)
            })
            .catch(err => {
              if (err) throw err
            })
        }
      }
    },
    getAllUsers() {
      fetch(usersApi)
        .then(response => response.json())
        .then(data => {
          this.users = data
        })
        .catch(err => {
          if (err) throw err
        })
    },
    hideLoginErrorMsg() {
      this.isLoginError = false
    },
    hideEmailErrorMsg() {
      this.isEmailError = false
    },
    resetData() {
      this.userDetails.userName = ''
      this.userDetails.userEmail = ''
      this.userDetails.userPassword = ''
      this.userDetails.userGradient = ''
      this.loginFormValue.loginEmail = ''
      this.loginFormValue.loginPassword = ''
    },
  },
  mounted() {
    // check if user is logged-in, do not show login form
    if (localStorage.loggedUser) {
      this.dialog = false
    }
    // get all users
    this.getAllUsers()
    this.getAll()

    if (localStorage.userId) {
      // set logged-in user_id
      this.userDetails.user_id = localStorage.userId
    }

    if (localStorage.userId) {
      this.isLoginVisible = false
    }

    store.state.user_gradient = localStorage.userGradient
  },
}
</script>

<style lang="scss" scoped>
.login-div,
.signup-div {
  background-color: white;
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
  padding: 4rem 6rem 6rem 6rem;
  box-shadow: 4px 4px 16px grey;

  p {
    font-size: 0.8rem;
  }

  .create-acc {
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }
}

.login-header,
.signup-header {
  margin-bottom: 1rem;
  text-align: center;
}

.user-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  justify-content: space-between;
  margin: 2rem 0rem;
}

.user-input-form,
.errors {
  width: 100%;
}

.input {
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  text-align: left;

  input {
    font-size: 1rem;
    height: 2.5rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 5px;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid black;
  }

  span {
    font-weight: 600;
    cursor: pointer;
  }

  span:hover {
    text-decoration: underline;
  }
}

#signup-form {
  width: 100%;
}

.log-in-btn,
.sign-up-btn {
  margin-bottom: 1.5rem;
  font-weight: 700;
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
}

// ERROR STLES
.errors {
  text-align: left;
  color: tomato;
}

.errors li {
  padding-top: 1em;
  font-weight: 500;
  color: tomato;
}

.error-msg {
  color: red;
  font-size: 1rem;
  padding-bottom: 1em;
}
</style>
