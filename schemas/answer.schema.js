const Joi = require('joi');

const id = Joi.number().integer();
const answer = Joi.string().min(2);
const isCorrect = Joi.boolean();
const order = Joi.number().integer();
const questionId = Joi.number().integer();

const createAnswerSchema = Joi.object({
    answer: answer.required(),
    questionId: questionId.required(),
    isCorrect: isCorrect,
    order: order,
});

const updateAnswerSchema = Joi.object({
    answer: answer,
    isCorrect: isCorrect,
    questionId: questionId,
    order: order,
});

const getAnswerSchema = Joi.object({
    id: id.required(),
});

module.exports = { createAnswerSchema,  updateAnswerSchema, getAnswerSchema}
