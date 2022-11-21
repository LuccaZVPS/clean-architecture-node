import { badRequest, internalError } from '../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../errors/index'
import { EmailValidator, httpRequest, httpResponse, Controller } from '../protocols/index'
export class SignUpController implements Controller{
  constructor (private readonly emailValidator: EmailValidator){
  }

  handle (httpRequest: httpRequest): httpResponse{
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields){
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      return badRequest(new MissingParamError('a'))
    } catch {
      return internalError()
    }
  }
}
