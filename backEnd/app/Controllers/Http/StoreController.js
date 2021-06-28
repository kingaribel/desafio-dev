'use strict'

const BaseRepository = use("App/Repositories/BaseRepository");

class StoreController {
  constructor() {
    this.storeRep = new BaseRepository('Store');
  }

    async index({ request, response, view }) {
      let { search, pagination } = request.all();
      return this.storeRep.list({ search, options: { pagination } })
        .then((stores) => {
          response.ok(stores)
        })
    }
  }

module.exports = StoreController
