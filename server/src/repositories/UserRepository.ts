import { Request } from 'express'
import knexInstance from '../knexfile'
import { User } from '../models/User'
import crypto = require('crypto')
import { LoginRequest } from '../domain/requests/user/LoginRequest'

const tableName = {
  USER: 'user'
} as const

const handleLogin = async (req: Request<LoginRequest>) => {
    try {
        const query = await knexInstance<User>(tableName.USER).where(req.body).first()
        const token = crypto.randomBytes(64).toString('hex')
        
        if(query){
            await knexInstance<User>(tableName.USER).where(req.body).update('token', token)
            return {
                token
            }
        }
        else return Promise.reject('Login Failed')
    }
    catch (err) {
        return Promise.reject(err)
    }
}

export { handleLogin }
