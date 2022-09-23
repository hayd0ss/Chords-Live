<template>
  <div
    class="search-div"
    v-show="searchValue"
  >
    <!-- Search results display [START] -->
    <div
      class="no-results"
      v-show="searchRes == null"
    >
      No Results
    </div>
    <input
      type="button"
      value="clear"
      class="button"
      @click="clearSearch"
    />
  </div>
  <!-- Search results display [END] -->

  <!-- Product card component [START] -->
  <div class="product-div">
    <div class="all-products">
      <ProductCard
        v-show="searchRes != null"
        v-for="vinyl in visibleRecords"
        :key="vinyl.id"
        :vinyls="vinyl"
        :visibleRecords="visibleRecords"
        :currentPage="currentPage"
      />
    </div>
    <!-- Product card component [END] -->

    <!-- Page select [START] -->
    <div class="page-control">
      <PaginationComp
        v-show="searchRes != null"
        :recordsArray="recordsArray"
        @page:update="updatePage"
        :currentPage="currentPage"
        :pageSize="pageSize"
      />
    </div>
    <!-- Page select [END] -->
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import ProductService from '../services/ProductService.js'
import PaginationComp from '../components/PaginationComp.vue'
import { inject } from 'vue'

export default {
  name: 'ProductContainer',
  setup() {
    const store = inject('store')
    return {
      store,
    }
  },
  data() {
    return {
      records: null,
      recordsArray: [],
      currentPage: 0,
      pageSize: 8,
      visibleRecords: null,
      searchValue: '',
      keyValue: 0,
      searchRes: '',
      search_value: '',
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
    // Function to split the products into pages
    updateVisibleRecords() {
      if (this.searchRes != null) {
        if (this.searchRes.length == 0) {
          this.visibleRecords = this.records.slice(
            this.currentPage * this.pageSize,
            this.currentPage * this.pageSize + this.pageSize,
          )
        } else if (this.searchRes.length != 0) {
          this.visibleRecords = this.searchRes.slice(
            this.currentPage * this.pageSize,
            this.currentPage * this.pageSize + this.pageSize,
          )
        }
        if (this.visibleRecords.length == 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1)
        }
      } else return
    },
    search() {
      this.searchRes = []
      let regEx = new RegExp(this.searchValue, 'gi')
      for (let i = 0; i < this.records.length; i++) {
        let haystack =
          this.records[i].artistName +
          this.records[i].albumTitle +
          this.records[i].albumTitle +
          this.records[i].yearReleased +
          this.records[i].length +
          this.records[i].genre
        var searchRes = haystack.match(regEx)
        if (searchRes != null) {
          this.searchRes.push(this.records[i])
        }
      }
      if (this.searchRes.length != 0) {
        this.updateVisibleRecords()
      } else this.searchRes = null
    },
    clearSearch() {
      this.searchRes = []
      this.searchValue = ''
      this.store.state.search_value = ''
      this.updateVisibleRecords()
    },
  },
  created() {
    // Gets products to services file
    ProductService.getDatas()
      .then(response => {
        this.records = response.data
        this.recordsArray = response.data
        this.visibleRecords = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  beforeUpdate() {
    this.updateVisibleRecords()
  },
  // Calling for the search value
  computed: {
    searchTerm() {
      return this.store.state.search_value
    },
  },
  // Passing the search value through
  watch: {
    searchTerm(newValue) {
      this.searchValue = newValue
      this.search()
    },
  },
}
</script>
<style lang="scss" scoped>
.search-div {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 10rem;
  justify-content: space-between;
  align-items: center;
}
.button {
  min-width: 5rem;
}

.no-results {
  font-size: 2rem;
  min-width: 5rem;
  margin-bottom: 1rem;
  color: red;
}

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
  column-gap: 1rem;
  grid-row: 1;
}

.page-control {
  margin: 0 auto;
}

@media only screen and (max-width: 1200px) {
  .all-products {
    grid-template-columns: auto auto;
    column-gap: 5rem;
  }
}

@media only screen and (min-width: 1600px) {
  .all-products {
    grid-template-columns: auto auto auto auto;
    column-gap: 2rem;
  }
}
</style>
