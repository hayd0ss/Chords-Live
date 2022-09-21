<template>
  <div class="product-card-container">
    <router-link
      :to="{ name: 'ProductDetails', params: { id: vinyls._id } }"
      class="top"
    >
      <div class="product-card">
        <img
          :src="vinyls.imageUrl"
          alt="Record cover"
        />
        <div class="product-info">
          <div class="artist-div">
            <p class="artist">{{ vinyls.artistName }}</p>
          </div>
          <p class="album">{{ vinyls.albumTitle }}</p>
          <div class="genre">
            <span>{{ vinyls.genre.join(', ') }}</span>
          </div>
          <p class="length">{{ vinyls.length.toUpperCase() }}</p>
          <p class="year">{{ vinyls.year }}</p>
          <div class="more-info-div">
            <h3 class="price">${{ vinyls.price }}</h3>
            <button class="button more-info">
              <p>MORE INFO</p>
            </button>
          </div>
        </div>
      </div>
    </router-link>
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
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
// import { mdiAccount } from '@mdi/js'
import { mdiHeartOutline } from '@mdi/js'

export default {
  name: 'ProductCard',
  props: {
    vinyls: Object,
  },
  data() {
    return {
      path: mdiHeartOutline,
      uppercased: '',
    }
  },
  methods: {
    favourite() {
      event.target.classList.toggle('favourite')
    },
    onClickHandler() {
      console.log(page)
    },
  },
  components: {
    SvgIcon,
  },
}
</script>

<style lang="scss" scoped>
.product-card-container {
  margin-top: 1rem;
  margin: 0.5rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 29rem;
  min-width: 16rem;
}

.product-card-container:hover {
  border: 1px solid black;
  padding: 19px;
}

.product-card {
  cursor: pointer;
  height: 24rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 0.9rem;
    letter-spacing: 0px;
  }
}

.product-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-transform: capitalize;
}

.bi {
  margin-top: 0.8rem;
  align-self: flex-end;
  fill: black !important;
  transition: fill 0.5s ease;
}

.bi:hover {
  cursor: pointer;
}

.favourite {
  transition: 0.5s ease;
  fill: red !important;
}

a:hover {
  text-decoration: none;
}

img {
  margin-bottom: 0.8rem;
  width: 16rem;
}

.artist-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.artist {
  font-weight: 800;
  line-height: 1.2em;
}

.album {
  font-style: italic;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.genre {
  margin-bottom: 0.5rem;
}

.length {
  margin: 1rem 0;
}

.more-info-div {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
}

.price {
  font-weight: 800;
}

.more-info {
  min-width: 6rem;

  p {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
