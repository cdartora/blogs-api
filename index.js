const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const validate = require('./middlewares/validateUserCreation');
const user = require('./controllers/users');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', validate.userCreation, user.create);
app.post('/login', validate.userLogin, user.login);
app.get('/user', validateJWT, user.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
