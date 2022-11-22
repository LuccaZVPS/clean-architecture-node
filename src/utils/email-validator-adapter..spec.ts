import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  const sut = new EmailValidatorAdapter()
  test('Should return false if validator returns false', () => {
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })
})
