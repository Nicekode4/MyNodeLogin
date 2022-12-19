import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from "express";

const app = express()
dotenv.config()


const verifyToken = (req, res, next) => {
   
        if (req.session.user == null){
    // if user is not logged-in redirect back to login page //
            res.redirect('/login');
        }   else{
            next();
            
        }
    }
export default verifyToken