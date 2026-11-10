import express from 'express';
import {
  listarTarefasController,
  buscarTarefaController,
  cadastrarTarefaController,
  atualizarTarefaController,
  excluirTarefaController,
} from '../controllers/tarefaController.js';

const router = express.Router();

router.get('/', listarTarefasController);
router.get('/:id', buscarTarefaController);
router.post('/', cadastrarTarefaController);
router.put('/:id', atualizarTarefaController);
router.delete('/:id', excluirTarefaController);

export default router;
