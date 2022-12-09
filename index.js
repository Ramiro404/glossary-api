const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, sqlErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
require('./utils/auth');
routerApi(app);

app.use(logErrors)
app.use(sqlErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => console.log('Mi port' +  port));
  