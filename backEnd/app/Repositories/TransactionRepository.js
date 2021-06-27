'use strict';
const BaseRepository = use('App/Repositories/BaseRepository');

class TransactionRepository extends BaseRepository {

    constructor() {
        super('Transaction')
    }
}

module.exports = TransactionRepository;
