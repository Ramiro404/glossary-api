const express = require('express')

const userRouter = require('./user.router');
const categoryRouter = require('./category.router')
const wordRouter = require('./word.router')
const authRouter = require('./auth.router');
const questionRouter = require('./question.router');
const answerRouter = require('./answer.route');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/users', userRouter);
    router.use('/categories',categoryRouter);
    router.use('/words',wordRouter);
    router.use('/questions', questionRouter);
    router.use('/answers', answerRouter);
}

module.exports = routerApi;
