import request from 'supertest'
import app from '../app'
describe('Middlewares', () => {
  test('should read json requests ', async () => {
    app.get('/test-json', (req, res) => {
      res.send()
    })
    await request(app).get('/test-json').expect('acess-control-allow-origin', '*').expect('acess-control-allow-methods', '*').expect('acess-control-allow-headers', '*')
  })
})
