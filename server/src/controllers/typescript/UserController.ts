import { Request, Response } from 'express'

const app = require('../../utils/app-utils')

const { check } = require('express-validator')

import {
    handleLogin,
    handleRegister,
    handleChangePassword,
    handleResetPassword,
    handleChangeProfile,
    confirmRegistration,
    handleGetProfile
} from '../../repositories/UserRepository'
import { ResponseData } from '../../responses/Response'
import { LoginRequest } from '@/src/domain/requests/user/LoginRequest'
import { LoginResponse } from '@/src/domain/responses/user/LoginResponse'
import { RegisterUserRequest } from '@/src/domain/requests/user/ResgisterUserRequest'
import { ChangePasswordRequest } from '@/src/domain/requests/user/ChangePasswordRequest'
import { ChangeProfileRequest } from '@/src/domain/requests/user/ChangeProfileRequest'
import { ConfirmRegisterUserRequest } from '@/src/domain/requests/user/ConfirmRegisterUserRequest'
import { ResetPasswordRequest } from '@/src/domain/requests/user/ResetPasswordRequest'
import { GetUserResponse } from '@/src/domain/responses/user/GetUserResponse'

const login = async (req: Request<LoginRequest>, res: Response<ResponseData<LoginResponse>>) => {
    try {
        return handleLogin(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<LoginResponse>(true, 'Login Success !', data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<LoginResponse>(false, error || 'Login Failed', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<LoginResponse>(false, 'An error has occurred', null))
    }
}

const register = async (req: Request<RegisterUserRequest>, res: Response<ResponseData<null>>) => {
    try {
        return handleRegister(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<null>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<null>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<null>(false, err.message || 'An error has occurred', null))
    }
}

const confirmRegister = async (req: Request<ConfirmRegisterUserRequest>, res: Response<ResponseData<null>>) => {
    try {
        return confirmRegistration(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<null>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<null>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<null>(false, err.message || 'An error has occurred', null))
    }
}

const changePassword = async (req: Request<ChangePasswordRequest>, res: Response<ResponseData<null>>) => {
    try {
        return handleChangePassword(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<null>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<null>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<null>(false, err.message || 'An error has occurred', null))
    }
}
const resetPassword = async (req: Request<ResetPasswordRequest>, res: Response<ResponseData<null>>) => {
    try {
        return handleResetPassword(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<null>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<null>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<null>(false, err.message || 'An error has occurred', null))
    }
}
const changeProfile = async (req: Request<ChangeProfileRequest>, res: Response<ResponseData<null>>) => {
    try {
        return handleChangeProfile(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<null>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<null>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<null>(false, err.message || 'An error has occurred', null))
    }
}
const getUserProfile = async (req: Request<ChangeProfileRequest>, res: Response<ResponseData<GetUserResponse>>) => {
    try {
        return handleGetProfile(req)
            .then(function (data: any) {
                return res.status(200).send(new ResponseData<GetUserResponse>(true, null, data))
            })
            .catch(function (error: any) {
                app.error(error)
                return res.status(400).send(new ResponseData<GetUserResponse>(false, error || 'An error has occurred', null))
            })
    } catch (err: any) {
        app.error(err)
        return res.status(500).send(new ResponseData<GetUserResponse>(false, err.message || 'An error has occurred', null))
    }
}

const validate = (method: string) => {
    switch (method) {
        case 'token': {
            return [check('token', 'token invalid').isLength({ min: 1, max: 64 })]
        }
    }
}

export { login, register, confirmRegister, changePassword, resetPassword, changeProfile, getUserProfile, validate }

