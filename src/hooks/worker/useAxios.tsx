/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxios, { configure } from './useAxiosCore'
import { instance, plainInstance as plainAxios, CancelToken, isCancel } from 'utils/axios'

configure({ axios: instance })

const useAxiosInstance = (config: any, options: any = {}) => useAxios(config, options)

export type { AxiosError, AxiosResponse } from 'axios'
export { useAxiosInstance as useAxios, instance, plainAxios, CancelToken, isCancel }
