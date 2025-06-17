document.addEventListener('DOMContentLoaded', function () {
    const formCadastroTarefa = document.getElementById('formCadastroTarefa');

    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioSelect = document.getElementById('usuario');
        usuarioSelect.innerHTML = '';

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.nome;
            option.textContent = usuario.nome;
            usuarioSelect.appendChild(option);
        });
    }

    formCadastroTarefa.addEventListener('submit', function (event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const setor = document.getElementById('setor').value;
        const prioridade = document.getElementById('prioridade').value;
        const usuario = document.getElementById('usuario').value;

        const tarefa = {
            descricao,
            setor,
            prioridade,
            usuario
        };

        let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        alert('Tarefa cadastrada com sucesso!');
        formCadastroTarefa.reset();
    });

    carregarUsuarios();
});
