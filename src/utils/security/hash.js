import {hash  , compare} from 'bcrypt'
import { hash as hashArgon,verify} from "argon2";

export const createHash = async (password, hashType = "bcrypt")=>{
    let hashedPassword;
    switch(hashType){
        case "bcrypt":
            hashedPassword = await hash(password, 10);
            break;
        case "argon2":
            hashedPassword = await hashArgon(password);
            break;
    }
    return hashedPassword;
}

export const verifyHash = async (password, hash)=>{
    let isValid;

    switch(hash.startsWith("$2b$") ? "bcrypt" : "argon2"){
        case "bcrypt" : 
            isValid = await compare(password,hash)
            break;
        case "argon2" :
            isValid = await verify(hash,password)
            break;
    }

    return isValid
}
