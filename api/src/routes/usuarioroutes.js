import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {

  res.json([
    { nome: 'João', setor: 'TI' },
    { nome: 'Maria', setor: 'RH' }
  ]);
});

router.post('/', (req, res) => {
  const novoUsuario = req.body;
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
});

export default router;
