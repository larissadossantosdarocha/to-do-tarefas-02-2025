async function carregarTarefas() {
  try {
    const resposta = await fetch('http://localhost:3000/tarefas');
    const tarefas = await resposta.json();

    tarefas.forEach(tarefa => {
      const tarefaDiv = document.createElement('div');
      tarefaDiv.classList.add('card');
      tarefaDiv.innerHTML = `
        <strong>Descrição:</strong> ${tarefa.descricao}<br>
        <strong>Setor:</strong> ${tarefa.setor}<br>
        <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
        <strong>Vinculado a:</strong> ${tarefa.usuario.nome}<br>
        <button onclick="editarTarefa(${tarefa.id}, '${tarefa.descricao}')">Editar</button> 
        <button onclick="excluirTarefa(${tarefa.id})">Excluir</button><br>
        <br>
        <option>Alterar status</option>
        <button onclick="mudarStatus(${tarefa.id}, 'Fazendo')">Fazendo</button>
        <button onclick="mudarStatus(${tarefa.id}, 'Pronto')">Pronto</button>
      `;

      if (tarefa.status === 'Fazendo') {
        document.getElementById('tarefasFazendo').appendChild(tarefaDiv);
      } else if (tarefa.status === 'Pronto') {
        document.getElementById('tarefasPronto').appendChild(tarefaDiv);
      } else {
        document.getElementById('tarefasAFazer').appendChild(tarefaDiv);
      }
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    alert('Erro ao carregar tarefas');
  }
}

async function editarTarefa(id, descricaoAtual) {
  const novaDescricao = prompt("Editar descrição:", descricaoAtual);
  if (!novaDescricao) return;

  try {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: novaDescricao })
    });
    location.reload();
  } catch (error) {
    console.error(error);
    alert('Erro ao editar tarefa');
  }
}

async function excluirTarefa(id) {
  try {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE'
    });
    location.reload();
  } catch (error) {
    console.error(error);
    alert('Erro ao excluir tarefa');
  }
}

async function mudarStatus(id, novoStatus) {
  try {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });
    location.reload();
  } catch (error) {
    console.error(error);
    alert('Erro ao mudar status');
  }
}

carregarTarefas();
