import fs from 'fs';

interface JsonData {
  [key: string]: any;
}

class ManageJsonFile {
  constructor() {}

  public readAJSONFile(path: string): Promise<JsonData[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject(new Error(`File not found: ${path}`));
          } else {
            reject(err);
          }
        } else {
          try {
            const jsonData = JSON.parse(data) as JsonData[];
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`Invalid JSON format in file: ${path}`));
          }
        }
      })
    })
  }
  public writeAJSONFile(path: string, data: JsonData) {
    return new Promise<void>((resolve, reject) => {
      const stringifyData = JSON.stringify(data, null, 2)
      fs.writeFile(path, stringifyData, 'utf-8', (err) => {
        if (err) {
          reject(new Error(`Error writing to file: ${path}`));
        } else {
          resolve();
        }
      })
    })
  }
}

export default new ManageJsonFile()