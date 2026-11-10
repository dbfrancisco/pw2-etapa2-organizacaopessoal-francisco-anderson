import express from 'express';
import {
  listarProjetosController,
  buscarProjetoController,
  cadastrarProjetoController,
  atualizarProjetoController,
  excluirProjetoController,
  listarTarefasPorProjetoController,
} from '../controllers/projetoController.js';

const router = express.Router();

router.get('/', listarProjetosController);
router.get('/:id', buscarProjetoController);
router.post('/', cadastrarProjetoController);
router.put('/:id', atualizarProjetoController);
router.delete('/:id', excluirProjetoController);
router.get('/:id/tarefas', listarTarefasPorProjetoController);

export default router;
