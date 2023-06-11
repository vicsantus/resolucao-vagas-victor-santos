const data = require('./fakeData');

module.exports = (req, res) => {
  const { name } = req.query;

  // Adicionei a quantidade de vezes que o elemento foi acessado no arquivo teste1.js e aqui pego ele e imprimo quantas vezes foi acessado.
  // Caso ele não tenha a chave no banco de dados, significa que não foi acessado, dai o ternario faz ele imprimir zero vezes acessado.
  return res.send(
    `Usuário ${name} foi lido ${data.access ? data.access : 0} vez(es).`
  );
};
