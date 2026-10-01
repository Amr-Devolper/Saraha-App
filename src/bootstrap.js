import express from "express"
import chalk from "chalk"
import { DBconnection } from "./DB/DB.connection.js";
import { userModel } from "./DB/models/user.model.js";
import userRouter, { routes } from "./modules/User/user.controller.js"


export  const bootstrap = async () =>{


    const app = express();
    app.use(express.json());

    app.use(routes.base , userRouter)
    


    app.get("/", (req,res)=>{
        const x = 10
    })

    await DBconnection()


    app.use((err,req,res,next) =>{
        const statusCode = err.cause?.statusCode || 500;
        console.log({statusCode})

        res.status(statusCode).json({
            errMsg : err.message,
            status : statusCode
        })
    }) 


    


    app.listen(process.env.PORT, ()=>{
        console.log(chalk.green("Server is running on port 3000"))
    })
}