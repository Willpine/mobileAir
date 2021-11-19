import cities from '../assets/cities.json'
import weatherCodes from '../assets/weatherCode.json'

import { getCityByCacheService, setCitiesCacheDataService } from './CacheService.js'
import { setLogService } from './LogService.js'

const COUT_NEXT_CACHE = 2

export const getWeatherDataByLocationService = async (latitude, longitude) => {
  try {
    const citiesResponse = []

    let countCacheNexted = 0
    await Promise.all(
      cities
        .filter(city => calculateDistanceService(city, { latitude, longitude }) <= 50)
        .map(city => ({
          id: city.codigo_ibge,
          name: city.nome,
          latitude: city.latitude,
          longitude: city.longitude
        }))
        .map(async city => {
          if (COUT_NEXT_CACHE <= countCacheNexted) {
            const cacheData = getCityByCacheService(city)
            if (cacheData && (new Date().getTime() - cacheData.dataTime) < 1800000) {
              await setLogService(`[CACHE USED] ${city.name} (${cacheData.dataTime})`)
              citiesResponse.push(cacheData)
              return
            }
          } else {
            countCacheNexted = countCacheNexted + 1
          }
          
          // console.log('[WEATHER API]')
          await setLogService(`[WEATHER API] ${city.name}`)
          const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=e0aae3749bd64614878102636212610`, {
            method: 'GET'
          })

          const weatherData = await weatherResponse.json()

          const cityData = {
            ...city,
            weatherCode: weatherData.current.condition.code,
            weatherTitle: weatherCodes.find(i => i.code === weatherData.current.condition.code)?.dia ?? weatherData.current.condition.text
          }

          citiesResponse.push(cityData)
        })
    )

    await setCitiesCacheDataService(citiesResponse.filter(i => !i.dataTime))
  
    return citiesResponse
  } catch (error) {
    await setLogService(`[ERROR] Get weather data error:  ${error.message}`)
    // console.log('[ERROR] Erro ao consultar Api:', error.message)
    return null
  }
}

export const calculateDistanceService = (from, to) => {
  const powLat = Math.pow(69.1 * (to.latitude - from.latitude), 2)
  const powLon = Math.pow(69.1 * (from.longitude - to.longitude) * Math.cos(to.latitude / 57.3), 2)

  return Math.sqrt(powLat + powLon)
}