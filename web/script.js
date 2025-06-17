// Simula o cadastro de tarefas no localStorage
const formCadastroTarefa = document.getElementById('formCadastroTarefa');

// Função para carregar os usuários cadastrados
function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioSelect = document.getElementById('usuario');
    
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.nome;
        option.textContent = usuario.nome;
        usuarioSelect.appendChild(option);
    });
}

// Função para cadastrar a tarefa
formCadastroTarefa.addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById('prioridade').value;
    const usuario = document.getElementById('usuario').value;

    // Cria um objeto de tarefa
    const tarefa = {
        descricao,
        setor,
        prioridade,
        usuario,
    };

    // Armazena a tarefa no localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    alert('Tarefa cadastrada com sucesso!');
    formCadastroTarefa.reset();
});

// Carrega os usuários quando a página for carregada
window.onload = carregarUsuarios;
