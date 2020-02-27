'use strict';

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const Settings = require('./settings');
const Routes = require('./lib/routes');
const Models = require('./lib/models/');
const basicAuth = require('./lib/_helpers/basic-auth');

const app = express()
const port = Settings.port;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(basicAuth);
app.use(Routes);

Models.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
