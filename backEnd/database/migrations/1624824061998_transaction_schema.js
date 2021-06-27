'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('transaction_type_id').unsigned().index().references('id').on('transaction_types').onDelete('cascade')
      table.date('date')
      table.time('hour')
      table.float('amount')
      table.string('cpf_benefited')
      table.string('card_number', 16)
      table.integer('store_id').unsigned().index().references('id').on('stores').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
