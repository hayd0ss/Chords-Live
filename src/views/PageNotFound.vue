<template>
  <div class="fault-page">
    <div class="fault-content">
      <h1>404 - This page does not exist</h1>
      <h2>Whoopsie something went wrong!</h2>
      <p><router-link to="/" class="top">🏠 Return home here</router-link> or wait {{ timerCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerCount: 10,
    }
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  created() {
    setTimeout(() => this.$router.push({ path: '/' }), 10000)
  },
}
</script>

<style lang="scss" scoped>
.fault-page {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fault-page h2 {
  text-align: center;
  padding: 20px;
}

.fault-page h1 {
  margin: auto 0;
  align-items: center;
  text-align: center;
  padding: 20px;
  font-size: clamp(1.5rem, 10vw, 4rem);
}

.fault-page p {
  margin: auto 0;
  align-items: center;
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
}
</style>
