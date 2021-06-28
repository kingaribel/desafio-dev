'use strict'

const { test, trait } = use('Test/Suite')('Transactions')
const StoreOwner = use('App/Models/StoreOwner')
const Store = use('App/Models/Store')
const Helpers = use('Helpers')

trait('Test/ApiClient')

test('import transactions details from file', async ({ client }) => {

  const response = await client
    .post('/transactions/upload-file')
    .attach('file', Helpers.tmpPath('test/CNAB.txt'))
    .end();
  response.assertStatus(200);
})

test('list imported transactions', async ({ client }) => {
  const response = await client
    .get('/transactions')
    .end()

  response.assertStatus(200);

  response.assertJSONSubset({
    data: [{
      "cpf_benefited": "09620676017",
      "card_number": "4753****3153",
      "owner_name": "JOÃO MACEDO",
      "store_name": "BAR DO JOÃO"
    }]
  })
})



test('list imported transactions by store with actual balance', async ({ client }) => {
  const response = await client
    .get('/stores/1/transactions')
    .end()
  response.assertStatus(200);
})
