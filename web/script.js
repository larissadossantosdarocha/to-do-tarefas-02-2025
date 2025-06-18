const formCadastroTarefa = document.getElementById('formCadastroTarefa');

// Carregar usuários do backend e preencher o select
async function carregarUsuarios() {
    try {
        const resposta = await fetch('http://localhost:3000/usuarios');
        const usuarios = await resposta.json();

        const usuarioSelect = document.getElementById('usuario');
        usuarioSelect.innerHTML = ''; // limpa opções antigas

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id; // agora usamos ID
            option.textContent = usuario.nome;
            usuarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários');
    }
}

// Enviar tarefa para o backend
formCadastroTarefa.addEventListener('submit', async function(event) {
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

        if (!resposta.ok) throw new Error('Erro ao cadastrar tarefa');

        alert('Tarefa cadastrada com sucesso!');
        formCadastroTarefa.reset();
    } catch (error) {
        console.error('Erro ao cadastrar tarefa:', error);
        alert('Erro ao cadastrar tarefa');
    }
});

window.onload = carregarUsuarios;
