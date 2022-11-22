import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount{
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository){}
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const correctUser = { ...accountData }
    correctUser.password = hashedPassword
    await this.addAccountRepository.add(correctUser)
    return await new Promise(resolve => resolve({ email: '', id: '', name: '', password: '' }))
  };
}
