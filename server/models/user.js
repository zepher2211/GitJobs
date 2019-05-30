const argon2 = require('argon2');
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const DBIP = process.env.DBIP || "127.0.0.1"
const DBPORT = process.env.DBPORT || 5432

const sequelize = new Sequelize(`postgres://caryharper@${DBIP}:${DBPORT}/git_jobs_db`);
'use strict';

  class User extends Sequelize.Model {

    async validPassword(password){
      console.log(this.password, password)
      try {
        if (await argon2.verify(this.password, password)) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
      }
    }


  }
  User.init({
    profileImage: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    yearsOfExperience: Sequelize.INTEGER,
    isEmployed: Sequelize.BOOLEAN,
    description: Sequelize.STRING,
    minSalary: Sequelize.INTEGER,
    positionType: Sequelize.STRING,
    technicalSkills: Sequelize.ARRAY(Sequelize.STRING)
  }, {
    sequelize, modelName: "User"
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate(async (user) => {
    const hash = await argon2.hash(user.password);
    user.password = hash
  });

  sequelize.sync()
  
  module.exports = User;