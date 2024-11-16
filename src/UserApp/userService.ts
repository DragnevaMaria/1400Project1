import { Prisma } from "@prisma/client"
import userRepository from "./userRepository"

type UserRole = 'user' | 'admin'

interface IUserError{
    status: 'error',
    message: string
}

interface IUserSuccess{
    status: 'success',
    data: IUser
}

interface IUser{
    id: number,
    username: string,
    email: string,
    password: string,
}
 
async function authUser(email: string, password: string): Promise< IUserError | IUserSuccess > {
    let user = await userRepository.findUserByEmail(email);
    // if (user){
    //     if (password == user.password){
    //         return user;
    //     }else {}
    // }else {}
    if (!user){
        return {status: 'error', message: 'user not found'}
    }

    if (user.password != password){
        return {status: 'error', message: 'nepravilniy password'}
    }
    
    return {status: 'success', data: user}
}   
interface IAuthRegistOk {
    status: "success";
    data: {
        id: number;
        username: string;
        email: string;
        role: string; 
    };
}

interface IRegisterUser {
    username: string,
    password: string,
    email: string,
    role: string
    // role: "user" 
}

interface IAuthRegistOk {
    status: "success",
    data: {
        id: number,
        username: string,
        email: string,
        role: string
    };
}
interface IAuthRegistError {
  status: "error",
  message: string
}

async function registerUser(data: IRegisterUser): Promise<IAuthRegistOk | IAuthRegistError> {
    const user = await userRepository.findUserByEmail(data.email)
    
    if (user) {
        return {status: 'error', message: 'User exists yo'}
    }
    const yoUser = await userRepository.createUser(data)
    if (!yoUser) {
        return {status: 'error', message: 'create error yo'}
    } 
    return {status: 'success',
        data: {
          id: yoUser.id,
          username: yoUser.username,
          email: yoUser.email,
          role: yoUser.role 
        }}
}

const userService = {
    authUser: authUser,
    registerUser: registerUser
}
// yo this is my new baggy jeans bruh child po

export default userService;