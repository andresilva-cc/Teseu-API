const Helpers = require('./helpers')

/** Class to format errors to a standard format */
class ErrorFormatter {
  
  /**
   * Middleware for error handling
   *
   * @static
   * @param {Object} err - Errors
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof ErrorFormatter
   */
  static middleware (err, req, res, next) {
    if (!err)
      return next()

    const error = this.format(err)
    return res.status(error.code).send(error.error)
  }

  /**
   * Formats an error
   *
   * @static
   * @param {Object} e - The error to be formatted
   * @returns {Object} The formatted error
   * @memberof ErrorFormatter
   */
  static format (e) {
    // Parse error
    const formattedError = this.parse(e)

    // If in development, add stack and error name
    if (process.env.ENVIRONMENT === 'development') {
      if (e.name)
        formattedError.error.originalName = e.name
      if (e.stack)
        formattedError.error.stack = e.stack
    }
    
    return formattedError
  }
  
  /**
   * Parses the error name and builds the new error object
   *
   * @static
   * @param {*} e - The error to be parsed
   * @returns {Object} The formatted error
   * @memberof ErrorFormatter
   */
  static parse (e) {
    switch (e.name) {
      case 'BadRequestError':
        return {
          code: 400,
          error: {
            name: 'BadRequestError',
            message: 'Bad Request',
            details: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).'
          }
        }

      case 'EmergencyModeAlreadyEnabledError':
        return {
          code: 400,
          error: {
            name: 'EmergencyModeAlreadyEnabledError',
            message: 'Emergency Mode Already Enabled',
            details: 'The emergency mode is already enabled.'
          }
        }

      case 'EmergencyModeNotEnabledError':
        return {
          code: 400,
          error: {
            name: 'EmergencyModeNotEnabledError',
            message: 'Emergency Mode Not Enabled',
            details: 'The emergency mode is not enabled.'
          }
        }

      case 'ForbiddenError':
        return {
          code: 403,
          error: {
            name: 'ForbiddenError',
            message: 'Forbidden',
            details: 'The provided token does not have access to the requested resource.'
          }
        }

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

      case 'ResourceNotFoundError':
        return {
          code: 404,
          error: {
            name: 'ResourceNotFoundError',
            message: 'Resource Not Found',
            details: 'The requested resource was not found or does not exist.'
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

      case 'SequelizeForeignKeyConstraintError':
        return {
          code: 400,
          error: {
            name: 'ForeignKeyConstraintError',
            message: 'Foreign Key Constraint Error',
            details: 'The provided data violates a foreign key constraint.'
          }
        }

      case 'SequelizeValidationError':
        return {
          code: 400,
          error: {
            name: 'ValidationError',
            message: 'Validation Error',
            details: Helpers.capitalizeFirstLetter(e.errors[0].message),
            field: e.errors[0].path,
            validator: e.errors[0].validatorKey
          }
        }

      case 'SequelizeUniqueConstraintError':
        return {
          code: 400,
          error: {
            name: 'ValidationError',
            message: 'Validation Error',
            details: Helpers.capitalizeFirstLetter(e.errors[0].message),
            field: e.errors[0].path,
            validator: e.errors[0].validatorKey
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
      
      case 'UserNotFoundError':
        return {
          code: 404,
          error: {
            name: 'UserNotFoundError',
            message: 'User Not Found',
            details: 'Could not find any user with this username or phone number '
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

module.exports = ErrorFormatter