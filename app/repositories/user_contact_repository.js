const BaseRepository = require('./base_repository')
const UserContact = require('../models').UserContact

/**
 * User Contact repository
 *
 * @extends {BaseRepository}
 */
class UserContactRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof UserContactRepository
   */
  constructor () {
    super()
    this.model = UserContact
  }

  /**
   * Retrieves all user contacts by its ID
   *
   * @param {number} userId - User ID
   * @returns {Array} The user contacts
   * @memberof UserContactRepository
   */
  async findByUserId (userId) {
    try {
      const userContacts = await this.model.findAll({
        where: {
          userId
        }
      })
  
      return userContacts


    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserContactRepository