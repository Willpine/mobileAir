import { readFile, writeFile } from 'fs/promises'

let weatherCache = []
let cacheLoaded = false
const PATH_CACHE_FILE = './src/cache/WeatherCache.json'

export const setCitiesCacheDataService = async (cities) => {
  cities.map(city => {    
    const index = weatherCache.findIndex(i => i.id === city.id)
    const dataTime = new Date().getTime()
    
    // Caso já exista em cache apenas atualiza o time e o data, caso contrario insere como novo item no Array
    if (index >= 0) {
      weatherCache = weatherCache.map(i => i.id === city.id ? { ...city, dataTime } : i)
    } else {
      weatherCache.push({
        ...city,
        dataTime
      })
    }
  })

  if (cities.length > 0) await updateFileCacheService()
}

export const getCityByCacheService = (city) => {
  return weatherCache.find(i => i.id === city.id)
}

export const loadFileCacheService = async () => {
  if (cacheLoaded) return

  const fileContent = await readFile(PATH_CACHE_FILE)
  const cacheString = fileContent.toString()

  if (!cacheString || cacheString === '') {
    cacheLoaded = true
    return
  }

  weatherCache = JSON.parse(fileContent.toString())
  cacheLoaded = true
}

export const updateCacheDataTimeService = async () => {
  const fileContent = await readFile(PATH_CACHE_FILE)
  const cacheString = fileContent.toString()
  let weatherCacheUpdate = JSON.parse(cacheString)

  weatherCacheUpdate = weatherCacheUpdate
    .map(city => ({
      ...city,
      dataTime: new Date().getTime()
    }))

  await writeFile(PATH_CACHE_FILE, JSON.stringify(weatherCacheUpdate))
}

export const updateFileCacheService = async () => {
  await writeFile(PATH_CACHE_FILE, JSON.stringify(weatherCache))
}
