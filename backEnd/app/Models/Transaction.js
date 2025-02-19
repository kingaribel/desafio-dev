'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {

  static findAll({ search, options }) {
    return this.query()
      .select(`${this.table}.id`, 'trxType.description as transaction_type', 'occurrency_date', 'amount', 'cpf_benefited', 'card_number', 'owner_name', 'store_name')
      .innerJoin('transaction_types as trxType', 'trxType.id', `${this.table}.transaction_type_id`)
      .innerJoin('stores', 'stores.id', `${this.table}.store_id`)
      .innerJoin('store_owners as owners', 'owners.id', 'stores.owner_id')
      .where((q) => {
        if (search) {
          q.where("owner_name", "like", `%${search}%`);
          q.orWhere("store_name", "like", `%${search}%`);
          q.orWhere("trxType.description", "like", `%${search}%`);
        }
        if(options) {
          if(options.store) {
            q.where('stores.id', options.store)
          }
          if(options.transactionsId && options.transactionsId.length) {
            q.whereIn(`${this.table}.id`, options.transactionsId)
          }
        }
      })
      .orderBy(`${this.table}.id`);
  }

}

module.exports = Transaction
