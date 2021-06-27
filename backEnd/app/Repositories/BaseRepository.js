"use strict";

const kleur = require("kleur");
const NotFoundException = use("App/Exceptions/NotFoundException");
const InternalServerException = use("App/Exceptions/InternalServerException");

class BaseRepository {
  constructor(model) {
    this.model = use(`App/Models/${model}`);
  }

  /**
   * @description create data in model
   * @param { object } modelData
   * @param { DatabaseTransaction | null } trx
   * @return { object }
   * @throws { InternalServerException }
   */
  async create(modelData, trx = null) {
    try {
      if (trx) {
        const createdRecordWithTransaction = await this.model.create(
          modelData,
          trx
        );
        return createdRecordWithTransaction;
      }

      const createdRecord = await this.model.create(modelData);
      return createdRecord;
    } catch (e){
      console.log(e)
      throw new InternalServerException(
        this.model.table  +
        ": Não foi possível criar este registo no momento, tente mais tarde!"
      );
    }
  }

  async list({ search, options }) {
    try {
      const records = this.model.findAll({
        search,
        options,
      });

      return options && options.pagination
        ? records.paginate(options.pagination.page, options.pagination.perPage)
        : records.fetch();
    } catch (e) {
      console.log(e)
      throw new InternalServerException(
        this.model.table  +
        ": Não é possível efectuar a listagem no momento, tente mais tarde!"
      );
    }
  }

  async findOneAbstract({ findValue, findBy = "id" }, callback = null) {
    const modelResponse = this.model
      .query()
      .where(this.model.table + "." + findBy, findValue)
      .clone();
    if (callback) {
      callback(modelResponse);
    }
    return modelResponse.first().catch((e) => {
      console.error(
        kleur.red(kleur.bold(`${this.model.table }(findOne): `) + e.message)
      );
      throw new NotFoundException(
        this.model.table  + ": Não Foi Possível Encontrar Este Registo!"
      );
    });
  }

  findOne(findValue, findBy) {
    return this.findOneAbstract({ findBy, findValue });
  }

  async update(modelId, modelData, findBy = "id", trx = null, callback = null) {
    try {
      const updatingModel = await this.findOne(modelId, findBy);
      if (!updatingModel) {
        throw new NotFoundException(
          this.model.table  + ": Não Foi Possível Encontrar Este Registo!"
        );
      }

      const oldValuesOfUpdatingModel = {...updatingModel.toJSON()};
      updatingModel.merge(modelData);
      if (trx) {
        await updatingModel.save(trx);
      } else {
        await updatingModel.save();
      }

      if (callback) {
        callback(updatingModel, oldValuesOfUpdatingModel);
      }
      return updatingModel;
    } catch (e) {
      if (e.name == "NotFoundException") throw new NotFoundException(e.message);
      throw new InternalServerException(
        this.model.table  +
        ": Não foi possível atualizar os dados, tente mais tarde!"
      );
    }
  }

  async destroy(modelId, findBy = 'id') {
    try {
      const affected = await this.findOne(modelId, findBy);
      if (!affected) {
        throw new NotFoundException(
          this.model.table  + ": Não Foi Possível Encontrar Este Registo!"
        );
      }
      affected.delete();
      return affected;
    } catch (e) {
      if (e.name == "NotFoundException") throw new NotFoundException(e.message);
      throw new InternalServerException(
        this.model.table  +
        ": Não Foi Possível Apagar Este Registo, te mais tarde!"
      );
    }
  }
}

module.exports = BaseRepository;
