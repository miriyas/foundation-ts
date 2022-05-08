import { CloudIcon, RainIcon } from 'assets/svgs/weather'

export const getWeatherIcon = (desc: string) => {
  let weatherIconName = RainIcon
  switch (desc) {
    case 'Clouds':
      weatherIconName = CloudIcon
      break
    default:
      break
  }

  return weatherIconName
}
