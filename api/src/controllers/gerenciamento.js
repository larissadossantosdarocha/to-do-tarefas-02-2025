const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function get(req, res) {
    try {
        const tarefas = await prisma.tarefa.findMany({
            where: {
                status: {
                    in: ['AFAZER', 'FAZENDO', 'PRONTO']  
                }
            }
        });
        res.json(tarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao recuperar tarefas.' });
    }
}

async function update(req, res) {
    const { id } = req.params;
    const { descricao, setor, prioridade, usuarioId } = req.body;
    try {
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id: parseInt(id) },
            data: { 
                desc: descricao, 
                setor, 
                usuarioId,
                prioridade
              
            }
        });
        res.json(tarefaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
}

async function remove(req, res) {
    const { id } = req.params;
    try {
        await prisma.tarefa.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Tarefa excluída com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir tarefa.' });
    }
}


module.exports = {
    get,
    update,
    remove
};