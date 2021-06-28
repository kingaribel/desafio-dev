const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Response = use('Adonis/Src/Response')

  const responses = [
    { status: 200, name: 'ok', defaultMessage: null },
    { status: 201, name: 'created', defaultMessage: 'Informação criada!' },
    { status: 404, name: 'notFound', defaultMessage: 'Recurso não encontrado!' },
    { status: 500, name: 'internalServer', defaultMessage: 'Erro interno do servidor, contacte o administrador!' }
  ]

  responses.forEach((res) => {
    Response.macro(res.name, function (data, overrideDefaults = { status: null, message: null }) {
      this.status(overrideDefaults.status || res.status).json({
        status: [200, 201].includes(res.status) ? 'success' : 'error',
        code: res.status,
        message: overrideDefaults.message || res.defaultMessage,
        data
      })
    })
  })
})
