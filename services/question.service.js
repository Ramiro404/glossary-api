const boom = require('@hapi/boom');
//const { Answer } = require('../db/models/answer.model');
const { models } = require('../libs/sequelize')
class QuestionService {

  constructor() {
  }
  async create(data) {
    const newQuestion = await models.Question.create(data);
    return newQuestion;
  }

  async find() {
    const data = await models.Question.findAll();
    return data;
  }

  async findByCategoryId(id) {
    const data = await models.Question.findAll({
      where: {
        categoryId: id
      },
      include: ['answers']
    });
    return data;
  }

  async findOne(id) {
    const data = await models.Question.findByPk(id, {
      include: ['answers']
    });
    if (!data) {
      throw boom.notFound("Question not found");
    }
    return data;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes, {
      include: ['answers']
    });
    if (!data) {
      throw boom.notFound("Question not found");
    }
    return rta;
  }

  async delete(question) {
    if (question.dataValues.answers.length > 0) {
      question.dataValues.answers.forEach(async (answer) => {
        await answer.destroy();
      })
    }
    await question.destroy();
    return true;
  }

  async addQuestionsAnswer(rowData) {
    const response = await models.Question.bulkCreate(rowData, {
      include: ['answers']
    });
    return response;
  }

  async deleteAllQuestionsByCategoryId(id) {
    try {
      const questionaire = await this.findByCategoryId(id);
      questionaire.forEach(async (question) => {
        await this.delete(question);
      });
      return questionaire;
    } catch (error) {
      return error;
    }
  }

}

module.exports = QuestionService;
