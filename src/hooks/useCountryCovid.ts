import { getCountryCovidDataApi } from 'services/api'
import useSWR from 'swr'

const useCountryCovid = () => {
  const fetcher = async () => {
    try {
      const response = await getCountryCovidDataApi()
      return response.data[0]
    } catch (error) {
      throw new Error(error.message)
    }
  }
  const hookData = useSWR(
    '/Country/Covid',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    })

  return {
    ...hookData
  }
}

export default useCountryCovid
