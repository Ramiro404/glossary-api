const boom = require('@hapi/boom');
const { Answer } = require('../db/models/answer.model');
const { models } = require('../libs/sequelize')

class QuestionService {

  constructor(){
  }
  async create(data) {
    const newQuestion = await models.Question.create(data);
    return newQuestion;
  }

  async find() {
    const data = await models.Question.findAll();
    return data;
  }

  async findByCategoryId(id){
    const data = await models.Question.findAll({
      where: {
        categoryId: id
      }
    });
    return data;
  }

  async findOne(id) {
    const data = await models.Question.findByPk(id);
    if(!data){
        throw boom.notFound("Question not found");
      }
    return data;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes);
    if(!data){
      throw boom.notFound("Question not found");
    }
    return rta;
  }

  async delete(id) {
    const data = await this.findOne(id);
    await data.destroy();
    return id;
  }

  async addQuestionsAnswer(rowData) {
    const response = await models.Question.bulkCreate(rowData, {
      include: ['answers']
    });
    return response;
  }

}

module.exports = QuestionService;
