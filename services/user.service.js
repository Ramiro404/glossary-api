const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
  }

  async create(data) {
    const hash = await  bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password
    return newUser;
  }

  async find() {
    //const response = await  this.pool.query('SELECT * FROM tasks');
    const response = await models.User.findAll();
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['categories']
    });
    if(!user){
      throw boom.notFound("User not found")
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    if(!user){
      throw boom.notFound('user not found');
    }
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }

  async findByEmail(email){
    const res = await models.User.findOne({
      where: {email}
    });
    return res;
  }
}

module.exports = UserService;
