import { axios } from 'hooks/worker'

const DATA_URL = 'https://raw.githubusercontent.com/jooeungen/coronaboard_kr/master/kr_daily.csv'

export const getCoronaRawDataApi = () => axios.get<string>(DATA_URL)
