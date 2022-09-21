<template>
  <div class="profile-div">
    <div
      :style="{ background: userGradient }"
      class="user-image"
    >
      <h1>{{ loggedUser.slice(0, 1) }}</h1>
    </div>

    <!-- Display input edit forms -->
    <div
      class="edit-inputs"
      v-if="editId == loggedUserId"
    >
      <label for="username"
        >Username
        <input
          id="username"
          type="text"
          v-model.trim="editUser.userName"
          class="username-input input long-input"
        />
      </label>
      <label for="email"
        >Email
        <input
          id="email"
          type="text"
          v-model.trim="editUser.userEmail"
          class="email-input input long-input"
      /></label>
      <div class="edit-buttons">
        <button
          class="edit"
          @click="updateDoc(loggedUserId)"
        >
          Confirm
        </button>

        <button
          class="remove"
          @click="onCancel"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Display logged in user details -->
    <div
      v-else
      class="user-details"
    >
      <p class="username">{{ loggedUser }}</p>
      <p>{{ userEmailDisplayed }}</p>
      <input
        type="button"
        class="button edit-profile-button"
        value="EDIT PROFILE"
        @click="editUserData(loggedUserId)"
      />
    </div>
  </div>
</template>

<script>
const usersApi = 'https://vc-users-login.netlify.app/.netlify/functions/api/'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      // record: null,
      userNameDisplayed: '',
      userEmailDisplayed: '',
      userGradient: '',
      loggedUser: '',
      loggedUserId: '',
      editId: '',
      id: '',
      editUser: {
        userName: '',
        userEmail: '',
      },
      // users: [],
      // testName: '',
    }
  },
  methods: {
    editUserData(id) {
      // done
      this.id = id
      fetch(usersApi + id, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          this.editId = data._id
          this.editUser.userName = data.userName
          this.editUser.userEmail = data.userEmail
          // this.editRecord.artistName = data.artistName
          // this.editRecord.genre = data.genre
        })
        .catch(err => {
          if (err) throw err
        })
    },
    updateDoc(id) {
      Swal.fire({
        // title: "Well done!",
        text: 'Your details were updated',
        icon: 'success',
        confirmButtonText: 'Wohoo!',
      })
      this.id = id
      fetch(usersApi + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editUser),
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
          // console.log(this.editUser.userName)
          // this.testName = this.editUser.userEmail
          localStorage.userEmail = this.editUser.userEmail
          localStorage.loggedUser = this.editUser.userName
          this.editId = ''
          this.editUser.userName = ''
          this.editUser.userEmail = ''
          document.location.reload(true) // force page reload to show admin table
          // console.log(this.users.userName)

          // this.loggedUser = localStorage.loggedUser
          // this.userEmail = localStorage.userEmail
          // console.log(this.users)
          // this.getAllUsers()
        })
        .catch(err => {
          if (err) throw err
        })
    },
    // getAllUsers() {
    //   fetch(usersApi)
    //     .then(response => response.json())
    //     .then(data => {
    //       this.users = data
    //       // console.log(this.users)
    //     })
    //     .catch(err => {
    //       if (err) throw err
    //     })
    // },
    onCancel() {
      this.editId = ''
      this.editUser.userName = ''
      this.editUser.userEmail = ''
    },
  },

  mounted() {
    this.userGradient = localStorage.userGradient
    this.loggedUser = localStorage.loggedUser
    // this.userNameDisplayed = localStorage.loggedUser
    this.userEmailDisplayed = localStorage.userEmail
    this.loggedUserId = localStorage.userId
    // console.log(localStorage)
    // this.getAllUsers()
  },
}
</script>

<style lang="scss" scoped>
.profile-div {
  border: solid 1px grey;
  padding: 1rem;
  width: 18rem;
  height: 22rem;
  padding-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 0.6rem;
  }
}

.username {
  text-transform: capitalize;
  font-weight: 800;
  font-size: 1.1rem;
}

.edit-profile-button {
  min-width: 10rem;
  margin: 2rem 0rem;
  font-size: 0.8rem;
}

.user-image {
  margin: 1rem auto;
  min-width: 10rem;
  min-height: 10rem;
  border-radius: 50%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateY(-30%);

  h1 {
    font-size: 4em;
    color: white;
    text-transform: capitalize;
  }
}

.input {
  font-size: 1rem;
  height: 2.5rem;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 5px;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid grey;
}

.edit-buttons {
  margin: 0.7em 1em 1.5em 1em;
  button {
    margin: 0 1em;
    padding: 0.5em;
    background-color: black;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
  }
}

// .short-inputs {
//   display: flex;
//   align-items: baseline;
//   justify-content: space-between;
//   width: 20rem;

//   label {
//     width: 9rem;
//   }
// }
</style>
