<template>
  <div class="profile-page-container">
    <div class="user-profile">
      <ProfileSection />
      <SellSection @showUsersData="loadAllData" />
    </div>

    <div class="user-listings">
      <div
        v-for="record in usersRecords"
        v-bind:key="record._id"
        class="records-loop"
      >
        <!-- Input rows to edit data  -->
        <div
          id="edit-inputs"
          v-if="editId == record._id"
        >
          <p>Artist</p>
          <input
            type="text"
            v-model.trim="editRecord.artistName"
            class="artist input long-input"
          />
          <p>Album</p>
          <input
            type="text"
            v-model.trim="editRecord.albumTitle"
            class="album input long-input"
          />
          <label for="albumCover"
            >Album Cover
            <input
              type="text"
              v-model.trim="editRecord.imageUrl"
              class="album-cover input long-input"
            />
          </label>
          <label for="label"
            >Label
            <input
              type="text"
              v-model.trim="editRecord.label"
              class="label input long-input"
            />
          </label>
          <div class="long-input">
            <div class="genres">
              <p>Genres</p>
              <div class="checkbox-dropdown-list input">
                <label
                  >ALternative
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Alternative"
                    name="genre"
                  />
                </label>
                <label
                  >Blues
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Blues"
                    name="genre"
                  />
                </label>
                <label
                  >Children's Music
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Children's Music"
                    name="genre"
                  />
                </label>
                <label
                  >Classical
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Classical"
                    name="genre"
                  />
                </label>
                <label
                  >Comedy
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Comedy"
                    name="genre"
                  />
                </label>
                <label
                  >Country
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Country"
                    name="genre"
                  />
                </label>
                <label
                  >Dance
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Dance"
                    name="genre"
                  />
                </label>
                <label
                  >EDM
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="EDM"
                    name="genre"
                  />
                </label>
                <label
                  >Easy Listening
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Easy Listening"
                    name="genre"
                  />
                </label>
                <label
                  >Electronic
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Electronic"
                    name="genre"
                  />
                </label>
                <label
                  >Hip-Hop
                  <input
                    v-model="listRecord.genre"
                    type="checkbox"
                    value="Hip-Hop"
                    name="genre"
                  />
                </label>
                <label
                  >Holiday
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Holiday"
                    name="genre"
                  />
                </label>
                <label
                  >Industrial
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Industrial"
                    name="genre"
                  />
                </label>
                <label
                  >Gospel
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Gospel"
                    name="genre"
                  />
                </label>
                <label
                  >J-Pop
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Gospel"
                    name="genre"
                  />
                </label>
                <label
                  >Jazz
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Jazz"
                    name="genre"
                  />
                </label>
                <label
                  >K-Pop
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="K-Pop"
                    name="genre"
                  />
                </label>
                <label
                  >Latino
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Latino"
                    name="genre"
                  />
                </label>
                <label
                  >New Age
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="New Age"
                    name="genre"
                  />
                </label>
                <label
                  >Opera
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Opera"
                    name="genre"
                  />
                </label>
                <label
                  >Pop
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Pop"
                    name="genre"
                  />
                </label>
                <label
                  >R&B
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="R&B"
                    name="genre"
                  />
                </label>
                <label
                  >Soul
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Soul"
                    name="genre"
                  />
                </label>
                <label
                  >Reggae
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Reggae"
                    name="genre"
                  />
                </label>
                <label
                  >Rock
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="Rock"
                    name="genre"
                  />
                </label>
                <label
                  >World
                  <input
                    v-model="editRecord.genre"
                    type="checkbox"
                    value="World"
                    name="genre"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="short-inputs">
            <label for="year"
              >Release Year
              <input
                type="text"
                v-model.trim="editRecord.yearReleased"
                id="year"
                class="year input short-input"
            /></label>
            <label for="price"
              >Asking Price
              <input
                type="text"
                v-model.trim="editRecord.price"
                id="price"
                placeholder="$"
                class="price input short-input"
            /></label>
          </div>
          <p>Description</p>
          <textarea
            type="text-area"
            v-model.trim="editRecord.albumDescription"
            class="description input long-input"
          ></textarea>
          <div class="lengths-div">
            <label for="lp"
              >LP
              <input
                type="radio"
                v-model="editRecord.length"
                value="lp"
                id="lp"
                name="length"
                class="length"
            /></label>
            <label for="ep"
              >EP
              <input
                type="radio"
                v-model="editRecord.length"
                value="ep"
                id="ep"
                name="length"
                class="length"
            /></label>
            <div class="edit-buttons confirm-btn">
              <button
                class="edit"
                @click="updateDoc(record._id)"
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
        </div>
        <!-- end of edit values -->

        <!-- start of display values -->
        <div
          v-else
          class="displayed-values-container"
        >
          <img
            :src="record.imageUrl"
            alt="Record cover"
          />

          <div class="listing-product-details">
            <h2 class="record-album">{{ record.albumTitle }}</h2>

            <div class="title-description">
              <h4 class="column-1">ARTIST</h4>
              <p class="record-artist">{{ record.artistName }}</p>
            </div>

            <div class="title-description">
              <h4 class="column-1">RELEASED</h4>
              <p class="record-year">{{ record.yearReleased }}</p>
            </div>

            <div class="title-description">
              <h4 class="column-1">GENRE</h4>
              <p
                v-show="record.genre != ''"
                class="record-genre"
              >
                {{ record.genre.join(', ') }}
              </p>
            </div>

            <div class="title-description">
              <h4 class="column-1">FORMAT</h4>
              <p class="record-length">{{ record.length }}</p>
            </div>

            <div class="title-description">
              <p>
                {{ record.albumDescription }}
              </p>
            </div>

            <div class="price-button-wrapper">
              <h3 class="record-price">${{ record.price }}</h3>

              <div class="listing-edit-buttons">
                <button
                  class="delete-btn"
                  @click="deleteDoc(record._id)"
                >
                  DELETE
                </button>
                <button
                  class="edit-btn"
                  @click="getRecordData(record._id)"
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- end of display values-->
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSection from '../components/ProfileSection.vue'
import SellSection from '../components/SellSection.vue'
import Swal from 'sweetalert2'
const productApi = 'https://vc-products.netlify.app/.netlify/functions/api/'

export default {
  name: 'UserProfileProducts',
  props: [],
  components: {
    ProfileSection,
    SellSection,
  },
  data() {
    return {
      usersRecords: [],
      postsData: [],
      postsLoading: true,
      loading: true,
      uploadedImage: '',
      editId: '',
      id: '',
      listRecord: {
        albumDescription: '',
        albumTitle: '',
        artistName: '',
        genre: [],
        imageUrl: '',
        label: '',
        length: '',
        price: '',
        yearReleased: '',
        loggedUser: '',
        loggedUserId: '',
        productId: '',
      },
      editRecord: {
        albumDescription: '',
        albumTitle: '',
        artistName: '',
        genre: [],
        imageUrl: '',
        label: '',
        length: '',
        price: '',
        yearReleased: '',
      },
    }
  },
  methods: {
    loadAllData() {
      fetch(productApi)
        .then(response => response.json())
        .then(data => {
          this.usersRecords = data
          if (localStorage.userId) {
            let postData = []
            data.forEach(element => {
              this.listRecord.productId = element._id
              if (localStorage.userId == element.loggedUserId) {
                postData.push(element)
              }
            })
            this.usersRecords = postData
          }
          // set posts data
          data.forEach(element => {
            this.postsData[element._id] = element
          })
        })
        .catch(err => {
          if (err) throw err
        })
    },
    deleteDoc(id) {
      // done
      Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          fetch(productApi + id, {
            method: 'DELETE',
          })
            .then(response => response.text())
            .then(data => {
              this.loadAllData()
              console.log(data)
            })
            .catch(err => {
              if (err) throw err
            })
          Swal.fire('Deleted!', 'Record has been deleted.', 'success', {
            icon: 'success',
          })
        } else {
          Swal.fire('Fail!', 'Fail to delete record.', 'error')
        }
      })
    },
    getRecordData(id) {
      // done
      this.id = id
      fetch(productApi + id, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.editId = data._id
          this.editRecord.albumDescription = data.albumDescription
          this.editRecord.albumTitle = data.albumTitle
          this.editRecord.artistName = data.artistName
          this.editRecord.genre = data.genre
          this.editRecord.imageUrl = data.imageUrl
          this.editRecord.length = data.length
          this.editRecord.price = data.price
          this.editRecord.yearReleased = data.yearReleased
        })
        .catch(err => {
          if (err) throw err
        })
    },
    updateDoc(id) {
      Swal.fire({
        text: 'Your record was updated',
        icon: 'success',
        confirmButtonText: 'Rock n roll',
      })
      fetch(productApi + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editRecord),
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
          console.log(this.editRecord)
          this.editId = ''
          this.editRecord.albumDescription = ''
          this.editRecord.albumTitle = ''
          this.editRecord.artistName = ''
          this.editRecord.genre = ''
          this.editRecord.imageUrl = ''
          this.editRecord.length = ''
          this.editRecord.price = ''
          this.editRecord.yearReleased = ''
          this.loadAllData()
        })
        .catch(err => {
          if (err) throw err
        })
    },
    onCancel() {
      this.editId = ''
      this.editRecord.artistName = ''
      this.editRecord.albumTitle = ''
      this.editRecord.albumDescription = ''
      this.editRecord.genre = ''
      this.editRecord.imageUrl = ''
      this.editRecord.label = ''
      this.editRecord.length = ''
      this.editRecord.price = ''
      this.editRecord.yearReleased = ''
    },
    addProductId() {
      this.listRecord.productId = element._id
    },
  },
  mounted() {
    this.listRecord.loggedUser = localStorage.loggedUser
    this.listRecord.loggedUserId = localStorage.userId
    this.loadAllData()
  },
}
</script>

<style lang="scss" scoped>
.profile-page-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 2rem 0rem;
}

.user-listings {
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 1rem;
  height: auto;
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

  .price {
    text-align: right;
  }
}

.short-inputs {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}

.genres {
  display: flex;
  flex-direction: column;
}

.checkbox-dropdown-list {
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 6rem;

  label {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}

.short-input {
  width: 10rem;
}

.lengths-div {
  display: flex;
  justify-content: space-between;
  width: 20%;
  margin-bottom: 1rem;
}

input[type='radio'] {
  cursor: pointer;
  appearance: none;
  background-color: #fff;
  margin: 0.5rem 1rem 1rem 0;
  font: inherit;
  color: black;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  transform: translateY(0.1em);
  display: grid;
  place-content: center;
}

input[type='radio']:hover {
  border: 2px solid grey;
}

input[type='radio']:checked {
  border: 1px solid black;
}

input[type='radio']::before {
  content: '';
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50px;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 2rem 2rem;
}

input[type='radio']:checked::before {
  transform: scale(1);
  color: black;
}

//Users listings:
.displayed-values-container {
  display: flex;
  width: 100%;
  min-height: 280px;
  margin: 0px 20px 40px 20px;

  img {
    height: 280px;
    width: 280px;
    object-fit: cover;
    margin: 0rem 1rem 3rem 0rem;
  }

  .listing-product-details {
    display: flex;
    flex-direction: column;
    max-height: 280px;
    width: 60%;

    h2 {
      margin-bottom: 10px;
    }

    .title-description {
      display: flex;
      flex-direction: row;
      margin: 10px 0px 10px 0px;

      h4,
      p {
        font-size: 0.8rem;
      }

      .record-artist {
        font-style: italic;
        font-weight: 800;
      }

      .record-length {
        text-transform: uppercase;
      }
    }
  }

  .column-1 {
    min-width: 100px;
    display: flex;
  }

  .price-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;

    .listing-edit-buttons {
      display: flex;
      align-items: flex-end;

      .delete-btn {
        height: 22px;
        width: 115px;
        margin: 5px;
        background-color: white;
        color: red;
        border: 1px solid red;
        font-size: 0.8em;
        cursor: pointer;
        transition: border-color 0.25s;
      }

      .edit-btn {
        height: 22px;
        width: 115px;
        margin: 5px;
        background-color: black;
        color: white;
        border: none;
        font-size: 0.8em;
        cursor: pointer;
        transition: border-color 0.25s;
      }
    }
  }
}
</style>
