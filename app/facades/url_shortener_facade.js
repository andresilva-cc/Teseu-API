const NodeURLShortener = require('node-url-shortener')

/** URL Shortener Facade */
class URLShortenerFacade {
  
  /**
   * Shorten an URL
   *
   * @static
   * @param {string} url - The URL to shorten
   * @returns {string} The shortened URL
   * @memberof URLShortenerFacade
   */
  static shorten (url) {
    return new Promise((resolve, reject) => {
      NodeURLShortener.short(url, (err, shortenedURL) => {
        if (!err) {
          resolve(shortenedURL)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = URLShortenerFacade