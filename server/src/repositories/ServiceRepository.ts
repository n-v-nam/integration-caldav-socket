import { Request } from 'express'
const paginator = require('../utils/knex-paginator')
import { ListServiceRequest } from '@/src/domain/requests/service/ListServiceRequest'
import knexInstance from '../knexfile'
import { Service } from '../models/Service'

const tableName = {
  SERVICE: 'service'
} as const

const fetchAll = async (req: Request<ListServiceRequest>) => {
  const query = knexInstance<Service>(tableName.SERVICE)
  const page = req.body.page ? req.body.page : 1
  const perPage = req.body.perPage ? req.body.perPage : 50
  const descending = req.body.perPage ? req.body.perPage : 'desc'
  const sortBy = req.body.sortBy ? req.body.sortBy : 'id'

  return paginator(knexInstance)(query.select('*').orderBy(sortBy, descending), {
    perPage: perPage,
    page: page
  })
}

export { fetchAll }
