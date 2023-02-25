const express = require('express');
const bodyParser = require('body-parser');
const Mongo = require('./setup/mongoose');
const UsersAPI = require('./api/users.api');
const SessionsAPI = require('./api/sessions.api');
const TheatersAPI = require('./api/theaters.api');
require('dotenv').config();

console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);

const app = express();
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.use(UsersAPI.router);
  app.use(SessionsAPI.router);
  app.use(TheatersAPI.router);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  });
};

setup();