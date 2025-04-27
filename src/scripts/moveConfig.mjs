import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import process, { stderr } from 'node:process';

const TS_CONFIG_PATH = 'src/electron/tsconfig.json';
const CONFIG_PATH = 'src/electron/config.json';
const OUT_DIR = 'dist-electron'
// 这些字段写在tsconfig


const getTsConfig = () => {
  // const res = await fs.readFile(TS_CONFIG_PATH, {
  //   encoding: 'utf-8'
  // });
  // const obj = JSON.parse(res);
  exec('tsc --project src/electron/tsconfig.json', (error,stdout,stderr) => {
    if (error) {
      console.error(`执行错误: ${error.message}`);
      console.error(`标准错误输出: ${stderr}`);
      return;
    }
  });
};

const moveConfig = async () => {
  if (!OUT_DIR) {
    console.error('ERROR:为获取正确路径');
  }
  const targetFile = OUT_DIR +'/config.json'

  // 同步两个文件的变化
  if(fs.access(targetFile)) {
    const data = await fs.readFile(targetFile)
    await fs.writeFile(CONFIG_PATH, data)
  } else {
    const data = await fs.readFile(CONFIG_PATH)
    await fs.writeFile(targetFile, data)
  }
};



getTsConfig();
await moveConfig();
