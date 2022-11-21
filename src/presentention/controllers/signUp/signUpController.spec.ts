import { SignUpController } from './signUp'
import { EmailValidator, AccountModel, AddAccountModel, AddAccount } from './signUp-protocols'
import { ServerError, InvalidParamError, MissingParamError } from '../../errors/index'
interface SutTypes{
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount

}
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator{
    isValid (email: string): boolean{
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel{
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@gmail.com',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()

  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    emailValidatorStub,
    sut,
    addAccountStub
  }
}
describe('SignUp Controller', () => {
  test('Should return 400 if name is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if email is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if password is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if passwordConfirm is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'invalid_email@gmail.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if password is not equal to passwordConfirmation', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'invalid_email@gmail.com',
        passwordConfirmation: 'any_passwordd'

      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'anyEmail@gmail.com'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  test('Should return 500 if email validator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'anyEmail@gmail.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 400 if email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'any_Email'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call add account if correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'any_Email'
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      password: 'any_password',
      email: 'any_Email'

    })
  })
})
test('Should return 500 if addAccount throws', () => {
  const { sut, addAccountStub } = makeSut()
  jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
    throw new Error()
  })
  const httpRequest = {
    body: {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      email: 'anyEmail@gmail.com'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
  expect(httpResponse.body).toEqual(new ServerError())
})
test('Should return return 201 if valid data is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_password'
    }
  }
  const response = sut.handle(httpRequest)
  expect(response.statusCode).toBe(201)
  expect(response.body).toEqual(({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@gmail.com',
    password: 'valid_password'
  }))
})