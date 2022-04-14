const Joi = require('joi');

// validações de usuário
const userSchema = Joi.object({
  // valida se displayName é uma string com 8 chars
  displayName: Joi.string()
    .min(8)
    .required(),
  // valida se email é um e-mail
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  })
  .required(),
  // valida de password é uma string de 6 chars
  password: Joi.string()
    .length(6)
    .required(),
});

const userCreation = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = userSchema.validate({
    displayName, email, password,
  });

  if (error) {
    const message = {
      message: error.details[0].message,
    };
    return res.status(400).send(message);
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string()
    .empty()
    .required(),
  password: Joi.string()
    .empty()
    .required(),
});

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({
    email, password,
  });

  if (error) {
    const message = {
      message: error.details[0].message,
    };
    return res.status(400).send(message);
  }
  
  next();
};

const postSchema = Joi.object({
  title: Joi.string()
    .required(),
  content: Joi.string()
    .required(),
  categoryIds: Joi.array()
    .required(),
});

const postCreation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = postSchema.validate({
    title, content, categoryIds,
  });

  if (error) {
    const message = {
      message: error.details[0].message,
    };
    return res.status(400).send(message);
  }
  
  next();
};

module.exports = {
  userCreation,
  userLogin,
  postCreation,
};