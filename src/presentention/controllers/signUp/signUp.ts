import { badRequest, created, internalError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors/index'
import { EmailValidator, httpRequest, httpResponse, Controller, AddAccount } from './signUp-protocols'
export class SignUpController implements Controller{
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount){
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields){
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const account = await this.addAccount.add({ email, name, password })

      return created({ ...account })
    } catch {
      return internalError()
    }
  }
}
