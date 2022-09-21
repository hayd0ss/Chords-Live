<template>
  <div class="product-div">
    <div class="all-products">
      <ProductCard
        v-for="vinyl in visibleRecords"
        :key="vinyl.id"
        :vinyls="vinyl"
        :visibleRecords="visibleRecords"
        :currentPage="currentPage"
      />
    </div>

    <div class="page-control">
      <PaginationComp
        :recordsArray="recordsArray"
        @page:update="updatePage"
        :currentPage="currentPage"
        :pageSize="pageSize"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import ProductService from '../services/ProductService.js'
// const api = 'https://vc-products.netlify.app/.netlify/functions/api/'
import PaginationComp from '../components/PaginationComp.vue'

export default {
  name: 'ProductContainer',
  // props: { vinyls: Object },
  methods: {},
  data() {
    return {
      records: null,
      recordsArray: [],
      currentPage: 0,
      pageSize: 8,
      visibleRecords: null,
    }
  },
  components: {
    ProductCard,
    PaginationComp,
  },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleRecords()
    },
    updateVisibleRecords() {
      this.visibleRecords = this.records.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize,
      )

      if (this.visibleRecords.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
  },
  updated() {
    // console.log(this.visibleRecords)
    // console.log(localStorage)
    this.updateVisibleRecords()
  },
  created() {
    ProductService.getDatas()
      .then(response => {
        // console.log(response.data)
        this.records = response.data
        this.recordsArray = response.data
        this.visibleRecords = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>
<style lang="scss" scoped>
.product-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.all-products {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-row: 1;
}

.page-control {
  margin: 0 auto;
}

@media only screen and (max-width: 1200px) {
  .product-container {
    grid-template-columns: auto auto;
    column-gap: 5rem;
  }
}

@media only screen and (min-width: 1500px) {
  .all-products {
    grid-template-columns: auto auto auto auto;
    column-gap: 2rem;
  }
}
</style>
