import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentention/controllers/signUp/signUp'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/useCases/add-acount/db-add-account'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const addAccountMongo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountMongo)
  const signUpController = new SignUpController(emailValidator, addAccount)
  return signUpController
}
