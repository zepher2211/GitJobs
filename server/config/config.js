require('dotenv').config();

const DB = process.env.DB || 'git_jobs_db'
const DBUSERNAME = process.env.DBUSERNAME || 'caryharper'
const DBPASSWORD = process.env.DBPASSWORD || null
const DBIP = process.env.DBIP || "127.0.0.1"
const DBPORT = process.env.DBPORT || 5432

module.exports = {
"development": {
    "username": DBUSERNAME,
    "password": DBPASSWORD,
    "database": DB,
    "host": DBIP,
    "dialect": "postgres"
},
"test": {
  "username": DBUSERNAME,
  "password": DBPASSWORD,
  "database": DB,
  "host": DBIP,
  "dialect": "postgres"
},
"production": {
  "username": DBUSERNAME,
  "password": DBPASSWORD,
  "database": DB,
  "host": DBIP,
  "dialect": "postgres"
}
};
