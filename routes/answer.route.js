const express = require('express');

const AnswerService = require('./../services/answer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createAnswerSchema, getAnswerSchema, updateAnswerSchema } = require('./../schemas/answer.schema');
const router = express.Router();
const service = new AnswerService();

router.get('/', async (req, res, next) => {
    try {
        const data = await service.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getAnswerSchema, 'params'),
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

router.post('/',
    validatorHandler(createAnswerSchema, 'body'),
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

router.patch('/:id',
    validatorHandler(getAnswerSchema, 'params'),
    validatorHandler(updateAnswerSchema, 'body'),
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

router.delete('/:id',
    validatorHandler(getAnswerSchema, 'params'),
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
