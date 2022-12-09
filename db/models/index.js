const { Category, CategorySchema } = require("./category.model");
const { User, UserSchema } = require("./user.model");
const { Word, WordSchema } = require("./word.model");

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize))
    Category.init(CategorySchema,Category.config(sequelize))
    Word.init(WordSchema,Word.config(sequelize))
    
    User.associate(sequelize.models)
    Category.associate(sequelize.models)
    Word.associate(sequelize.models)
}

module.exports = setupModels;