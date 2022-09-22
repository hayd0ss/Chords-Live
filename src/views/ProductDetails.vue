<template>
  <!-- Product description display for the record [START] -->
  <div
    v-if="record"
    class="product-details-container"
  >
    <div class="record-image-wrapper">
      <img
        :src="record.imageUrl"
        alt="Record cover"
        class="record-image"
      />
    </div>

    <div class="product-details">
      <h1 class="record-album">{{ record.albumTitle }}</h1>

      <div class="product-titles">
        <h4 class="column-1">ARTIST</h4>
        <p class="record-artist column-2">{{ record.artistName }}</p>
      </div>

      <div class="product-titles">
        <h4 class="column-1">RELEASED</h4>
        <p class="record-year column-2">{{ record.yearReleased }}</p>
      </div>

      <div class="product-titles">
        <h4 class="column-1">GENRE</h4>
        <p
          v-show="record.genre != ''"
          class="record-genre"
        >
          {{ record.genre.join(', ') }}
        </p>
      </div>

      <div class="product-titles">
        <h4 class="column-1">FORMAT</h4>
        <p class="record-length column-2">{{ record.length }}</p>
      </div>

      <div>
        <p>
          {{ record.albumDescription }}
        </p>
      </div>

      <div class="icon-container">
        <svg
          @click="favourite"
          width="20"
          height="20"
          class="bi"
          viewBox="0 0 512 512"
        >
          <path
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </svg>
      </div>

      <div class="button-container">
        <div>
          <h2 class="record-price">${{ record.price }}.00</h2>
        </div>
        <button class="purchase">PURCHASE</button>
      </div>
    </div>
  </div>
  <!-- Product description display for the record [END] -->

  <!-- Comment display component [START] -->
  <div class="comment-section">
    <CommentSection />
  </div>
  <!-- Comment display component [END] -->
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHeartOutline } from '@mdi/js'
import ProductService from '../services/ProductService.js'
import store from '../store'
import CommentSection from '../components/CommentSection.vue'

// const commentsApi = 'https://vc-comments.netlify.app/.netlify/functions/api'

export default {
  props: ['id'],
  data() {
    return {
      record: null,
      path: mdiHeartOutline,
    }
  },
  components: {
    SvgIcon,
    CommentSection,
  },
  created() {
    ProductService.getData(this.id)
      .then(response => {
        // console.log(response.data);
        this.record = response.data
        // console.log(this.record)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    favourite() {
      event.target.classList.toggle('favourite')
    },
    onClickHandler() {
      console.log(page)
    },
  },
  mounted() {
    store.state.product_id = this.id
  },
}
</script>

<style lang="scss" scoped>
.product-details-container {
  display: flex;
  border-bottom: 1px solid;
  width: 100%;
  justify-content: space-between;

  .product-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    width: 60%;

    .column-1 {
      min-width: 100px;
      display: flex;
    }

    h1 {
      margin: 2rem 0rem;
    }

    .product-titles {
      display: flex;
      margin-bottom: 25px;

      h4 {
        margin-right: 0px;
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

  //image styling
  .record-image-wrapper {
    .record-image {
      height: 476px;
      margin: 2rem 2rem 2rem 0rem;
    }
  }

  .icon-container {
    display: flex;
    justify-content: right;
    align-items: flex-end;
    height: 100%;

    .bi:hover {
      cursor: pointer;
    }

    .favourite {
      transition: 0.5s ease;
      fill: red !important;
    }
  }

  //button styling - can be moved to main.scss
  .button-container {
    display: flex;
    min-height: 70px;
    justify-content: space-between;
    align-items: flex-end;

    button {
      height: 44px;
      width: 224px;
      margin: 5px;
      background-color: black;
      color: white;
      border: none;
      font-size: 1.1em;
      cursor: pointer;
      transition: border-color 0.25s;
    }
  }
}

.comment-section {
  display: flex;
  width: 100%;
  margin-top: 30px;
}
</style>
