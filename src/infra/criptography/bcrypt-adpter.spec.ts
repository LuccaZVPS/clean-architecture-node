import bcryptjs from 'bcryptjs'

import { BcryptAdapter } from './bcrypt-adapter'
describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values ', async () => {
    const sut = new BcryptAdapter()
    const encrypter = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')
    expect(encrypter).toHaveBeenCalledWith('any_value', expect.anything())
  })
})
