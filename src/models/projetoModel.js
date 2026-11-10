export const projetos = [
  {
    id: 1,
    nome: 'Trabalho da faculdade',
    descricao: 'Atividade de Programação Web II',
    status: 'Em andamento',
  },
  {
    id: 2,
    nome: 'Organização pessoal',
    descricao: 'Planejamento de atividades diárias e semanais',
    status: 'Pendente',
  },
];

export function listarProjetos() {
  return projetos;
}

export function buscarProjetoPorId(id) {
  const projetoId = Number(id);
  return projetos.find((projeto) => projeto.id === projetoId) ?? null;
}

export function cadastrarProjeto({ nome, descricao, status }) {
  const proximoId = projetos.length > 0 ? Math.max(...projetos.map((projeto) => projeto.id)) + 1 : 1;
  const novoProjeto = {
    id: proximoId,
    nome,
    descricao,
    status,
  };

  projetos.push(novoProjeto);
  return novoProjeto;
}

export function atualizarProjeto(id, { nome, descricao, status }) {
  const projeto = buscarProjetoPorId(id);

  if (!projeto) {
    return null;
  }

  projeto.nome = nome;
  projeto.descricao = descricao;
  projeto.status = status;

  return projeto;
}

export function excluirProjeto(id) {
  const projetoId = Number(id);
  const indice = projetos.findIndex((projeto) => projeto.id === projetoId);

  if (indice === -1) {
    return false;
  }

  projetos.splice(indice, 1);
  return true;
}

export function projetoExiste(id) {
  return buscarProjetoPorId(id) !== null;
}
