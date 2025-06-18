document.addEventListener('DOMContentLoaded', carregarTarefas);

async function carregarTarefas() {
  try {
    const response = await fetch('http://localhost:3000/t');  // URL corrigida
    const tarefas = await response.json();

    tarefas.forEach(tarefa => {
      const div = document.createElement('div');
      div.classList.add('tarefa');
      div.textContent = `${tarefa.descricao} - ${tarefa.usuario.nome} (${tarefa.prioridade})`;

      if (tarefa.status === 'afazer') {
        document.getElementById('tarefasAFazer').appendChild(div);
      } else if (tarefa.status === 'fazendo') {
        document.getElementById('tarefasFazendo').appendChild(div);
      } else {
        document.getElementById('tarefasPronto').appendChild(div);
      }
    });
  } catch (error) {
    alert('Erro ao carregar tarefas: ' + error.message);
  }
}
