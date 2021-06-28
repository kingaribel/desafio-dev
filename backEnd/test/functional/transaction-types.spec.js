'use strict'

const { test, trait } = use('Test/Suite')('Transaction Types')

trait('Test/ApiClient')

test('get list of available transaction types', async ({ client }) => {
  const response = await client
    .get('/transaction-types')
    .end()

    response.assertStatus(200)

    response.assertJSONSubset({
      data: [
        {
          description: 'Financiamento',
          operation: '-'
        }
      ]
    })
})
