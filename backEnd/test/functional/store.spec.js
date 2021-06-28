'use strict'

const { test, trait } = use('Test/Suite')('Stores')
const StoreOwner = use('App/Models/StoreOwner')
const Store = use('App/Models/Store')

trait('Test/ApiClient')

test('get list of registered stores', async ({ client }) => {
  const createdOwner = await StoreOwner.create({
    owner_name: 'Evandro'
  });

  await Store.create({
    owner_id: createdOwner.id,
    store_name: 'Loja da PM'
  });

  const response = await client
    .get('/stores')
    .end()
  response.assertStatus(200);

  response.assertJSONSubset({
    data: [{
      store_name: "Loja da PM",
      owner_name: "Evandro",
    }]
  })
})

test('show store details with its actual balance', async ({ client }) => {
  const response = await client
    .get('/stores/1')
    .end()
  response.assertStatus(200);

  response.assertJSONSubset({
    data: {
      store_name: "Loja da PM",
      owner_name: "Evandro",
    }
  })
})
