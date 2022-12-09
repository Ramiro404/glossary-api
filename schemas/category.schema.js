const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(35);
const userId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  userId: userId.required()
});

const updateCategorySchema = Joi.object({
  name: name,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
