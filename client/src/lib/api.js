import axios from 'axios'
import { getToken } from './auth.js'

const baseUrl = '/api'


export function getItems() {
  return axios.get(`${baseUrl}/items`)
}

export function getSingleItem(id) {
  return axios.get(`${baseUrl}/items/${id}`)
}

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export function deleteComment(id, commentId) {
  return axios.delete(`/api/items/${id}/comments/${commentId}`, headers())
}

export function getUserInfo() {
  return axios.get('/api/userprofile', headers())
} 
