import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { OptionalId } from 'mongodb'
export class AccountMongoRepository implements AddAccountRepository{
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const user = await accountCollection.insertOne(accountData as unknown as OptionalId<Document>)
    return { ...accountData, id: user.insertedId } as unknown as AccountModel
  }
}
