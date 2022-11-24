import { Express } from 'express'
import json from './middlewares/body-parser'
import urlencoded from './middlewares/url-encoded'
export default (app: Express): void => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
}
