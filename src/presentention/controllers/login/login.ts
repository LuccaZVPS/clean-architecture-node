import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, httpRequest, httpResponse } from '../../protocols/index'
export class SignInController implements Controller{
  async handle (httpRequest: httpRequest): Promise<httpResponse>{
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return badRequest(new MissingParamError('password'))
    }
    return ok({ sucess: true })
  }
}
