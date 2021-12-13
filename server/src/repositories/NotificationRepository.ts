import { Request } from 'express'
const paginator = require('../utils/knex-paginator')
import { ListNotificationRequest } from '@/src/domain/requests/notify/ListNotificationRequest'
import knexInstance from '../knexfile'
import { Notification } from '../models/Notification'

const tableName = {
  NOTIFICATION: 'notification'
} as const

const fetchAll = async (req: Request<ListNotificationRequest | any>) => {
  const query = knexInstance<Notification>(tableName.NOTIFICATION).where('mst_user_name', req.params.username)
  const page = 1
  const perPage = 5
  const orderBy = req.body.orderBy ? req.body.orderBy : 'id'

  return paginator(knexInstance)(query.select('id', 'title', 'content').orderBy(orderBy, 'desc'), {
    perPage: perPage,
    page: page
  })
}

export { fetchAll }
