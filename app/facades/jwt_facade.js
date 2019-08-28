const jwt = require('jsonwebtoken')

/** JWT Facade */
class JWTFacade {

  /**
   * Signs a new JWT
   *
   * @static
   * @param {*} payload
   * @param {Object} options
   * @memberof JWTFacade
   */
  static async sign (payload, options) {
    try {
      return await jwt.sign(payload, process.env.AUTH_SECRET, options)
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Verifies a JWT
   *
   * @static
   * @param {string} token Token to verify
   * @param {string} audience Audience to check against
   * @memberof JWTFacade
   */
  static verify (token, audience) {
    try {
      return jwt.verify(token, process.env.AUTH_SECRET, { audience })

    } catch (ex) {
      throw ex
    }
  }  
}

module.exports = JWTFacade