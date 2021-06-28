'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to the APP' }
})

Route.get('transaction-types', 'TransactionTypeController.index');
Route.get('transactions', 'TransactionController.index');
Route.get('stores', 'StoreController.index');
Route.post('transactions/upload-file', 'TransactionController.store');
