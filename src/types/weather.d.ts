interface ICoord {
  lat: number
  lon: number
}

interface ICity {
  id: number
  name: string
  coord: ICoord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

interface IMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface IListItem {
  dt: number
  main: IMain
  weather: IWeather[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface IWeatherAPIRes {
  cod: string
  message: number
  cnt: number
  list: IListItem[]
  city: ICity
}
