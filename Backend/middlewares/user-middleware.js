const jwt = require("jsonwebtoken")


let decode;
let roleIs;

//checking user has a valid token
//decoding id, role from the token
const checkToken = async(req, res, next) =>{

    try{
        const cookies = req.headers.cookie;

        console.log(cookies)
        // if(!cookies){
        //     return res.status(403).json({message:"Login first"})
        // }
    
        
            const token = cookies.split("=")[1];
    
            if(!token){
                return res.status(403).json({message:"A token is required"})
            }
            else{
                decode = jwt.verify(token, process.env.secret);
    
                req.userId = decode._id;
    
                req.roleIs = decode.role;
    
                next();
            }
        
    }catch(err){
        res.status(401).json({message:"Invalid Token"})
        console.log(err)
    }

}

const AdminRole = async(req, res, next)=>{

    try{
        if(req.roleIs==="admin"){
            next();
        }else{
            res.status(403).json("unauthorized")
        }
    }catch(err){
        res.status(500).json({message:"error in authorization"})
        console.log(err)
    }
}

const moderatorRole = async(req, res, next)=>{

    try{
        if(req.roleIs==="moderator"){
            next();
        }else{
            res.status(403).json("unauthorized")
        }
    }catch(err){
        res.status(500).json({message:"error in authorization"})
        console.log(err)
    }
}

const citizenRole = async(req, res, next)=>{

    try{
        if(req.roleIs==="citizen"){
            next();
        }else{
            res.status(403).json("unauthorized")
        }
    }catch(err){
        res.status(500).json({message:"error in authorization"})
        console.log(err)
    }
}

exports.checkToken = checkToken
exports.AdminRole = AdminRole
exports.citizenRole = citizenRole
exports.moderatorRole = moderatorRole