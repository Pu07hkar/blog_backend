import jwt from "jsonwebtoken"

const authorization = async (req,res,next)=>{
    try {
        console.log("hey")
        
        const token =req.cookies.authToken || req.header("Authorization").replace("Bearer ","");
        console.log("this is token ",token)
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        if(!verify){
            return res.status(401).json({message:"Invalid token"})
        }
        req.user = verify.userID
        next();
    } catch (error) {
        console.log(`error ${error}`)
    }
}
export default authorization;