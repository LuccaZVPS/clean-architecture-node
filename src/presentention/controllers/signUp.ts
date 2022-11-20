import { httpRequest, httpResponse } from '../protocols/http'

export class SignUpController{
  handle (httpRequest: httpRequest): httpResponse{
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param:name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param:name')
      }
    }

    return {
      statusCode: 200,
      body: new Error('Missing param:name')
    }
  }
}
