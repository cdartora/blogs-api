const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const validate = require('./middlewares/validate');
const user = require('./controllers/users');
const post = require('./controllers/posts');
const category = require('./controllers/categories');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', validate.userCreation, user.create);
app.post('/login', validate.userLogin, user.login);
app.get('/user', validateJWT, user.getAll);
app.delete('/user/me', validateJWT, user.destroy);
app.get('/user/:id', validateJWT, user.getById);
app.post('/categories', validateJWT, category.create);
app.get('/categories', validateJWT, category.getAll);
app.post('/post', validateJWT, validate.postCreation, post.create);
app.get('/post', validateJWT, post.getAll);
app.get('/post/:id', validateJWT, post.getPost);
app.put('/post/:id', validateJWT, validate.postUpdate, post.update);
app.delete('/post/:id', validateJWT, post.destroy);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
