import UserModel from "../model/users.js";
//import Joi from 'joi'
import bcrypt from 'bcrypt';
import asyncMiddleware from "../middleware/asyncMiddleware.js";
/*import jwt from 'jsonwebtoken';
import config from 'config';
import dotenv from "dotenv";*/
import logger from "../logger/index.js";

class UserCont {
    // first example using middleware without try catch
    static getUser = asyncMiddleware(async (req, res) => {
            const result = await UserModel.find()
            //console.log(result)
            res.render("reg.ejs")
       
    })
    static currUser = asyncMiddleware(async(req,res)=>{
        
            const student = await UserModel.findById(req.student._id);
            res.send(student);
            logger.info(student)
        
        
        
    })
    static createUser = async (req, res) => {
        try {
            const { name, email, password } = req.body
            console.log('req.body :>> ', req.body);
            if (!name || !email || !password) return res.status(400).send({ error: 'plz fill properly' })
            UserModel.findOne({ email: email })
                .then((userex) => {
                    if (userex) {
                        return res.status(400).send({ error: 'email id is already exist' })
                    }
                })
            const doc = new UserModel({
                name: name,
                email: email,
                password: password
            })
            //password encryption
            const salt = await bcrypt.genSalt(10)
            doc.password = await bcrypt.hash(doc.password, salt)

            const result = await doc.save()
            logger.info(result)

            const token = doc.generateAuthToken()
            //const token = jwt.sign({ _id: doc.id }, config.get('jwtPrivatekey'));
            res.header('x-auth-token',token).send('succesfully Added')
            
        } catch (error) {
            console.log(error)
        }
    }

    static userLogin = async (req, res) => {
        console.log("body",req.body)
        
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send('plz fill email id and password')
        let user = await UserModel.findOne({ email: req.body.email })
        console.log(user)
        if (!user) return res.status(400).send('Invalied Email or Password')

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).send('Invalid Email or Password')

        const token = user.generateAuthToken()
        //const token = jwt.sign({ _id: user.id }, config.get('jwtPrivatekey'));
        /*console.log(token)
        res.cookie('jwtoken',token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        })*/

        //this.tokens = UserModel.tokens({ token: token })
        //await this.save();

        res.send(token)


    }
    static userDelete = async(req,res)=>{
        try {
            const user = await UserModel.findByIdAndRemove(req.params.id);
            res.send(user);
            console.log(user)
        } catch (error) {
            console.log('error :>> ', error);
        }
            
        
        
    }

}
export default UserCont