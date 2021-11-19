import express from 'express'
import nodeFetch from 'node-fetch'

import { getWeatherDataByLocationService } from './service/WeatherService.js'
import { getCountryDataByCodeService } from './service/CovidService.js'
import { loadFileLogsService, setLogService } from './service/LogService.js'
import { loadFileCacheService, updateCacheDataTimeService } from './service/CacheService.js'

globalThis.fetch = nodeFetch
const app = express()

app.use(express.json())

app.get('/Cities', async (req, resp) => {
  await setLogService('[Router] /Cities')
  const { latitude, longitude } = req.query
  const citiesData = await getWeatherDataByLocationService(latitude, longitude)

  if (!citiesData) resp.status(400).json({ message: 'Erro ao consultar dados!' })
  else resp.json(citiesData)
})

app.get('/Country/Covid', async (req, resp) => {
  await setLogService('[Router] /Country/Covid')
  const data = await getCountryDataByCodeService()

  if (!data) resp.status(400).json({ message: 'Erro ao consultar dados de Covid!' })
  else resp.json(data)
})

app.listen(5004, () => {
  console.log('Server running on port 5004')
  loadFileLogsService()
  updateCacheDataTimeService()
    .then(() => loadFileCacheService()
      .then(() => console.log('Cache Atualizado')))
})
