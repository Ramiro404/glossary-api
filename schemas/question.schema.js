const Joi = require('joi');

const id = Joi.number().integer();
const question = Joi.string().min(2);
const order = Joi.number().integer();
const categoryId = Joi.number().integer();

const answer = Joi.string().min(2);
const isCorrect = Joi.boolean();
const answers = Joi.array().items({
    answer: answer.required(),
    isCorrect: isCorrect.required(),
    order: order,
})

const createQuestionSchema = Joi.object({
    question: question.required(),
    categoryId: categoryId.required(),
    order: order,
    answers: answers,
})

const createQuestionRowSchema = Joi.array().items({
    question: question.required(),
    categoryId: categoryId.required(),
    order: order,
    answers: answers,
})

const updateQuestionSchema = Joi.object({
    question: question,
    categoryId: categoryId,
    order: order,
})

const getQuestionSchema = Joi.object({
    id: id.required(),
})

module.exports = { createQuestionSchema, updateQuestionSchema, getQuestionSchema, createQuestionRowSchema }
