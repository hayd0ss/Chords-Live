<template>
  <div class="view">
    <ProductContainer />
  </div>
</template>

<script>
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
