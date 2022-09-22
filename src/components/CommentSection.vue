<template>
  <div class="comments-section-container">
    <!-- Left side comment submit section [START] -->
    <div class="comments-form-container">
      <form
        class="review-form"
        @submit.prevent="onSubmit"
      >
        <h4>Post a Comment</h4>
        <textarea
          id="review"
          v-model="commentFormValues.commentMsg"
          placeholder="Your comment here..."
          name="type-comment"
          :maxlength="maxChar"
          cols="60"
          rows="13"
        ></textarea>
        <div>
          <span
            v-if="commentFormValues.commentMsg.length != max"
            class="max-char"
            >Character count: {{ commentFormValues.commentMsg.length }} / {{ maxChar }}
          </span>
          <span
            v-if="commentFormValues.commentMsg && commentFormValues.commentMsg.length == maxChar"
            class="max-char-reached max-char"
          >
            Character limit reached</span
          >
        </div>
        <div class="button-container">
          <input
            type="submit"
            class="button"
            value="Submit Comment"
          />
        </div>
      </form>
    </div>
    <!-- Left side comment submit section [END] -->

    <!-- Right side dispaly comments [START] -->
    <div class="comments-list-container">
      <div
        v-for="comment in userPosts"
        :key="comment._id"
        class="records-loop"
      >
        <div class="user-comment-container">
          <div class="profile-circle-container">
            <span
              class="profile-circle"
              :style="{ background: comment.userGradient }"
              >{{ comment.userName.charAt(0) }}</span
            >
          </div>
          <div class="user-comment">
            <h4>{{ comment.userName }}</h4>
            <p>{{ comment.commentMsg }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Right side display comments [END] -->
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { inject } from 'vue'
const usersApi = 'https://vc-users-login.netlify.app/.netlify/functions/api/'
const commentsApi = 'https://vc-comments.netlify.app/.netlify/functions/api'

export default {
  name: 'CommentsForm',
  setup() {
    const store = inject('store')
    return {
      store,
    }
  },
  data() {
    return {
      name: '',
      review: '',
      users: [],
      userPosts: [],
      comments: [],
      maxChar: 300,
      commentFormValues: {
        commentMsg: '',
        productPostId: '',
        userGradient: '',
        userName: '',
        userId: '',
      },

      loggedUser: '',
      loggedInUser: true,
    }
  },
  methods: {
    onSubmit() {
      this.commentFormValues.productPostId = this.store.state.product_id
      this.commentFormValues.userGradient = this.store.state.user_gradient

      if (this.commentFormValues.commentMsg === '') {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a comment before submitting',
        })
        return
      }

      // done
      fetch(commentsApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.commentFormValues),
      })
        .then(response => response.text())
        .then(data => {
          this.getAllComments()
          this.resetData()
          console.log(data)
        })
        .catch(err => {
          if (err) throw err
        })
    },
    getAllComments() {
      fetch(commentsApi)
        .then(response => response.json())
        .then(data => {
          this.comments = data
          // get user posts
          if (localStorage.userId) {
            let postData = []
            this.comments.forEach(element => {
              // console.log(element)
              if (this.store.state.product_id == element.productPostId) {
                postData.push(element)
              }
            })
            this.userPosts = postData
          }
        })
        .catch(err => {
          if (err) throw err
        })
    },
    resetData() {
      this.commentFormValues.commentMsg = ''
    },
  },

  mounted() {
    // set user_id
    if (localStorage.userId) {
      this.commentFormValues.userName = localStorage.loggedUser
      this.commentFormValues.userId = localStorage.userId
    }
    this.getAllComments()
  },
}
</script>

<style scoped lang="scss">
.comments-section-container {
  display: flex;
  width: 100%;
}

.comments-form-container {
  display: flex;

  .review-form {
    display: flex;
    flex-direction: column;
    height: 280px;
  }

  h4 {
    margin-bottom: 10px;
  }

  input {
    border: 1px solid;
    padding: 5px;
    margin-bottom: 5px;
  }

  textarea {
    resize: none;
    font-family: inherit;
    padding: 5px;
    border: 1px solid;
  }

  .max-char {
    color: grey;
  }
  .ammend-comment,
  .max-char-reached {
    color: red;
  }
}

.button-container {
  display: flex;
  justify-content: right;
  .button {
    height: 44px;
    width: 224px;
    margin-top: 10px;
    background-color: black;
    color: white;
    border: none;
    font-size: 1.1em;
    cursor: pointer;
    transition: border-color 0.25s;
  }
}
.comments-list-container {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 280px;
  width: 100%;
  margin-left: 20px;

  .user-comment-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    .profile-circle-container {
      display: flex;
      align-items: center;
    }

    .profile-circle {
      height: 60px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #000000;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
    }

    .user-comment {
      display: flex;
      flex-direction: column;
      margin: 10px 10px 0px 10px;
      border-bottom: 1px solid;
      width: 100%;
    }

    p {
      min-height: 60px;
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
}

//Scrollbar styling
::-webkit-scrollbar {
  width: 13px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fffdeb;
  outline: 1px solid;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #000000;
  max-height: 38px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(115, 115, 115);
}

.profile-circle {
  height: 30px;
  width: 30px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.max-char {
  color: grey;
}

.ammend-comment,
.max-char-reached {
  color: red;
}
</style>
