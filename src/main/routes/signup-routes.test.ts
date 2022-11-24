import Request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return an account on sucess ', async () => {
    await (await Request(app).post('/api/signup').send({
      name: 'Lucca',
      email: 'luccazavarize@gmail.com',
      password: '16062002',
      passwordConfirmation: '16062002'
    }).expect(201))
  })
})
