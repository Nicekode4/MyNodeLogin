import UserModel from '../models/user.model.js'
import ejs from 'ejs'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import session from 'express-session'
dotenv.config()

class AuthController {
    login = async (req, res) => {
        const { username, password } = req.body
        console.log(req.body);
        if (username && password) {
            const userdata = await UserModel.findOne({
                attributes: ['id', 'password', 'firstname'],
                where: { email: username}
            })
            if (!userdata) {
                res.sendStatus(401)
            } else {
                 bcrypt.compare(password, userdata.password, (err, result) => {
                 if (result) {
                     const token = jwt.sign(userdata.id, process.env.PRIVATE_KEY)
                     req.session.user = userdata.firstname
                     res.writeHead(301, {
                        Location: `/protected`
                      }).end();
                     
                     
                 } else {
                     console.log(result);
                     res.sendStatus(401)
                 }
                

             })
            } 
            }else {
            
            res.sendStatus(403)
        }
            
    }
    protected = async (req, res) => {
        console.log();
        const {  user  } = req.session;
        
        console.log(req.session.user);
  res.render('../views/index.ejs', {
    user
  });
                   
        
    }
}

export default AuthController