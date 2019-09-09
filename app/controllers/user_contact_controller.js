const UserContactService = require('../services/user_contact_service')
const UserContact = require('../repositories').UserContact
const Error = require('../utils/error')

/** User Contact Controller */
class UserContactController {

  /**
   * Gets user contacts
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserContactController
   */
  static async all (req, res, next) {
    try {
      const userId = req.user.id
      const userContacts = await UserContactService.all(userId)
      
      return res.status(200).send(userContacts)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates an user contact
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserContactController
   */
  static async create (req, res, next) {
    try {
      const userId = req.user.id
      const data = req.body

      data.userId = userId

      const userContact = await UserContactService.create(data, req.user)

      return res.status(201).send(userContact)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Deletes an user contact
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserContactController
   */
  static async delete (req, res, next) {
    try {
      const userId = req.user.id
      const id = req.params.id

      // Check if user is allowed to delete this contact
      const contact = await UserContact.findById(id)

      if (contact.userId != userId)
        throw new Error('ForbiddenError')

      const userContact = await UserContactService.delete(id)

      return res.status(200).send(userContact)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Revokes an user contact
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserContactController
   */
  static async revoke (req, res, next) {
    try {
      const token = req.params.token

      const result = await UserContactService.revoke(token)

      return res.status(200).send('A operação foi concluída com sucesso.<br>Você pode fechar esta página agora.')

    } catch (ex) {
      return res.send('O token fornecido é <b>inválido</b>.<br>Entre em contato com o suporte.')
    }
  }
}

module.exports = UserContactController