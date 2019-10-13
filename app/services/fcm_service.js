const axios = require('axios').default

/** FCM Service */
class FCMService {

  /**
   * Gets axios instance
   *
   * @static
   * @returns {Object} Axios instance
   * @memberof FCMService
   */
  static getAxiosInstance () {
    try {
      return axios.create({
        baseURL: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Authorization': `key=${process.env.FCM_SERVER_KEY}`
        }
      })
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Sends notification to user
   *
   * @static
   * @param {Object} notification - Notification data
   * @param {Object} data - Optional data to send
   * @param {string} to - Device token to send notification to
   * @returns {Object} FCM response
   * @memberof FCMService
   */
  static async send (notification, data, to) {
    try {
      return await this.getAxiosInstance().post('', {
        notification,
        data,
        to,
        priority: 'High'
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = FCMService