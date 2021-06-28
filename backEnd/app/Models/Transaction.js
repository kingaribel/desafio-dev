'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {

  static findAll({ search }) {
    return this.query()
      .select(`${this.table}.id`, 'trxType.description', 'occurrency_date', 'amount', 'cpf_benefited', 'card_number', 'owner_name', 'store_name')
      .innerJoin('transaction_types as trxType', 'trxType.id', `${this.table}.transaction_type_id`)
      .innerJoin('stores', 'stores.id', `${this.table}.store_id`)
      .innerJoin('store_owners as owners', 'owners.id', 'stores.owner_id')
      .where((q) => {
        if (search) {
          q.where("owner_name", "like", `%${search}%`);
          q.orWhere("store_name", "like", `%${search}%`);
          q.orWhere("trxType.description", "like", `%${search}%`);
        }
      })
      .orderBy(`${this.table}.id`);
  }

}

module.exports = Transaction
