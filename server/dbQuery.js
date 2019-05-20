const Sequelize = require('sequelize');
const DBIP = process.env.DBIP || "127.0.0.1"
const DBPORT = process.env.DBPORT || 5432

const sequelize = new Sequelize(`postgres://caryharper@${DBIP}:${DBPORT}/git_jobs_db`);

const init = () => {
    sequelize
    .authenticate()
    .then(() => {
      console.log("gefgd")
    });
}

const seed = () => {

}

module.exports = {
    init,
}