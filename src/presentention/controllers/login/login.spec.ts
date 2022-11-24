import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator } from '../signUp/signUp-protocols'
import { SignInController } from './login'

describe('Login Controller', () => {
  interface ISut {
    sut: SignInController
    emailValidatorStub: EmailValidator
  }
  const makeEmailValidator = (): EmailValidator => {
    class FakeEmailValidator implements EmailValidator{
      isValid (email: string): boolean{
        return true
      }
    }
    return new FakeEmailValidator()
  }

  const makeSut = (): ISut => {
    const fakeEmailValidator = makeEmailValidator()
    return {
      sut: new SignInController(fakeEmailValidator),
      emailValidatorStub: fakeEmailValidator
    }
  }
  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const fakeAccount = {
      body: {
        email: '',
        password: 'valid_password'
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })
  test('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    const fakeAccount = {
      body: {
        email: 'email@gmail.com',
        password: ''
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })
  test('should call email validator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidator = jest.spyOn(emailValidatorStub, 'isValid')
    const fakeAccount = {
      body: {
        email: 'valid_email@gmail.com',
        password: 'valid_password'
      }

    }
    await sut.handle(fakeAccount)
    expect(emailValidator).toHaveBeenCalledWith(fakeAccount.body.email)
  })

  test('should return 400 if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const fakeAccount = {
      body: {
        email: 'invalid email',
        password: 'valid_password'
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  test('should return 500 if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const fakeAccount = {
      body: {
        email: 'valid_email@gmail.com',
        password: 'valid_password'
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(500)
  })
})
