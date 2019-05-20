const argon2 = require('argon2');
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const DBIP = process.env.DBIP || "127.0.0.1"
const DBPORT = process.env.DBPORT || 5432

const sequelize = new Sequelize(`postgres://caryharper@${DBIP}:${DBPORT}/git_jobs_db`);
'use strict';


  // const User = sequelize.define('User', {
  //   firstName: DataTypes.STRING,
  //   lastName: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {
  //   instanceMethods: {
  //     validPassword: async (password) => {
  //       const validPass = await argon2.verify(user.password, password)
  //       console.log(validPass)
  //     }
  //   }
  // });
  class User extends Sequelize.Model {

    // set password(password){
    //   console.log(password)
    //   const hash = argon2.hash(password).then((hash) => hash)
    //   console.log(hash)
    //   this.setDataValue('password', hash);
    // }

    async validPassword(password){
      try {
        if (await argon2.verify(this.password, password)) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(this, password)
      }
    }


  }
  User.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
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
  module.exports = User;