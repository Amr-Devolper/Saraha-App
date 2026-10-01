import {Router} from "express"
import { errorRes } from "../../utils/error.handle.js"
import { successRes } from "../../utils/success.res.js"
import { loginService, refreshTokenService, signupService } from "./user.service.js"
import { auth, tokenEnum } from "../../middlewares/auth.middleware.js"
import jwt from "jsonwebtoken"
import { userModel } from "../../DB/models/user.model.js"
const router = Router()


export const routes = {
    base : "/users",
    signup : "/signup",
    login : "/login",
    me : "/me",
    refreshToken : "/refresh-token" 
}



router.get(routes.base, (req,res)=>{
    errorRes({msg : "error from hello api", statusCode : 400})

    successRes({res,msg:"user module"})
})



router.post(routes.signup, async (req,res)=>{
    const {data} = await signupService(req.body)

    successRes({res, msg: "created successfully", status : 201})
})


router.post(routes.login, async (req,res)=>{
    const {identifier,password} = req.body
    const {data} = await loginService(identifier,password)
    return successRes({
        res,
        msg : "logged in successfully",
        statusCode : 200,
        data
    })
})


router.get(routes.me, auth , async (req,res)=>{

    const user = req.user
    return successRes({
        res,
        data : {user},
    })
})


router.post(routes.refreshToken ,async (req,res)=>{
    const authorization = req.headers.authorization

    const {data} = await refreshTokenService(authorization)



    return successRes({
        res,
        data,
        msg : "new access token generated successfully"
    })
})

export default  router