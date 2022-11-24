import request from 'supertest'
import app from '../app'
describe('Middlewares', () => {
  test('should read json requests ', async () => {
    app.post('/test-json', (req, res) => {
      res.send(req.body)
    })
    await request(app).post('/test-json').send({ name: 'lucca' }).expect({ name: 'lucca' })
  })
})
