import axios from "axios";

const api = 'https://vc-products.netlify.app/.netlify/functions/api/'

const apiClient = axios.create({
  baseURL: api,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getDatas () {
    // return apiClient.get('/products')
    return apiClient.get()
  },
  getData (id) {
    return apiClient.get(id)
  }
}