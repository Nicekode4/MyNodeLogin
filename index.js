import express from "express";
import dotenv from "dotenv";
import ejs from 'ejs'
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import expressEjsLayouts from "express-ejs-layouts"; 


import UserRouter from './routes/user.route.js'
import InitRouter from "./routes/init.route.js";
import AuthRouter from "./routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(expressEjsLayouts)
app.use(cookieParser())
app.use(session({
    secret: 'its a secret!',
    cookie: {maxAge: 30000 },
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/views'));


app.set('view engine', 'ejs');
app.use(UserRouter)
app.use(InitRouter)
app.use(AuthRouter)

app.get('/', (req,res) => { 
    if (req.session.user == null){
        // if user is not logged-in redirect back to login page //
                res.redirect('/login');
            }else {
              fs.readFile('./views/index.ejs', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });  
            }
    
 })

 app.get('/about', (req,res) => { 
    res.render('../views/about.ejs')
 })

 app.get('/login', (req,res) => { 
    fs.readFile('./views/login.ejs', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
 })
 app.get('/register', (req,res) => { 
    fs.readFile('./views/register.ejs', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
 })
app.listen(port, () => {
    console.log(`Webserver running on http://localhost:${port}`);
})