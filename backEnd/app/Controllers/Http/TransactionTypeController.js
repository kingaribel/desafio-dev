'use strict'

const BaseRepository = use("App/Repositories/BaseRepository");

class TransactionTypeController {
  constructor() {
    this.transactionTypeRep = new BaseRepository('TransactionType');
  }
  index({ request, response }) {

    const { search, pagination } = request.all();
    return this.transactionTypeRep.list({ search, options: { pagination } })
      .then((transactionsTypes) => {
        response.ok(transactionsTypes)
      })
  }
}

module.exports = TransactionTypeController
