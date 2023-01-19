import mongoose from "mongoose";
import jwt from "jsonwebtoken";
//import config from "config";
import dotenv from "dotenv";
dotenv.config()
const UserSchema = new mongoose.Schema({
    name:{type:String },
    email:{type:String },
    password:{type:String },
    IsAdmin:{type:Boolean }
    /*tokens:[
        {
            token:{
                type:String
            }
        }
    ]*/
})

UserSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this.id, IsAdmin: this.IsAdmin }, process.env.jwtPrivatekey);
    return token;
    /*try {
        let token = jwt.sign({_id: this.id},process.env.JWTPrivateKey);
    } catch (error) {
        console.log('error :>> ', error);
    }*/
}
const UserModel = mongoose.model("user",UserSchema);
export default UserModel;