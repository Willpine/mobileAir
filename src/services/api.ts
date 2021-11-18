import axios from 'axios'

import { CityProps, CountryCovidProps, PositionProps } from './types'

const HttpBase = axios.create({
  baseURL: 'http://192.168.0.103:5004'
})

export const getCitiesDataApi = async (region: PositionProps) =>
  await HttpBase.get<CityProps[]>('/Cities', { params: region })

export const getCountryCovidDataApi = async () =>
  await HttpBase.get<CountryCovidProps[]>('/Country/Covid')
