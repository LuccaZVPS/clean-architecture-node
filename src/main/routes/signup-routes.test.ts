import Request from 'supertest'
import app from '../config/app'
describe('SignUp route', () => {
  test('should return an account on sucess ', async () => {
    await (await Request(app).post('/api/signup').send({
      name: 'Lucca',
      email: 'luccazavarize@gmail.com',
      password: '16062002',
      passwordConfirmation: '16062002'
    }).expect(200))
  })
})
