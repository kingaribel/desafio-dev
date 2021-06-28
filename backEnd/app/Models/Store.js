'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Store extends Model {
  static findAll({ search }) {
    const defaultColumns = ['stores.id', 'store_name', 'owner_name'];
    const subQuery = Database.select(...defaultColumns, Database.raw(`
    (select sum(amount) from transactions
    inner join transaction_types as trxTypes on trxTypes.id = transactions.transaction_type_id
    where transactions.store_id = stores.id and operation = '+') as credit,
    (select sum(amount) from transactions
    inner join transaction_types as trxTypes on trxTypes.id = transactions.transaction_type_id
    where transactions.store_id = stores.id and operation = '-') as debit`))
      .from('stores')
      .innerJoin('store_owners as owners', 'owners.id', 'stores.owner_id');

    return Database.select(...defaultColumns, Database.raw('(IF(credit is null, 0, credit) - IF(debit is null, 0, debit)) as balance')).from(Database.raw(`(${subQuery}) as stores`))
      .select('stores.id', 'store_name', 'owner_name')
      .where((q) => {
        if (search) {
          q.where("store_name", "like", `%${search}%`);
          q.orWhere("owner_name", "like", `%${search}%`);
        }
      })
      .orderBy("store_name");
  }
}

module.exports = Store
