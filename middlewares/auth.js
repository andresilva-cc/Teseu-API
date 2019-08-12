const JWTFacade = require('../app/facades/jwt_facade')
const ExceptionFormatter = require('../app/utils/exception_formatter')

/**
 * Verifies JWT token
 *
 * @param {string} audience - Audience to check
 * @returns {*}
 */
module.exports = audience => {
  return function (req, res, next) {
    // Checks if token is supplied
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

      // Get token without "Bearer"
      const token = req.headers.authorization.split(' ')[1]

      // Verify the token with the respective audience
      try {
        // If valid, set req.user and continue
        const decode = JWTFacade.verify(token, audience)
        req.user = decode
        return next()
        
      } catch (ex) {
        const exception = ExceptionFormatter.format(ex)
        return res.status(exception.code).send(exception.error)
      }

    // If not supplied, send error response
    } else {
      const exception = ExceptionFormatter.format({ name: 'UnauthorizedError' })
      return res.status(exception.code).send(exception.error)
    }
  }
}