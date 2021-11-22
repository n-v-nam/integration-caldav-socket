import { Request, Response } from 'express'

const { GENERIC_ERROR } = require('../../helpers/error_helper')

const app = require('../utils/app-utils')

const { check } = require('express-validator')

import { create, listConnections, show} from '../../repositories/ConnectionRepository'
import { ResponseData } from '../../responses/Response'
import { CreateConnectionRequest } from '@/src/domain/requests/connection/CreateConnectionRequest'
import { ListConnectionRequest } from '../../domain/requests/connection/ListConnectionRequest'
import { ListConectionResponse } from '../../domain/responses/connection/ListConectionResponse'
import { GetAccessTokenResponse } from '../../domain/responses/connection/GetAccessTokenResponse'

const listConnection = async (
  req: Request<ListConnectionRequest>,
  res: Response<ResponseData<ListConectionResponse>>
) => {
  try {
    return listConnections(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<ListConectionResponse>(true, null, data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(GENERIC_ERROR)
          .send(new ResponseData<ListConectionResponse>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(GENERIC_ERROR)
      .send(new ResponseData<ListConectionResponse>(false, err.message, null))
  }
}

const createConnection = async (
  req: Request<CreateConnectionRequest>,
  res: Response<ResponseData<any>>
) => {
  try {
    return create(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<CreateConnectionRequest>(true, 'Connected', data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(GENERIC_ERROR)
          .send(new ResponseData<CreateConnectionRequest>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(GENERIC_ERROR)
      .send(new ResponseData<CreateConnectionRequest>(false, err.message, null))
  }
}

const GetAccessToken = async (
  req: Request<any>,
  res: Response<ResponseData<GetAccessTokenResponse>>
) => {
  try {
    return show(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<GetAccessTokenResponse>(true, null, data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(GENERIC_ERROR)
          .send(new ResponseData<GetAccessTokenResponse>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(GENERIC_ERROR)
      .send(new ResponseData<GetAccessTokenResponse>(false, err.message, null))
  }
}

const validate = (method: string) => {
  switch (method) {
    case 'listService': {
      return [check('address', '住所は必須項目です').isLength({ min: 1, max: 50 })]
    }
  }
}

export { createConnection, listConnection, GetAccessToken, validate }
