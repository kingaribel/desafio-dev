'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  constructor(message) {
    super(message)
    this.message = message
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    response.notFound(null, {
      message: this.message
    })
  }
}

module.exports = NotFoundException
