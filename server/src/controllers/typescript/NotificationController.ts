import { Request, Response } from 'express'

const app = require('../../utils/app-utils')

import { fetchAll } from '../../repositories/NotificationRepository'
import { ResponseData } from '../../responses/Response'
import { ListNotificationRequest } from '@/src/domain/requests/notify/ListNotificationRequest'
import { ListNotificationResponse} from '@/src/domain/responses/notify/ListNotificationResponse'

const listNotification = async (
  req: Request<ListNotificationRequest>,
  res: Response<ResponseData<ListNotificationResponse>>
) => {
  try {
    return fetchAll(req)
      .then(function (data: any) {
        return res.status(200).send(new ResponseData<ListNotificationResponse>(true, null, data))
      })
      .catch(function (error: any) {
        app.error(error)
        return res
          .status(500)
          .send(new ResponseData<ListNotificationResponse>(false, error.message, null))
      })
  } catch (err: any) {
    app.error(err)
    return res
      .status(500)
      .send(new ResponseData<ListNotificationResponse>(false, err.message, null))
  }
}


export { listNotification }