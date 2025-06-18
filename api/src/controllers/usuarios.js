const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    console.log('Body recebido:', req.body);
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Insira um e-mail válido.' });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email
      }
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

const read = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: { id: parseInt(req.params.id) }
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const readAll = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

module.exports = { create, read, readAll, update, remove };