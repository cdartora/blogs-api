const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const validate = require('./middlewares/validateUserCreation');
const user = require('./controllers/users');
const category = require('./controllers/categories');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', validate.userCreation, user.create);
app.post('/login', validate.userLogin, user.login);
app.get('/user', validateJWT, user.getAll);
app.get('/user/:id', validateJWT, user.getById);
app.post('/categories', validateJWT, category.create);
app.get('/categories', validateJWT, category.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
