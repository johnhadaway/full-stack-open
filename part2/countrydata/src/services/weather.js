// use OpenWeatherMap API to get weather data
// https://openweathermap.org/api

import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (capital) => {
  return axios
    .get(`${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
}

export default { getWeather }