const jwt = require('jsonwebtoken')
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
      jwt.verify(token, process.env.AUTH_SECRET, { audience }, (err, decoded) => {
        
        // If valid, set req.user and continue
        if (!err) {
          req.user = decoded
          return next()

        // If not valid, send error response
        } else {
          const exception = ExceptionFormatter.format(err)
          return res.status(exception.code).send(exception.error)
        }
      })

    // If not supplied, send error response
    } else {
      const exception = ExceptionFormatter.format({ name: 'UnauthorizedError' })
      return res.status(exception.code).send(exception.error)
    }
  }
}