import http from 'https'


export default class TelegramBot {
  
  #token
  #onUpdateCallback

  constructor (token) {
    this.#token = token
  }

  performMethod (methodName, payload) {
    return new Promise((resolve, reject) => {
      const url = `https://api.telegram.org/bot${this.#token}/${methodName}`
      const payloadJSON = JSON.stringify(payload)

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payloadJSON),
        },
      }

      const req = http.request(url, options, (res) => {
        let responseData = ''

        res.on('data', chunk => responseData += chunk)

        res.on('end', () => {
          try {
            const { ok, result } = JSON.parse(responseData)

            if (ok)
              return resolve(result)

            reject("NOT OK")
          } catch (error) {
            reject(error)
          }
        })
      })

      req.on('error', reject)

      req.write(payloadJSON)
      req.end()
    })
  }

  onUpdate (callback) {
    this.#onUpdateCallback = callback
  }

  startLongpollingSession (delay = 500) {
    let offset = 0

    const loop = async () => {
      try {
        const updates = await this.performMethod('getUpdates', { offset })

        if (updates?.length) {
          for (const update of updates) {
            this.#onUpdateCallback?.(update)
            offset = update.update_id + 1
          }
        }
      } catch (error) {
        console.error('Error in long-polling session:', error)
      }

      setTimeout(loop, delay)
    }

    loop()
  }
}
