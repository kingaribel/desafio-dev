'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreOwnerSchema extends Schema {
  up () {
    this.create('store_owners', (table) => {
      table.increments()
      table.string('owner_name')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_owners')
  }
}

module.exports = StoreOwnerSchema
