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