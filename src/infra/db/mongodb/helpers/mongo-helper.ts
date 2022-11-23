import { MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (url: string): Promise<MongoClient>{
    return await MongoClient.connect(process.env.MONGO_URL as string)
  },

  async disconnect () {
    await this.client.close()
  }
}
