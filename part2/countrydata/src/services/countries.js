import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const getCountry = (name) => {
  return axios
    .get(`${baseUrl}/name/${name}`)
    .then(response => response.data)
}


export default { getAll, getCountry }