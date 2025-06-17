 const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    function exibirTarefas() {
      tarefas.forEach((tarefa, index) => {
        const tarefaDiv = document.createElement('div');
        tarefaDiv.classList.add('card');
        tarefaDiv.innerHTML = `
          <strong>Descrição:</strong> ${tarefa.descricao}<br>
          <strong>Setor:</strong> ${tarefa.setor}<br>
          <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
          <strong>Vinculado a:</strong> ${tarefa.usuario}<br>
          <button onclick="editarTarefa(${index})">Editar</button> 
          <button onclick="excluirTarefa(${index})">Excluir</button><br>
          <br>
          <option>Alterar status</option>
          <button onclick="mudarStatus(${index}, 'Fazendo')">Fazendo</button>
          <button onclick="mudarStatus(${index}, 'Pronto')">Pronto</button>
        `;

        if (tarefa.status === 'Fazendo') {
          document.getElementById('tarefasFazendo').appendChild(tarefaDiv);
        } else if (tarefa.status === 'Pronto') {
          document.getElementById('tarefasPronto').appendChild(tarefaDiv);
        } else {
          document.getElementById('tarefasAFazer').appendChild(tarefaDiv);
        }
      });
    }

    function editarTarefa(index) {
      const tarefa = tarefas[index];
      const descricao = prompt("Editar descrição:", tarefa.descricao);
      if (descricao) {
        tarefa.descricao = descricao;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        location.reload(); 
      }
    }

    function excluirTarefa(index) {
      tarefas.splice(index, 1);
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      location.reload();
    }

    function mudarStatus(index, novoStatus) {
      tarefas[index].status = novoStatus;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      location.reload();
    }

    exibirTarefas();
 