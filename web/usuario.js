const formCadastroUsuario = document.getElementById('formCadastroUsuario');

// Função para cadastrar o usuário
formCadastroUsuario.addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Cria um objeto de usuário
    const usuario = {
        nome,
        email
    };

    // Armazena o usuário no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
    
    // Limpa o formulário
    formCadastroUsuario.reset();
});
