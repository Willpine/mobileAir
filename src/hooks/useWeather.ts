import { getCitiesDataApi } from 'services/api'
import { PositionProps } from 'services/types'
import useSWR from 'swr'

const useWeather = (region: PositionProps) => {
  const fetcher = async () => {
    const response = await getCitiesDataApi(region)
    return response.data
  }
  const { data, ...hookData } = useSWR(
    `/CitiesWeather/${region.latitude}/${region.longitude}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    })

  return {
    data: data ?? [],
    ...hookData
  }
}

export default useWeather
