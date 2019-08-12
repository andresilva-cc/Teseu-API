const jwt = require('jsonwebtoken')

/** JWT Facade */
class JWTFacade {

  /**
   * Signs a new JWT
   *
   * @static
   * @param {*} payload
   * @param {*} options
   * @memberof JWTFacade
   */
  static sign (payload, options) {
    jwt.sign(payload), process.env.AUTH_SECRET, options, (err, token) => {
      if (!err)
        return token
      else
        throw err
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
    jwt.verify(token, process.env.AUTH_SECRET, { audience }, (err, decoded) => {
      if (!err) {
        return decoded
      } else {
        throw err
      }
    })
  }  
}

module.exports = JWTFacade