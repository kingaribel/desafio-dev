'use strict'

const TransactionRepository = use("App/Repositories/TransactionRepository");

class TransactionController {
  constructor() {
    this.transactionRep = new TransactionRepository();
  }

  index({ request, response }) {

    let { search, pagination } = request.all();
    return this.transactionRep.list({ search, options: { pagination } })
      .then((transactions) => {
        response.ok(transactions)
      })
  }

  async store ({ request, response }) {
    const transactionFile = request.file('file');

    return this.transactionRep.importFromFile(transactionFile)
      .then(() => response.ok(null, {
        message: 'Transações Importadas Com Sucesso!'
      }));
  }

  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing transaction.
   * GET transactions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update transaction details.
   * PUT or PATCH transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a transaction with id.
   * DELETE transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TransactionController
