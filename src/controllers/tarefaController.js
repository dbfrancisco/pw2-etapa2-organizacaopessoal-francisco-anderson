import { buscarTarefaPorId, cadastrarTarefa, excluirTarefa, listarTarefas, listarTarefasPorProjetoId, atualizarTarefa } from '../models/tarefaModel.js';
import { projetoExiste } from '../models/projetoModel.js';
import { validarTarefa, validarIdRecurso, validarFiltroTarefaQuery } from '../helpers/validacoes.js';

export function listarTarefasController(req, res) {
  const validacao = validarFiltroTarefaQuery(req.query);

  if (!validacao.valido) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: validacao.erros[0],
    });
  }

  const tarefas = listarTarefas(validacao.filtros);
  return res.status(200).json(tarefas);
}

export function buscarTarefaController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'tarefa');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const tarefa = buscarTarefaPorId(id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada', mensagem: 'Não existe tarefa com o ID informado.' });
  }

  return res.status(200).json(tarefa);
}

export function cadastrarTarefaController(req, res) {
  const validacao = validarTarefa(req.body || {});

  if (!validacao.valido) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: validacao.erros[0],
    });
  }

  if (!projetoExiste(validacao.dados.projetoId)) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: 'O projeto informado não existe.',
    });
  }

  const tarefa = cadastrarTarefa(validacao.dados);
  return res.status(201).json({
    mensagem: 'Tarefa cadastrada com sucesso.',
    tarefa,
  });
}

export function atualizarTarefaController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'tarefa');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const tarefaExistente = buscarTarefaPorId(id);

  if (!tarefaExistente) {
    return res.status(404).json({ erro: 'Tarefa não encontrada', mensagem: 'Não existe tarefa com o ID informado.' });
  }

  const validacao = validarTarefa(req.body || {});

  if (!validacao.valido) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: validacao.erros[0],
    });
  }

  if (!projetoExiste(validacao.dados.projetoId)) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: 'O projeto informado não existe.',
    });
  }

  const tarefaAtualizada = atualizarTarefa(id, validacao.dados);

  return res.status(200).json({
    mensagem: 'Tarefa atualizada com sucesso.',
    tarefa: tarefaAtualizada,
  });
}

export function excluirTarefaController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'tarefa');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const tarefa = buscarTarefaPorId(id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada', mensagem: 'Não existe tarefa com o ID informado.' });
  }

  const tarefaRemovida = excluirTarefa(id);

  if (!tarefaRemovida) {
    return res.status(404).json({ erro: 'Tarefa não encontrada', mensagem: 'Não existe tarefa com o ID informado.' });
  }

  return res.status(200).json({ mensagem: 'Tarefa excluída com sucesso.' });
}
