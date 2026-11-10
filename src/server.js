import express from 'express';
import projetoRoutes from './routes/projetoRoutes.js';
import tarefaRoutes from './routes/tarefaRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/projetos', projetoRoutes);
app.use('/tarefas', tarefaRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: 'A rota solicitada não existe.',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
