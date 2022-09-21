<template>
  <div class="view">
    <ProductContainer />
  </div>
</template>

<script>
// const api = 'https://vc-products.netlify.app/.netlify/functions/api/'
import ProductContainer from '../components/ProductContainer.vue'

export default {
  name: 'HomeView',
  props: [],
  data() {
    return {}
  },

  components: {
    ProductContainer,
  },
}
</script>

<style lang="scss" scoped></style>
