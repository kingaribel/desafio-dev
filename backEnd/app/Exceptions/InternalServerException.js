'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InternalServerException extends LogicalException {
  constructor(message) {
    super(message)
    this.message = message
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    response.internalServer(null, {
      message: this.message
    })
  }
}

module.exports = InternalServerException
