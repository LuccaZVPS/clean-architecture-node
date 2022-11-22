import { AccountModel, AddAccountModel } from '../useCases/add-acount/db-add-account-protocols'

export interface AddAccountRepository{
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
