const express = require('express')

const userRouter = require('./user.router');
const categoryRouter = require('./category.router')
const wordRouter = require('./word.router')
const authRouter = require('./auth.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter)
    router.use('/users', userRouter)
    router.use('/categories',categoryRouter)
    router.use('/words',wordRouter)
}

module.exports = routerApi;