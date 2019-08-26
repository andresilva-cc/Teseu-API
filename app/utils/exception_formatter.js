const Helpers = require('./helpers')

/** Class to format exceptions to a standard format */
class ExceptionFormatter {
  
  /**
   * Formats an exception
   *
   * @static
   * @param {Object} ex - The exception to be formatted
   * @returns {Object} The formatted exception
   * @memberof ExceptionFormatter
   */
  static format (ex) {
    // Parse exception
    const exception = this.parse(ex)

    // If in development, add stack and exception name
    if (process.env.ENVIRONMENT === 'development') {
      exception.error.originalName = ex.name
      exception.error.stack = ex.stack
    }
    
    return exception
  }
  
  /**
   * Parses the exception name and builds the new error object
   *
   * @static
   * @param {*} ex - The exception to be parsed
   * @returns {Object} The formatted exception
   * @memberof ExceptionFormatter
   */
  static parse (ex) {
    switch (ex.name) {
      case 'InvalidRequestCodeError':
        return {
          code: 400,
          error: {
            name: 'InvalidRequestCodeError',
            message: 'Invalid Request Code',
            details: 'The provided request code is invalid or has already been verified.'
          }
        }
      
      case 'InvalidVerificationCodeError':
        return {
          code: 403,
          error: {
            name: 'InvalidVerificationCodeError',
            message: 'Invalid Code',
            details: 'The provided code is invalid.'
          }
        }

      case 'JsonWebTokenError':
        return {
          code: 403,
          error: {
            name: 'TokenError',
            message: 'Forbidden',
            details: 'The provided token is invalid or does not have access to the requested resource.'
          }
        }

      case 'SequelizeConnectionRefusedError':
        return {
          code: 503,
          error: {
            name: 'ServiceUnavailableError',
            message: 'Service Unavailable',
            details: 'The service is unavailable due to a database connection error. Try again later.'
          }
        }

      case 'SequelizeValidationError':
        return {
          code: 400,
          error: {
            name: 'ValidationError',
            message: 'Validation Error',
            details: Helpers.capitalizeFirstLetter(ex.errors[0].message),
            field: ex.errors[0].path,
            validator: ex.errors[0].validatorKey
          }
        }

      case 'SequelizeUniqueConstraintError':
        return {
          code: 400,
          error: {
            name: 'ValidationError',
            message: 'Validation Error',
            details: Helpers.capitalizeFirstLetter(ex.errors[0].message),
            field: ex.errors[0].path,
            validator: ex.errors[0].validatorKey
          }
        }

      case 'TooManyAttemptsError':
        return {
          code: 403,
          error: {
            name: 'TooManyAttemptsError',
            message: 'Too Many Attempts',
            details: 'Too many invalid attempts were made. The resource has expired.'
          }
        }
      
      case 'UnauthorizedError':
        return {
          code: 401,
          error: {
            name: 'UnauthorizedError',
            message: 'Unauthorized',
            details: 'No authorization token was found.'
          }
        }

      default:
        return {
          code: 500,
          error: {
            name: 'UnknownError',
            message: 'Unknown Error',
            details: 'An error occurred, but it could not be identified.'
          }
        }
    }
  }
}

module.exports = ExceptionFormatter