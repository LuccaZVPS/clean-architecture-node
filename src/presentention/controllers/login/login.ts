import { Authentication } from '../../../domain/useCases/authentication'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, internalError, ok, unauthorized } from '../../helpers/http-helper'
import { Controller, httpRequest, httpResponse } from '../../protocols/index'
import { EmailValidator } from '../signUp/signUp-protocols'
export class SignInController implements Controller{
  constructor (private readonly emailValidator: EmailValidator, private readonly authentication: Authentication){}
  async handle (httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const fields = ['email', 'password']
      for (const field of fields){
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const validEmal = this.emailValidator.isValid(httpRequest.body.email)
      if (!validEmal) {
        return badRequest(new InvalidParamError('email'))
      }
      const token = await this.authentication.auth(httpRequest.body)
      if (!token) {
        return unauthorized(new UnauthorizedError('Invalid credentials'))
      }
      return ok({ sucess: true })
    } catch {
      return internalError()
    }
  }
}
