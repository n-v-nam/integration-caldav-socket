import express from 'express'
import { listService, validate } from '../controllers/typescript/ServiceController'
import { createConnection, GetAccessToken, listConnection } from '../controllers/typescript/ConnectionController'
import { login } from '../controllers/typescript/UserController'
const router = express.Router()

const utils_middleware = require('../middleware/utils_middleware')
const logging_middleware = require('../middleware/logging_middleware')

/* eslint no-undef: "off" */
router.get<any, any>(
  '/services',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  listService
)
router.post<any, any>(
  '/user/login',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  login
)
router.post<any, any>(
  '/connection',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  createConnection
)
router.get<any, any>(
  '/connection/:username',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  listConnection
)
router.get<any, any>(
  '/connection/:username/:service_code/token',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  GetAccessToken
)


export { router }
