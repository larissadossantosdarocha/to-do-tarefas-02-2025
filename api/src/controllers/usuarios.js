const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res) {
  const { nome, email } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email }
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);

    if (error.code === 'P2002') {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    res.status(500).json({ erro: 'Erro no servidor.' });
  }
}

async function readAll(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
}

async function read(req, res) {
  const id = parseInt(req.params.id);
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
}

async function update(req, res) {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, email }
    });
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
}

async function remove(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.usuario.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar usuário.' });
  }
}

module.exports = {
  create,
  readAll,
  read,
  update,
  remove
};
