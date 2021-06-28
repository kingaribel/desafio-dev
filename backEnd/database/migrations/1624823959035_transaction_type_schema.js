'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionTypeSchema extends Schema {
  up () {
    this.create('transaction_types', (table) => {
      table.increments()
      table.string('description', 23)
      table.string('operation', 1)
      table.timestamps()
    })
  }

  down () {
    this.drop('transaction_types')
  }
}

module.exports = TransactionTypeSchema
