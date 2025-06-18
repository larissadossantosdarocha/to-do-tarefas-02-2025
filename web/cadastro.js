document.addEventListener('DOMContentLoaded', function () {
    const formCadastroTarefa = document.getElementById('formCadastroTarefa');

    // Carregar usuários do backend (opcional)
    async function carregarUsuarios() {
        try {
            const resposta = await fetch('http://localhost:3000/usuarios');
            const usuarios = await resposta.json();

            const usuarioSelect = document.getElementById('usuario');
            usuarioSelect.innerHTML = '';

            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id; // melhor usar ID
                option.textContent = usuario.nome;
                usuarioSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            alert('Erro ao carregar usuários');
        }
    }

    formCadastroTarefa.addEventListener('submit', async function (event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const setor = document.getElementById('setor').value;
        const prioridade = document.getElementById('prioridade').value;
        const usuarioId = document.getElementById('usuario').value;

        const tarefa = {
            descricao,
            setor,
            prioridade,
            usuarioId: Number(usuarioId)
        };

        try {
            const resposta = await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarefa)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar tarefa');
            }

            alert('Tarefa cadastrada com sucesso!');
            formCadastroTarefa.reset();
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar tarefa');
        }
    });

    carregarUsuarios();
});
