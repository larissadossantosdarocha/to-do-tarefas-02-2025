document.getElementById('formCadastroUsuario')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://localhost:3000/u', {  // URL corrigida
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    if (!response.ok) throw new Error('Erro ao cadastrar usuário');

    alert('Usuário cadastrado com sucesso!');
    document.getElementById('formCadastroUsuario').reset();
  } catch (error) {
    alert('Erro: ' + error.message);
  }
});
