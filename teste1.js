const data = require('./fakeData');
// Retirei todos os "var"s por conta de fugir do escopo. Esse padrão segue para dos os outros testes.

// Coloquei underline _ em todos os argumentos chamados mas não utilizados. Esse padrão segue para dos os outros testes.
const getUser = (req, res, _next) => {
  const { name } = req.query;

  // Decidi utilizar um algoritmo de busca binário de complexidade O(log n) pois num bd curto como do exemplo, um simples algoritmo de busca
  // ordenada (O(n)) resolveria, porém, numa aplicação muito maior busca binária é muito mais escalavel.
  let low = 0;
  let high = data.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let midName = data[mid].name;

    if (midName === name) {
      // Adicionado ternário que supostamente adiciona a chave access dentro do banco de dados para saber quantas vezes o usuario foi acessado
      data[mid].access = data[mid].access ? data[mid].access++ : 1;

      return res.send(data[mid]);
    } else if (midName < name) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return res.send({ error: 'Nome não encontrado' });
};

const getUsers = (_req, res, _next) => {
  return res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
