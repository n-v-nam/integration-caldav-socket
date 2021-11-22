import { Request } from 'express'
const paginator = require('../utils/knex-paginator')
import { CreateConnectionRequest } from '@/src/domain/requests/connection/CreateConnectionRequest'
import knexInstance from '../knexfile'
import { Service } from '../models/Service'
import { User } from '../models/User'
import { Connection } from '../models/Connection'

const tableName = {
  SERVICE: 'service',
  USER: 'user',
  CONNECTION: 'connection',
} as const

const listConnections = async (req: Request<any>) => {
  try {
    const { username } = req.params

    const query = await knexInstance<Connection>(tableName.CONNECTION).where('mst_user_name', username)
    return query
  } catch (error) {
    return Promise.reject('Error')
  }
}
const create = async (req: Request<CreateConnectionRequest>) => {
  try {
    const { service_code, username, token } = req.body
    console.log(token);


    const service = await knexInstance<Service>(tableName.SERVICE)
      .where('service_code', service_code)
      .first()
    const user = await knexInstance<User>(tableName.USER)
      .where('username', username)
      .first()

    if (service && user) {
      const connection = await knexInstance<Connection>(tableName.CONNECTION).where({
        mst_service_code: service_code,
        mst_user_name: username
      }).first()

      if(connection){
        return knexInstance<Connection>(tableName.CONNECTION).where({
          mst_service_code: service_code,
          mst_user_name: username
        }).first().update({token: token})
      }

      return knexInstance<Connection>(tableName.CONNECTION).insert({
        mst_service_code: service_code,
        mst_user_name: username,
        token: token,
      })
    } else return Promise.reject('Error')
  } catch (error) {
    return Promise.reject('Error')
  }
}
const show = async (req: Request<any>) => {
  try {
    const { service_code, username, token } = req.params
    const service = await knexInstance<Service>(tableName.SERVICE)
      .where('service_code', service_code)
      .first()
    const user = await knexInstance<User>(tableName.USER)
      .where('username', username)
      .first()

    if (service && user) {
      return knexInstance<Connection>(tableName.CONNECTION).where({
        mst_service_code: service_code,
        mst_user_name: username,
      }).first()
    } else return Promise.reject('Error')
  } catch (error) {
    return Promise.reject('Error')
  }
}

export { create, show, listConnections }
