import axios from 'axios'

var baseUrl = 'http://localhost:3000'
export const getAllLists = params => { return axios.get(`${baseUrl}/api/getAllList`) }
export const addItem = params => { return axios.post(`${baseUrl}/api/addItem`, params).then(res => res.data) }
export const updateItem = params => { return axios.post(`${baseUrl}/api/updateItem`, params).then(res => res.data) }
export const deleteItem = params => { return axios.post(`${baseUrl}/api/deleteItem`, params).then(res => res.data) }
