'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to the APP' }
})

Route.get('transaction-types', 'TransactionTypeController.index');
