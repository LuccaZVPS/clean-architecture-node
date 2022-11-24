import { SignInController } from './login'

describe('Login Controller', () => {
  test('should return 400 if email is not provided', async () => {
    const sut = new SignInController()
    const fakeAccount = {
      body: {
        email: '',
        password: 'valid_password'
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(400)
  })
  test('should return 400 if password is not provided', async () => {
    const sut = new SignInController()
    const fakeAccount = {
      body: {
        email: 'email@gmail.com',
        password: ''
      }

    }
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(400)
  })
})
