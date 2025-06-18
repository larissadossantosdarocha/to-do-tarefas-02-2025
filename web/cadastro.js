async function carregarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/u'); // URL corrigida
    const usuarios = await response.json();

    const select = document.getElementById('usuario');
    select.innerHTML = ''; // limpa as opções antigas

    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = usuario.nome;
      select.appendChild(option);
    });
  } catch (error) {
    alert('Erro ao carregar usuários: ' + error.message);
  }
}

document.getElementById('formCadastroTarefa')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const descricao = document.getElementById('descricao').value;
  const setor = document.getElementById('setor').value;
  const usuarioId = document.getElementById('usuario').value;
  const prioridade = document.getElementById('prioridade').value;

  try {
    const response = await fetch('http://localhost:3000/t', {  // URL corrigida
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao,
        setor,
        usuarioId: parseInt(usuarioId),
        prioridade
      })
    });

    if (!response.ok) throw new Error('Erro ao cadastrar tarefa');

    alert('Tarefa cadastrada com sucesso!');
    document.getElementById('formCadastroTarefa').reset();
  } catch (error) {
    alert('Erro: ' + error.message);
  }
});

window.onload = carregarUsuarios;
