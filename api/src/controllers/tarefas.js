const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res) {
  const { descricao, setor, usuarioId, prioridade } = req.body;

  try {
    const tarefa = await prisma.tarefa.create({
      data: {
        descricao,
        setor,
        prioridade,
        usuarioId: Number(usuarioId)
      }
    });
    res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ erro: 'Erro no servidor.' });
  }
}

async function read(req, res) {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true },  // Isso inclui os dados do usuário em cada tarefa
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
}


module.exports = {
  create,
  read
};
