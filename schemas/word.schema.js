
const Joi = require('joi');

const id = Joi.number().integer();
const word = Joi.string().min(1);
const description = Joi.string().min(1);
const lastTimeStudied = Joi.date();
const categoryId = Joi.number().integer();

const createWordSchema = Joi.object({
  word: word.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateWordSchema = Joi.object({
  word: word,
  description: description,
  lastTimeStudied: lastTimeStudied
});

const getWordSchema = Joi.object({
  id: id.required(),
});

module.exports = {  createWordSchema,  updateWordSchema,  getWordSchema }
