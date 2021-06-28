'use strict'

const BaseRepository = use("App/Repositories/BaseRepository");

class StoreController {
  constructor() {
    this.storeRep = new BaseRepository('Store');
  }

    index({ request, response }) {
      let { search, pagination } = request.all();
      return this.storeRep.list({ search, options: { pagination } })
        .then((stores) => {
          response.ok(stores)
        })
    }

    show({ response, params }) {
      let { storeId: store } = params;
      return this.storeRep.list({options: { store } })
        .then((store) => {
          response.ok(store[0])
        })
    }
  }

module.exports = StoreController
