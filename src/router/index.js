import { createRouter, createWebHistory } from 'vue-router'

// Page view files (add about here or other page views)
import HomeView from '../views/HomeView.vue'
// import SellProduct from '../views/SellProduct.vue'
import UserProfileProducts from '../views/UserProfileProducts.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ProductDetails from '../views/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/ProductDetails/:id',
      name: 'ProductDetails',
      props: true,
      component: ProductDetails
    },
    {
      path: '/sell',
      name: 'UserProfileProducts',
      component: UserProfileProducts
    },
    {
      path: '/profile',
      name: 'UserProfileProducts',
      component: UserProfileProducts
    },
    {
      path: '/:catchAll(.*)*',
      name: "PageNotFound",
      component: PageNotFound,
    },
  ]
})

export default router
