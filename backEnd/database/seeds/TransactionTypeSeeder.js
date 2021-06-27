'use strict'

const TransactionType = use('App/Models/TransactionType')

class TransactionTypeSeeder {
  async run () {
    const availableTransactionTypes = [
      {
        description: 'Débito',
        operation: '+'
      },
      {
        description: 'Boleto',
        operation: '-'
      },
      {
        description: 'Financiamento',
        operation: '-'
      },
      {
        description: 'Crédito',
        operation: '+'
      },
      {
        description: 'Recebimento Empréstimo	',
        operation: '+'
      },
      {
        description: 'Vendas',
        operation: '+'
      },
      {
        description: 'Recebimento TED	',
        operation: '+'
      },
      {
        description: 'Recebimento DOC	',
        operation: '+'
      },
      {
        description: 'Aluguel',
        operation: '-'
      }
    ];

    return TransactionType.createMany(availableTransactionTypes);
  }
}

module.exports = TransactionTypeSeeder
