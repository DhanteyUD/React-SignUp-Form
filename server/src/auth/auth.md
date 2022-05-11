import { NextFunction } from "express";

const Express =require('express');
const jwt = require('jsonwebtoken');

const id = databaseuser._id
const email = databaseuser.email
const mobile = databaseuser.mobile

const token = jwt.sign([id,email,mobile],process.env.SECRET_KEY,{expiresIn:"2h"})
databaseuser.token = token

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token||res.query.token|| req.headers['x-access-token'];
    if(!token)
    return res.status(403).send('you need to login');
    try{
        const decoded =jwt.verify(token,process.env.SECRET_KEY)
        req.user= decoded
    }catch(err) {
        res.status(401).send('Invalid token')

    }
    return next()
    
}