import { axios } from 'hooks/worker'
import { IWeatherAPIRes } from 'types/weather.d'

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  lat: number
  lon: number
}

// 37.494958, 126.844128
export const getWeatherForecast5DaysApi = (params: Params) =>
  axios.get<IWeatherAPIRes>(`${WEATHER_BASE_URL}/forecast`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
    },
  })

// 아래 코드는 돈 내고 쓰라 해서 안씀
export const getWeatherForecast16DaysApi = (params: Params) =>
  axios.get<IWeatherAPIRes>(`${WEATHER_BASE_URL}/forecast/daily`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
    },
  })
