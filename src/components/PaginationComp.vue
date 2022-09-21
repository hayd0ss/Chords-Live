<template>
  <div v-if="totalPages() > 0"
    class="pagination-wrapper">

    <span v-if="showPreviousLink()"
      class="pagination-btn"
      @click="updatePage(currentPage - 1)">
      <!-- prettier-ignore -->
      &#5176
    </span>
    <div class="page-number"> {{ currentPage + 1 }} of {{ totalPages() }}</div>

    <span v-if="showNextLink()"
      class="pagination-btn"
      @click="updatePage(currentPage + 1)">
      <!-- prettier-ignore -->
      &#5171
    </span>
  </div>
</template>

<script>
export default {
  name: 'PaginationComp',
  props: ['recordsArray', 'currentPage', 'pageSize'],
  data() {
    return {
      pageTotal: '',
    }
  },
  methods: {
    updatePage(pageNumber) {
      this.$emit('page:update', pageNumber)
    },
    totalPages() {
      return Math.ceil(this.recordsArray.length / this.pageSize)
    },
    showPreviousLink() {
      return this.currentPage == 0 ? false : true
    },
    showNextLink() {
      return this.currentPage == this.totalPages() - 1 ? false : true
    },
  }
}
</script>

<style>
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 4rem;
  text-align: right;
}

.pagination-btn {
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

.page-number {
  font-size: 1.1rem;
  display: flex;
  min-width: 3rem;
  max-width: 4rem;
}
</style>
