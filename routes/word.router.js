const express = require('express');

const WordService = require('./../services/word.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createWordSchema, getWordSchema, updateWordSchema } = require('./../schemas/word.schema');

const router = express.Router();
const service = new WordService();



router.get(
  '/', 
  async (req, res, next) => {
  try {
    const words = await service.find();
    res.json(words);
  } catch (error) {
    next(error);
  }
});

router.get('/category/:id',
  validatorHandler(getWordSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const word = await service.findAllByCategoryId(id);
      res.json(word);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getWordSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const word = await service.findOne(id);
      res.json(word);
    } catch (error) {
      next(error);
    }
  }
);





router.post('/',
  validatorHandler(createWordSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newWord = await service.create(body);
      res.status(201).json(newWord);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getWordSchema, 'params'),
  validatorHandler(updateWordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const word = await service.update(id, body);
      res.json(word);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getWordSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;
