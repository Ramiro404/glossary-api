const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastname = Joi.string().min(2);
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    password: password.required(),
});

const updateUserSchema = Joi.object({
    name: name,
    lastname: lastname,
    email: email,
});

const getUserSchema = Joi.object({
    id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
