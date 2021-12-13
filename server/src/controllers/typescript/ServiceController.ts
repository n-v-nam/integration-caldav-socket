import { Request, Response } from 'express'

const app = require('../../utils/app-utils')

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
          .status(500)
          .send(new ResponseData<ListServiceResponse>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(500)
      .send(new ResponseData<ListServiceResponse>(false, err.message, null))
  }
}


export { listService }
