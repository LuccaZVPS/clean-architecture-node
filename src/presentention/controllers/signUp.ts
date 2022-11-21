import { badRequest, internalError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailValidator'
import { httpRequest, httpResponse } from '../protocols/http'
import { InvalidParamError, MissingParamError } from '../errors/index'

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
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return badRequest(new MissingParamError('a'))
    } catch {
      return internalError()
    }
  }
}
