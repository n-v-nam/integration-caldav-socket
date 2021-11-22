import { Request, Response } from 'express'

const { GENERIC_ERROR } = require('../../helpers/error_helper')

const app = require('../../utils/app-utils')

const { check } = require('express-validator')

import { handleLogin } from '../../repositories/UserRepository'
import { ResponseData } from '../../responses/Response'
import { LoginRequest } from '@/src/domain/requests/user/LoginRequest'
import { LoginResponse } from '@/src/domain/responses/user/LoginResponse'

const login = async (
  req: Request<LoginRequest>,
  res: Response<ResponseData<LoginResponse>>
) => {
  try {
    return handleLogin(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<LoginResponse>(true, 'Login Success', data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(GENERIC_ERROR)
          .send(new ResponseData<LoginResponse>(false, 'Error', null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(GENERIC_ERROR)
      .send(new ResponseData<LoginResponse>(false, 'Error', null))
  }
}

const validate = (method: string) => {
  switch (method) {
    case 'listService': {
      return [check('address', '住所は必須項目です').isLength({ min: 1, max: 50 })]
    }
  }
}

export { login, validate }