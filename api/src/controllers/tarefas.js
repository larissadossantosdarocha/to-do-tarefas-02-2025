const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { desc, setor, prioridade, usuarioId, dataCadastro } = req.body;

  try {
    const tarefa = await prisma.tarefa.create({
      data: {
        desc,
        setor,
        prioridade,
        usuarioId,
        dataCadastro: new Date(dataCadastro)
      }
    });

    return res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro ao cadastrar tarefa:', error);
    return res.status(400).json({ error: 'Erro ao cadastrar tarefa.' });
  }
};

const read = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { create, read };