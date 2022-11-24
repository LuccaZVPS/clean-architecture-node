import { Express } from 'express'
import json from './middlewares/body-parser'
import urlencoded from './middlewares/url-encoded'
import { cors } from './middlewares/cors'
export default (app: Express): void => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(cors)
}
