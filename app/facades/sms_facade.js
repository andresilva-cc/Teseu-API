const Nexmo = require('nexmo')
const util = require('util')

/** SMS Facade */
class SMSFacade {
  
  /**
   * Gets a new Nexmo instance
   *
   * @static
   * @returns {Object} Nexmo instance
   * @memberof SMSFacade
   */
  static getInstance () {
    return new Nexmo({
      apiKey: process.env.NEXMO_KEY,
      apiSecret: process.env.NEXMO_SECRET
    })
  }

  /**
   * Makes a new request
   *
   * @static
   * @param {string} number Number to send the request
   * @memberof SMSFacade
   */
  static request (number) {
    return new Promise((resolve, reject) => {
      this.getInstance().verify.request({
        number,
        brand: 'Teseu',
        code_length: 6
      }, (err, result) => {
        if (!err)
          resolve(result)
        else
          reject(err)
      })
    })
  }

  /**
   * Checks a request
   *
   * @static
   * @param {string} request Request ID
   * @param {string} code Code
   * @memberof SMSFacade
   */
  static check (request, code) {
    return new Promise((resolve, reject) => {
      this.getInstance().verify.check({
        request_id: request,
        code
      }, (err, result) => {
        if (!err)
          resolve(result)
        else
          reject(err)
      })
    })
  }

  /**
   * Cancels a request
   *
   * @static
   * @param {string} request Request ID
   * @memberof SMSFacade
   */
  static cancel (request) {
    return new Promise((resolve, reject) => {
      this.getInstance().verify.control({
        request_id: request,
        cmd: 'cancel'
      }, (err, result) => {
        if (!err)
          resolve(result)
        else
          reject(result)
      })
    })
  }
}

module.exports = SMSFacade