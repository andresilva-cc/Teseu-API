const nodemailer = require('nodemailer')

/** Email Service */
class EmailService {

  /**
   * Gets all categories
   *
   * @static
   * @returns {Array} List of categories
   * @memberof CategoryService
   */
  static createTransport () {
    try {
      return nodemailer.createTransport({
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        secureConnection: process.env.EMAIL_SMTP_SECURE,
        auth: {
          user: process.env.EMAIL_SMTP_USERNAME,
          pass: process.env.EMAIL_SMTP_PASSWORD
        }
      })

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new category
   *
   * @static
   * @param {Object} data - Category data to create
   * @returns {Object} The newly created category
   * @memberof CategoryService
   */
  static async sendToken (address, token) {
    try {
      return await this.createTransport().sendMail({
        from: '"Teseu" <andreluiz.97@outlook.com>',
        to: address,
        subject: 'Token da API Teseu',
        html: `
          Olá,
          <br><br>
          Obrigado pelo seu interesse na <b>API Teseu</b>. Abaixo encontra-se o <b>token</b> necessário para utilizar a API. Para saber mais sobre como utilizar a API, acesse a documentação disponível em: <a href="https://web.teseu.app/api-docs/">https://web.teseu.app/api-docs/</a>
          <br><br>
          ${token}
          <br><br>
          Caso não foi você que solicitou este token, pedimos que ignore este e-mail e exclua-o.
        `
      })
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = EmailService