'use strict';
const BaseRepository = use('App/Repositories/BaseRepository');
const Helpers = use('Helpers')
const fs = require("fs");
const lineByLine = require('n-readlines');
const Database = use('Database');
const StoreOwner = use('App/Models/StoreOwner');
const Store = use('App/Models/Store');
const Transaction = use('App/Models/Transaction');
const InternalServerException = require("../Exceptions/InternalServerException");

class TransactionRepository extends BaseRepository {

  constructor() {
    super('Transaction');
    this.storeRep = new BaseRepository('Store');
  }

  correctDate(date, time) {
    const year = date.slice(0,4);
    const month = date.slice(4,6);
    const day = date.slice(6,8);

    const hour = time.slice(0,2);
    const minutes = time.slice(2,4);
    const seconds = time.slice(4,6);

    const lineDate = new Date(`${year}/${month}/${day} ${hour}:${minutes}:${seconds} GMT-0300`);
    return lineDate;
  }

  normalizeLine(line) {
    const transaction_type_id = line.slice(0, 1);
    const date = line.slice(1, 9);
    const amount = line.slice(9, 19);
    const cpf_benefited = line.slice(19, 30);
    const card_number = line.slice(30, 42);
    const time = line.slice(42, 48);
    const owner_name = line.slice(48, 62);
    const store_name = line.slice(62, 81);
    const normalizedAmount = +amount / 100.00;
    const occurrency_date = this.correctDate(date, time);
    return {
      transactionPayload: {
        occurrency_date,
        amount: normalizedAmount,
        cpf_benefited,
        card_number,
        transaction_type_id
      },
      owner_name,
      store_name
    };
  }

  async findOwner(owner_name, trx = null) {
    const foundOwner = await StoreOwner.findOrCreate({owner_name}, {owner_name}, trx);
    return foundOwner;
  }

  async findStore(payload, trx = null) {
    const foundStore = await Store.findOrCreate(payload, payload, trx);
    return foundStore;
  }

  async importFromFile(transactionFile) {

    const tmpFileName = `${new Date().getTime()}.${transactionFile.subtype}`;
    const tmpPath = Helpers.tmpPath('uploads');
    await transactionFile.move(tmpPath, {
      name: tmpFileName,
      overwrite: true
    });
    const tmpFullPath = `${tmpPath}/${tmpFileName}`;

    const trx = await Database.beginTransaction();
    try {
      const fileLiner = new lineByLine(tmpFullPath);
      let line;
      while (line = fileLiner.next()) {
        const lineConverted = line.toString();
        const { owner_name, store_name, transactionPayload } = this.normalizeLine(lineConverted);
        const foundOwner = await this.findOwner(owner_name.trim());
        const foundStore = await this.findStore({store_name: store_name.trim(), owner_id: foundOwner.id});

        await Transaction.create({
          ...transactionPayload,
          store_id: foundStore.id,
        })
      }

      await trx.commit();
      return;
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw new InternalServerException('Ocorreu um erro ao tentar importar este arquivo, tente mais tarde!');
    } finally {
      fs.unlinkSync(
        tmpFullPath
      );
    }
  }

  async getStoreWithItsTransactions(store) {
    const foundStore = await this.storeRep.list({options: { store } });
    const foundTransactions = await this.list({options: {store}});
    return {
      store: foundStore[0],
      transactions: foundTransactions
    }
  }
}

module.exports = TransactionRepository;
