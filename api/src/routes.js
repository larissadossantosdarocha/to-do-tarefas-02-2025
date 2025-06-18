const express = require('express');
const routes = express.Router();

const Usuarios = require('./controllers/usuarios');
const Tarefas = require('./controllers/tarefas');
const Gerenciamento = require('./controllers/gerenciamento');

routes.get('/', (req, res) => {
  res.json({ titulo: 'Gerenciamento de tarefas' });
});

routes.post('/u', Usuarios.create);
routes.get('/u', Usuarios.readAll);
routes.get('/u/:id', Usuarios.read);
routes.put('/u/:id', Usuarios.update);
routes.delete('/u/:id', Usuarios.remove);

routes.post('/t', Tarefas.create);
routes.get('/t', Tarefas.read);
routes.get('/tarefas', Gerenciamento.get);
routes.put('/tarefas/:id', Gerenciamento.update);
routes.delete('/tarefas/:id', Gerenciamento.remove);

module.exports = routes;
