'use strict'

const BaseRepository = use("App/Repositories/BaseRepository");

class TransactionTypeController {
  constructor() {
    this.transactionRep = new BaseRepository('TransactionType');
  }
  index({ request, response }) {

    let { search, pagination } = request.all();
    return this.transactionRep.list({ search, options: { pagination } })
      .then((transactions) => {
        response.ok(transactions)
      })
  }
}

module.exports = TransactionTypeController
