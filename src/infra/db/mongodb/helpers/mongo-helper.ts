import { MongoClient, Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (url: string): Promise<void>{
    this.client = await MongoClient.connect(url)
  },

  async disconnect () {
    await this.client.close()
  },
  getCollection (name: string): Collection{
    return this.client.db().collection(name)
  },
  map (account: any): AccountModel {
    const { _id, ...CollectionWhithoutId } = account
    return Object.assign({}, CollectionWhithoutId, { id: _id })
  }
}
