const createError = require('http-errors')
import express from 'express'
const log4js = require('log4js')
const cors = require('cors')

import { router } from './routers/Router'

const dotenv = require('dotenv')
dotenv.config()

const corsOptions: any = {} // eslint-disable prettier-ignore
var enableCors = process.env.ENABLE_CORS
if (enableCors + '' == 'true') {
  corsOptions.origin = '*' //Configures the Access-Control-Allow-Origin CORS header
  corsOptions.methods = '*' //Configures the Access-Control-Allow-Methods CORS header
  corsOptions.allowedHeaders = '*' //Configures the Access-Control-Allow-Headers CORS header
  corsOptions.exposedHeaders =
    'authorization, login_type_key, Content-Disposition, content-disposition' //Configures the Access-Control-Expose-Headers CORS header
  corsOptions.credentials = false //Configures the Access-Control-Allow-Credentials CORS header
  //corsOptions.maxAge = 5;                           //Configures the Access-Control-Max-Age CORS header
  corsOptions.preflightContinue = false //Pass the CORS preflight response to the next handler
  corsOptions.optionsSuccessStatus = 200 //Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
} else {
  corsOptions.exposedHeaders =
    'authorization, login_type_key, Content-Disposition, content-disposition'
}

const bodyParser = require('body-parser')
const appUtils = require('./utils/app-utils')
const app = (server: express.Express): express.Express => {
  server.use(bodyParser.json({ limit: '11mb' }))

  server.use(log4js.connectLogger(appUtils.httpLogger, { level: 'info' }))
  server.use(cors(corsOptions))
  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  //app.use(express.static('public')); //to access the files in public folder

  server.use('/api', router)

  // catch 404 and forward to error handler
  server.use(function (req: any, res: any, next: any) {
    appUtils.log(req)
    appUtils.info2File(`${req.url}開始`)
    next(createError(404))
    appUtils.info2File(`${req.url}終了`)
  })

  // error handler
  server.use(require('./middleware/error_middleware').all)
  return server
}

export default app
