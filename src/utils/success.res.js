
export const successRes = ({res, status = 200, msg = "Done", data = {}})=>{
    return res.status(status).json({
        msg,
        data,
        status,
        timestamp : new Date().toISOString()
    })
}