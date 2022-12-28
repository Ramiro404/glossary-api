const express = require('express');

const QuestionService = require('./../services/question.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createQuestionSchema, getQuestionSchema, updateQuestionSchema, createQuestionRowSchema } = require('./../schemas/question.schema');
const router = express.Router();
const service = new QuestionService();

router.get('/', async (req, res, next) => {
    try {
        const data = await service.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getQuestionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await service.findOne(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/category/:id',
    validatorHandler(getQuestionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await service.findByCategoryId(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createQuestionSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const data = await service.create(body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/answers',
    validatorHandler(createQuestionRowSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const data = await service.addQuestionsAnswer(body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getQuestionSchema, 'params'),
    validatorHandler(updateQuestionSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await service.update(id, body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/category/:id',
    validatorHandler(getQuestionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await service.deleteAllQuestionsByCategoryId(id);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getQuestionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;
