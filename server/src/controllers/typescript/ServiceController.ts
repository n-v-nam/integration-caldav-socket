import { Request, Response } from 'express'

const { GENERIC_ERROR } = require('../../helpers/error_helper')

const app = require('../../utils/app-utils')

const { check } = require('express-validator')

import { fetchAll } from '../../repositories/ServiceRepository'
import { ResponseData } from '../../responses/Response'
import { ListServiceRequest } from '@/src/domain/requests/service/ListServiceRequest'
import { ListServiceResponse } from '@/src/domain/responses/service/ListServiceResponse'

const listService = async (
  req: Request<ListServiceRequest>,
  res: Response<ResponseData<ListServiceResponse>>
) => {
  try {
    return fetchAll(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<ListServiceResponse>(true, null, data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(GENERIC_ERROR)
          .send(new ResponseData<ListServiceResponse>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(GENERIC_ERROR)
      .send(new ResponseData<ListServiceResponse>(false, err.message, null))
  }
}

const validate = (method: string) => {
  switch (method) {
    case 'listService': {
      return [check('address', '住所は必須項目です').isLength({ min: 1, max: 50 })]
    }
  }
}

export { listService, validate }
