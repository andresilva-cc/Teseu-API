const BaseRepository = require('./base_repository')
const User = require('../models').User

/**
 * User repository
 *
 * @extends {BaseRepository}
 */
class UserRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof UserRepository
   */
  constructor () {
    super()
    this.model = User
  }

  /**
   * Retrieves a user by its phone number
   *
   * @param {string} phone Phone number
   * @returns {Object|null} The user if found, null if not
   * @memberof UserRepository
   */
  async findByPhone (phone) {
    try {
      const user = await this.model.findOne({
        where: {
          phone
        }
      })
  
      return user

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Checks if the username already exists
   *
   * @param {string} username The username to check
   * @returns {boolean}
   * @memberof UserRepository
   */
  async usernameExists (username) {
    const user = await this.model.findOne({
      where: {
        username
      }
    })

    return user !== null
  }
}

module.exports = UserRepository