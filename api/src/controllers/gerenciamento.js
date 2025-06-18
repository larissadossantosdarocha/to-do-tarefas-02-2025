const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function get(req, res) {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { descricao, setor, usuarioId, prioridade } = req.body;

  try {
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        descricao,
        setor,
        prioridade,
        usuarioId: Number(usuarioId)
      }
    });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
  }
}

async function remove(req, res) {
  const id = Number(req.params.id);

  try {
    await prisma.tarefa.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar tarefa.' });
  }
}

module.exports = {
  get,
  update,
  remove
};
