import express from 'express'
import { listNotification } from '../controllers/typescript/NotificationController'
import { listService } from '../controllers/typescript/ServiceController'
import { checkTokenUser }  from '../middleware/check_middleware'
import { createConnection, GetAccessToken, listConnection } from '../controllers/typescript/ConnectionController'
import { login, register, confirmRegister, changePassword, changeProfile, resetPassword, getUserProfile } from '../controllers/typescript/UserController'
const router = express.Router()

const utils_middleware = require('../middleware/utils_middleware')
const logging_middleware = require('../middleware/logging_middleware')

/* eslint no-undef: "off" */
router.get<any, any>(
  '/services',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  listService
)
router.post<any, any>(
  '/user/login',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult
  ],
  login
)
router.post<any, any>(
  '/user/register',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  register
)
router.post<any, any>(
  '/user/register-confirm',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  confirmRegister
)
router.put<any, any>(
  '/user/change-password',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  changePassword
)
router.post<any, any>(
  '/user/reset-password',
  [
    logging_middleware.loggingRequest,
    utils_middleware.handleValidationResult,
  ],
  resetPassword
)
router.get<any, any>(
  '/me/profile',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  getUserProfile
)
router.put<any, any>(
  '/user/change-profile',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  changeProfile
)
router.post<any, any>(
  '/connection',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  createConnection
)
router.get<any, any>(
  '/me/connection/',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  listConnection
)
router.get<any, any>(
  '/me/connection/:service_code/token',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  GetAccessToken
)
router.post<any, any>(
  '/user/notification',
  [
    logging_middleware.loggingRequest,
    checkTokenUser,
    utils_middleware.handleValidationResult,
  ],
  listNotification
)


export { router }
