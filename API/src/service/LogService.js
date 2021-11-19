import { readFile, writeFile } from 'fs/promises'

let logs = []
let logLoaded = false
const PATH_LOG_FILE = './src/log/logs.json'

export const setLogService = async (log) => {
  logs.push(log)
  await updateFileLogsService()
}

export const loadFileLogsService = async () => {
  try {      
    if (logLoaded) return

    const fileContent = await readFile(PATH_LOG_FILE)
    const logString = fileContent.toString()

    if (!logString || logString === '') {
      logLoaded = true
      return
    }

    logs = JSON.parse(logString)
    logLoaded = true
  } catch (error) {
    console.log('Erro ao carregar arquivo de log:', error.message)
  }
}


export const updateFileLogsService = async () => {
  try {
    await writeFile(PATH_LOG_FILE, JSON.stringify(logs))    
  } catch (error) {
    console.log('Erro ao gravar arquivo de log:', error.message)
  }
}