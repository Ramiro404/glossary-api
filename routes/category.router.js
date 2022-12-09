const express = require('express');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require('./../schemas/category.schema');
const {getUserSchema} = require('./../schemas/user.schema')

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
    try {
        const data = await service.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
})

router.get('/user/:id', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
    try {
        const {id}=req.params;
        const data = await service.findByUserId(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
})

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
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
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const data = await service.create(body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    })

router.patch('/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
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
    validatorHandler(getCategorySchema, 'params'),
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