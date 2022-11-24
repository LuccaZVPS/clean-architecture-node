import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
import { Controller, httpRequest, httpResponse } from '../../protocols/index'
import { EmailValidator } from '../signUp/signUp-protocols'
export class SignInController implements Controller{
  constructor (private readonly emailValidator: EmailValidator){}
  async handle (httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return badRequest(new MissingParamError('password'))
      }
      const validEmal = this.emailValidator.isValid(email)
      if (!validEmal) {
        return badRequest(new InvalidParamError('email'))
      }
      return ok({ sucess: true })
    } catch {
      return internalError()
    }
  }
}
