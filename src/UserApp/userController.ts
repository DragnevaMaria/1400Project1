import express, { Express, Request, Response } from 'express'
import userService from './userService'
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

function login(req: Request, res: Response){
    res.render('login')
}

function registration(req: Request, res: Response){
    res.render('registration')
}

async function authUser(req: Request, res: Response){
    
    // console.log(req.body)
    // // метод cookie отправляет специальный заголовок Set-Cookie
    // res.cookie('user', req.body.email)
    // res.sendStatus(200)

    const data = req.body
    const user = await userService.authUser(data.email, data.password)
    
    if (user.status == 'error'){
        res.send(user.message)
        return 
    }
    const token = sign(user.data, SECRET_KEY, {expiresIn: '999d'})
    console.log('New Token:', token)
    res.cookie('token', token)
    // res.sendStatus(200)
    res.status(200).json({ message: 'Authenticated successfully (userController)', token })
}

async function registerUser(req: Request, res: Response){
    const data = req.body
    const result = await userService.registerUser(data)
    if (result.status == 'error'){
        res.send(result.message)
        return
    }
    const token = sign(result.data, SECRET_KEY, {expiresIn: '999d'})
    console.log('New Token:', token)
    res.cookie('token', token)
    // res.sendStatus(200)
    res.status(200).json({ message: 'Registration successful', token })
}

const userController = {
    login: login,
    authUser: authUser,
    registration: registration,
    registerUser: registerUser,
}

export default userController