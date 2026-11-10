export const tarefas = [
  {
    id: 1,
    titulo: 'Desenvolver API REST',
    descricao: 'Criar rotas e controllers',
    concluida: false,
    projetoId: 1,
  },
  {
    id: 2,
    titulo: 'Criar documentação',
    descricao: 'Registrar endpoints e regras de negócio',
    concluida: false,
    projetoId: 1,
  },
  {
    id: 3,
    titulo: 'Organizar atividades semanais',
    descricao: 'Planejar os objetivos da semana',
    concluida: false,
    projetoId: 2,
  },
];

export function listarTarefas(filtros = {}) {
  let resultado = [...tarefas];

  if (filtros.projetoId !== undefined) {
    resultado = resultado.filter((tarefa) => tarefa.projetoId === Number(filtros.projetoId));
  }

  if (filtros.concluida !== undefined) {
    resultado = resultado.filter((tarefa) => tarefa.concluida === Boolean(filtros.concluida));
  }

  return resultado;
}

export function buscarTarefaPorId(id) {
  const tarefaId = Number(id);
  return tarefas.find((tarefa) => tarefa.id === tarefaId) ?? null;
}

export function cadastrarTarefa({ titulo, descricao, concluida, projetoId }) {
  const proximoId = tarefas.length > 0 ? Math.max(...tarefas.map((tarefa) => tarefa.id)) + 1 : 1;
  const novaTarefa = {
    id: proximoId,
    titulo,
    descricao,
    concluida,
    projetoId,
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

export function atualizarTarefa(id, { titulo, descricao, concluida, projetoId }) {
  const tarefa = buscarTarefaPorId(id);

  if (!tarefa) {
    return null;
  }

  tarefa.titulo = titulo;
  tarefa.descricao = descricao;
  tarefa.concluida = concluida;
  tarefa.projetoId = projetoId;

  return tarefa;
}

export function excluirTarefa(id) {
  const tarefaId = Number(id);
  const indice = tarefas.findIndex((tarefa) => tarefa.id === tarefaId);

  if (indice === -1) {
    return false;
  }

  tarefas.splice(indice, 1);
  return true;
}

export function listarTarefasPorProjetoId(projetoId) {
  return tarefas.filter((tarefa) => tarefa.projetoId === Number(projetoId));
}

export function tarefaExiste(id) {
  return buscarTarefaPorId(id) !== null;
}
