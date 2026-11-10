const STATUS_PERMITIDOS = ['Em andamento', 'Concluído', 'Pendente'];

export function validarTextoObrigatorio(valor, nomeCampo) {
  if (valor === undefined || valor === null || String(valor).trim() === '') {
    return `O ${nomeCampo} é obrigatório.`;
  }

  return null;
}

export function validarStatusProjeto(status) {
  if (!status || !STATUS_PERMITIDOS.includes(status)) {
    return 'O status do projeto deve ser "Em andamento", "Concluído" ou "Pendente".';
  }

  return null;
}

export function validarProjeto(dados) {
  const erros = [];
  const nome = dados?.nome;
  const descricao = dados?.descricao;
  const status = dados?.status;

  const erroNome = validarTextoObrigatorio(nome, 'nome do projeto');
  const erroDescricao = validarTextoObrigatorio(descricao, 'descrição do projeto');
  const erroStatus = validarStatusProjeto(status);

  if (erroNome) erros.push(erroNome);
  if (erroDescricao) erros.push(erroDescricao);
  if (erroStatus) erros.push(erroStatus);

  if (erros.length > 0) {
    return {
      valido: false,
      erros,
      dados: null,
    };
  }

  return {
    valido: true,
    erros: [],
    dados: {
      nome: String(nome).trim(),
      descricao: String(descricao).trim(),
      status,
    },
  };
}

export function validarIdRecurso(id, nomeRecurso) {
  const valor = Number(id);

  if (!Number.isInteger(valor) || valor <= 0) {
    return `O ID do ${nomeRecurso} deve ser um número inteiro positivo.`;
  }

  return null;
}

export function validarTarefa(dados) {
  const erros = [];
  const titulo = dados?.titulo;
  const descricao = dados?.descricao;
  const concluida = dados?.concluida;
  const projetoId = dados?.projetoId;

  const erroTitulo = validarTextoObrigatorio(titulo, 'título da tarefa');
  const erroDescricao = validarTextoObrigatorio(descricao, 'descrição da tarefa');

  if (erroTitulo) erros.push(erroTitulo);
  if (erroDescricao) erros.push(erroDescricao);

  if (concluida === undefined || typeof concluida !== 'boolean') {
    erros.push('O campo concluida é obrigatório e deve ser booleano.');
  }

  const projetoIdValor = Number(projetoId);
  if (projetoId === undefined || !Number.isInteger(projetoIdValor) || projetoIdValor <= 0) {
    erros.push('O campo projetoId é obrigatório e deve ser um número inteiro positivo.');
  }

  if (erros.length > 0) {
    return {
      valido: false,
      erros,
      dados: null,
    };
  }

  return {
    valido: true,
    erros: [],
    dados: {
      titulo: String(titulo).trim(),
      descricao: String(descricao).trim(),
      concluida,
      projetoId: projetoIdValor,
    },
  };
}

export function validarFiltroTarefaQuery(query = {}) {
  const erros = [];
  const filtros = {};

  if (query.projetoId !== undefined) {
    const valor = Number(query.projetoId);
    if (!Number.isInteger(valor) || valor <= 0) {
      erros.push('O filtro projetoId deve ser um número inteiro positivo.');
    } else {
      filtros.projetoId = valor;
    }
  }

  if (query.concluida !== undefined) {
    const valor = String(query.concluida).toLowerCase();
    if (valor === 'true') {
      filtros.concluida = true;
    } else if (valor === 'false') {
      filtros.concluida = false;
    } else {
      erros.push('O filtro concluida deve ser "true" ou "false".');
    }
  }

  return {
    valido: erros.length === 0,
    erros,
    filtros,
  };
}
