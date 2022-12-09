const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class WordService {
  constructor() { }
  async create(data) {
    const newWord = await models.Word.create(data);
    return newWord;
  }

  async find() {
    const response = await models.Word.findAll();
    return response;
  }

  async findAllByCategoryId(id){
    const words = await models.Word.findAll({
      where: {
        categoryId:id
      }
    });
    return words;
  }

  async findOne(id) {
    const word = await models.Word.findByPk(id);
    if (!word) {
      throw boom.notFound('Word not found')
    }
    return word;
  }

  async update(id, changes) {
    const word = await this.findOne(id);
    const rta = await word.update(changes);
    if (!word) {
      throw boom.notFound('Word not found');
    }
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }

}

module.exports = WordService