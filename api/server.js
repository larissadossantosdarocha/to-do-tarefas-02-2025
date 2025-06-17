import express from 'express';
import usuarioRoutes from './src/routes/usuarioroutes.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.get('/', (req, res) => {
  res.send('API de Gerenciamento de Tarefas funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
