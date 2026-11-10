import { listarProjetos, buscarProjetoPorId, cadastrarProjeto, atualizarProjeto, excluirProjeto } from '../models/projetoModel.js';
import { listarTarefasPorProjetoId } from '../models/tarefaModel.js';
import { validarProjeto, validarIdRecurso } from '../helpers/validacoes.js';

export function listarProjetosController(req, res) {
  res.status(200).json(listarProjetos());
}

export function buscarProjetoController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'projeto');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const projeto = buscarProjetoPorId(id);

  if (!projeto) {
    return res.status(404).json({ erro: 'Projeto não encontrado', mensagem: 'Não existe projeto com o ID informado.' });
  }

  return res.status(200).json(projeto);
}

export function cadastrarProjetoController(req, res) {
  const validacao = validarProjeto(req.body || {});

  if (!validacao.valido) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: validacao.erros[0],
    });
  }

  const projeto = cadastrarProjeto(validacao.dados);
  return res.status(201).json({
    mensagem: 'Projeto cadastrado com sucesso.',
    projeto,
  });
}

export function atualizarProjetoController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'projeto');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const projetoExistente = buscarProjetoPorId(id);

  if (!projetoExistente) {
    return res.status(404).json({ erro: 'Projeto não encontrado', mensagem: 'Não existe projeto com o ID informado.' });
  }

  const validacao = validarProjeto(req.body || {});

  if (!validacao.valido) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: validacao.erros[0],
    });
  }

  const projetoAtualizado = atualizarProjeto(id, validacao.dados);

  return res.status(200).json({
    mensagem: 'Projeto atualizado com sucesso.',
    projeto: projetoAtualizado,
  });
}

export function excluirProjetoController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'projeto');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const projeto = buscarProjetoPorId(id);

  if (!projeto) {
    return res.status(404).json({ erro: 'Projeto não encontrado', mensagem: 'Não existe projeto com o ID informado.' });
  }

  const tarefasDoProjeto = listarTarefasPorProjetoId(id);

  if (tarefasDoProjeto.length > 0) {
    return res.status(400).json({
      erro: 'Não foi possível excluir o projeto',
      mensagem: 'Remova as tarefas associadas antes de excluir o projeto.',
    });
  }

  const projetoRemovido = excluirProjeto(id);

  if (!projetoRemovido) {
    return res.status(404).json({ erro: 'Projeto não encontrado', mensagem: 'Não existe projeto com o ID informado.' });
  }

  return res.status(200).json({ mensagem: 'Projeto excluído com sucesso.' });
}

export function listarTarefasPorProjetoController(req, res) {
  const id = req.params.id;
  const erroId = validarIdRecurso(id, 'projeto');

  if (erroId) {
    return res.status(400).json({ erro: 'Dados inválidos', mensagem: erroId });
  }

  const projeto = buscarProjetoPorId(id);

  if (!projeto) {
    return res.status(404).json({ erro: 'Projeto não encontrado', mensagem: 'Não existe projeto com o ID informado.' });
  }

  const tarefas = listarTarefasPorProjetoId(id);
  return res.status(200).json(tarefas);
}
