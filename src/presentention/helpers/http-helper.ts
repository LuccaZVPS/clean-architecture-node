import { ServerError } from '../errors/server-error'
import { httpResponse } from '../protocols/http'

export const badRequest = (error: Error): httpResponse => ({

  statusCode: 400,
  body: error

})
export const internalError = (): httpResponse => ({

  statusCode: 500,
  body: new ServerError()

})
export const created = (body: any): httpResponse => ({
  statusCode: 201,
  body
})
