import { axios } from 'hooks/worker'
import { IWeatherAPIRes } from 'types/weather.d'

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  appid: string
  lat: number
  lon: number
  units: string
}

// 37.494958, 126.844128
export const getWeatherApi = (params: Params) =>
  axios.get<IWeatherAPIRes>(`${WEATHER_BASE_URL}/forecast`, {
    params,
  })
