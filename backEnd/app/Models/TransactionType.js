'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransactionType extends Model {
  static findAll({ search }) {
    return this.query()
      .select('id', 'description', 'operation')
      .where((q) => {
        if (search) {
          q.where("description", "like", `%${search}%`);
        }
      })
      .orderBy("description");
  }
}

module.exports = TransactionType
