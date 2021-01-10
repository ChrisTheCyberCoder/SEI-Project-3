import axios from 'axios'

const baseUrl = '/api'


export function getItems() {
  return axios.get(`${baseUrl}/items`)
}

export function getSingleItem(id) {
  return axios.get(`${baseUrl}/items/${id}`)
}


