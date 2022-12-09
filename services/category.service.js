const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const data = await models.Category.findAll();
    return data;
  }

  async findByUserId(id){
    const data = await models.Category.findAll({
      where: {
        userId: id
      }
    });
    return data;
  }

  async findOne(id) {
    const data = await models.Category.findByPk(id, {
      include: ['words']
    });
    if(!data){
        throw boom.notFound("Category not found");
      }
    return data;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes);
    if(!data){
      throw boom.notFound("Category not found");
    }
    return rta;
  }

  async delete(id) {
    const data = await this.findOne(id);
    await data.destroy();
    return id;
  }

}

module.exports = CategoryService;
