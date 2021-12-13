import { Request } from 'express'
import knexInstance from '../knexfile'
import { User } from '../models/User'
import crypto = require('crypto')
import randomstring = require('randomstring')
import transporter from '../nodemailer'
import { LoginRequest } from '../domain/requests/user/LoginRequest'
import { RegisterUserRequest } from '../domain/requests/user/ResgisterUserRequest'
import { ChangePasswordRequest } from '../domain/requests/user/ChangePasswordRequest'
import { ChangeProfileRequest } from '../domain/requests/user/ChangeProfileRequest'
import { ConfirmRegisterUserRequest } from '../domain/requests/user/ConfirmRegisterUserRequest'
import { ResetPasswordRequest } from '../domain/requests/user/ResetPasswordRequest'
import { GetUserRequest } from '../domain/requests/user/GetUserRequest'

const tableName = {
    USER: 'user'
} as const

const handleLogin = async (req: Request<LoginRequest>) => {
    try {
        const query = await knexInstance<User>(tableName.USER).where(req.body).first()
        const token = crypto.randomBytes(64).toString('hex')
        const now = new Date()
        
        const expiration_date = new Date(`${now.getMonth()}-${now.getDate()}-${now.getFullYear() + 1}`);
        
        if (query) {
            await knexInstance<User>(tableName.USER).where(req.body).andWhere('status', 1).update({ token, expiration_date })
            return {
                id: query.id,
                token,
                name: query.name,
                expiration_date
            }
        } else return Promise.reject('Incorrect account !!!')
    } catch (err) {
        return Promise.reject('Login failed, please try again !')
    }
}

const handleRegister = async (req: Request<RegisterUserRequest>) => {
    try {
        const { username, password, email } = req.body
        const query = await knexInstance<User>(tableName.USER).where('username', username).first()
        console.log(query)
        if (!query) {
            let code: string | null = null
            while (true) {
                code = randomstring.generate({
                    length: 6,
                    charset: 'alphanumeric',
                    capitalization: 'uppercase'
                })
                let check = await knexInstance<User>(tableName.USER).where('code', code).first()
                if (!check) break
            }

            const send = await sendVerifyEmail({
                email,
                subject: 'Verify Code for your CALDAV account !!!',
                content: `<div>Hello ${username}, this is code verify for your account !!!</div><strong>${code}</strong><br/><a href="http://localhost:8080/sign-up-confirm">You can click here</a></p><br/><br/>Thanks you !!!<br/> -Caldav System-`
            })
            if (!send) {
                return Promise.reject('Cannot send code to email, register user failed !')
            }

            return knexInstance<User>(tableName.USER).insert({
                username,
                password,
                email,
                code,
                status: 0
            })
        } else return Promise.reject('Username exists !')
    } catch (err) {
        return Promise.reject('Register user failed !')
    }
}

const confirmRegistration = async (req: Request<ConfirmRegisterUserRequest>) => {
    try {
        const { code } = req.body
        const query = await knexInstance<User>(tableName.USER).where('code', code).first()

        if (query) {
            const user = await knexInstance<User>(tableName.USER).where('code', code).first().update({ status: 1, code: null })
            return user
        } else {
            return Promise.reject('Code not correct !!!')
        }
    } catch (err) {
        return Promise.reject('Confirm failed !')
    }
}
const handleResetPassword = async (req: Request<ResetPasswordRequest>) => {
    try {
        const { username, email } = req.body
        const query = await knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).first()

        if (query) {
            if(email !== query.email){
                return Promise.reject('Email not correct !')
            }
            const password = randomstring.generate({
                length: 6,
                charset: 'alphanumeric',
                capitalization: 'lowercase'
            })

            const send = await sendVerifyEmail({
                email: query.email,
                subject: 'Reset password for Caldav account !!!',
                content: `<div>Hello ${username}, this is new password for your account !!!</div><strong>${password}</strong><br/><a href="http://localhost:8080/login">You can click here</a></p><br/><br/>Thanks you !!!<br/> -Caldav System-`
            })
            if (!send) {
                return Promise.reject('Cannot send code to email, reset password failed !')
            }

            const user = await knexInstance<User>(tableName.USER)
                .where('username', username)
                .andWhere('status', 1)
                .first()
                .update('password', password)
            return user
        } else {
            return Promise.reject('Username not found !')
        }
    } catch (err) {
        return Promise.reject('Reset password failed !')
    }
}

const handleChangePassword = async (req: Request<ChangePasswordRequest>) => {
    try {
        const { username, password, newPassword } = req.body
        const query = await knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).first()

        if (query) {
            if (password === query.password) {
                return knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).update({
                    password: newPassword
                })
            } else return Promise.reject('Password incorrect !')
        } else return Promise.reject('User not found !')
    } catch (err) {
        return Promise.reject('Change password failed !')
    }
}

const handleGetProfile = async (req: Request<GetUserRequest>) => {
    try {
        const { username } = req.params
        const query = await knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).first()

        if (query) return query
        else return Promise.reject('User not found !')
    } catch (err) {
        return Promise.reject('Get user profile failed !')
    }
}
const handleChangeProfile = async (req: Request<ChangeProfileRequest>) => {
    try {
        const { username, password, name, email } = req.body
        const query = await knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).first()

        if (query) {
            if (password === query.password) {
                return knexInstance<User>(tableName.USER).where('username', username).andWhere('status', 1).update({
                    name,
                    email
                })
            } else return Promise.reject('Password incorrect !')
        } else return Promise.reject('User not found !')
    } catch (err) {
        return Promise.reject('Update failed !')
    }
}

const sendVerifyEmail = async (req: any) => {
    const data = {
        from: 'caldav.system@gmail.com',
        to: req.email,
        subject: req.subject,
        html: req.content
    }

    return transporter.sendMail(data)
}

export { handleLogin, handleRegister, handleChangePassword, handleResetPassword, handleChangeProfile, handleGetProfile, confirmRegistration }
