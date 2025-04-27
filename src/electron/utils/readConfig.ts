import fs from 'node:fs/promises'
import { getConfigPath } from './pathResolver.js'

export const readConfig = async ():Promise<Config> => {
  const data = await fs.readFile(getConfigPath(),{
    'encoding':'utf-8'
  })
  return JSON.parse(data)
}

export const writeConfig = async (newConfig:Config) =>{
  const _conf = JSON.stringify(newConfig);
  await fs.writeFile(getConfigPath(),_conf)
} 




