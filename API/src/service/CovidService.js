import { setLogService } from './LogService.js'

export const getCountryDataByCodeService = async () => {  
  try {
    await setLogService('[COVID API] Call external api')

    const covidResponse = await fetch(`https://covid-19-data.p.rapidapi.com/country/code?code=br`, {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
              'x-rapidapi-key': '6777926b91msh8ee258c9d832bd5p1ee37ajsn6e9314a7b96f'}
    })

    if (covidResponse.status === 429) {
      throw new Error('Excedeu o limite de consulta na Api de Covid.')
    }

    return await covidResponse.json();
    
  } catch (error) {
    await setLogService(`[ERROR] Erro ao consulta api de Covid: ${error.message}`)
  }
}