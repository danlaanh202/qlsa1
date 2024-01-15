const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const bodyParser = require('body-parser');
const sequelize = require('./src/utils/sequelize');

require('dotenv').config();
const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((e) => {
    console.error('Unable to connect to the database', e);
  });

sequelize
  .sync()
  .then(() => {
    console.log('sync db');
  })
  .catch((e) => {
    console.log('Failed to sync db: ' + e.message);
  });

route(app);

app.listen(process.env.PORT || 3000, () => console.log('listening on port ' + process.env.PORT));
