const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class AnswerService {

  constructor(){
  }
  async create(data) {
    const newAnswer = await models.Answer.create(data);
    return newAnswer;
  }

  async find() {
    const data = await models.Answer.findAll();
    return data;
  }

  async findOne(id) {
    const data = await models.Answer.findByPk(id);
    if(!data){
        throw boom.notFound("Answer not found");
      }
    return data;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes);
    if(!data){
      throw boom.notFound("Answer not found");
    }
    return rta;
  }

  async delete(id) {
    const data = await this.findOne(id);
    await data.destroy();
    return id;
  }

}

module.exports = AnswerService;
