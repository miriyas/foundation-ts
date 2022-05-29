import { axios } from 'hooks/worker'

const DATA_URL = 'https://im.diningcode.com/API/isearch/'

export const getMapDataApi = () =>
  axios.post<string>(DATA_URL, {
    query: '코다리',
  })
