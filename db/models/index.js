const { Answer, AnswerSchema } = require("./answer.model");
const { Category, CategorySchema } = require("./category.model");
const { Question, QuestionSchema } = require("./question.model");
const { User, UserSchema } = require("./user.model");
const { Word, WordSchema } = require("./word.model");

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize))
    Category.init(CategorySchema,Category.config(sequelize))
    Word.init(WordSchema,Word.config(sequelize))
    Question.init(QuestionSchema, Question.config(sequelize));
    Answer.init(AnswerSchema, Answer.config(sequelize));

    User.associate(sequelize.models);
    Category.associate(sequelize.models);
    Word.associate(sequelize.models);
    Question.associate(sequelize.models);
    Answer.associate(sequelize.models);

    //sequelize.sync();
}

module.exports = setupModels;
