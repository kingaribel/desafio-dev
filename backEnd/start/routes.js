'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to the APP' }
})

Route.get('transaction-types', 'TransactionTypeController.index');
Route.get('transactions', 'TransactionController.index');
Route.get('stores', 'StoreController.index');
Route.get('stores/:storeId', 'StoreController.show');
Route.get('stores/:storeId/transactions', 'TransactionController.getStoreWithItsTransactions');
Route.post('transactions/upload-file', 'TransactionController.store');
