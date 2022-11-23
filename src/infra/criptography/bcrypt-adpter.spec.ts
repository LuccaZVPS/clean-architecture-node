import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter()
  return sut
}
jest.mock('bcryptjs', () => ({
  async hash (): Promise<string>{
    return await new Promise(resolve => resolve('hash'))
  }
}))
describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values ', async () => {
    const sut = makeSut()
    const encrypter = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')
    expect(encrypter).toHaveBeenCalledWith('any_value', expect.anything())
  })
  test('should return a hashed password ', async () => {
    const sut = makeSut()
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toEqual('hash')
  })
})
