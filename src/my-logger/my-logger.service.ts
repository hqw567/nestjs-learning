import { ConsoleLogger, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { promises as fsPromises } from 'fs'
import * as path from 'path'

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('zh-CN', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())}\t${entry}\n`

    try {
      const filePath = path.join(__dirname, '..', '..', 'logs', 'app.log')
      const dirPath = path.dirname(filePath)
      if (!fs.existsSync(dirPath)) {
        await fsPromises.mkdir(dirPath, { recursive: true })
      }

      const fileHandle = await fsPromises.open(filePath, 'a')

      await fileHandle.appendFile(formattedEntry, 'utf-8')

      await fileHandle.close()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`
    this.logToFile(entry)
    super.log(message, context)
  }

  error(message: any, trace: string) {
    const entry = `${trace}\t${message}`
    this.logToFile(entry)
    super.error(message, trace)
  }
}
