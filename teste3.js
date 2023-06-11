const data = require('./fakeData');

module.exports = function (req, res) {
  const { name } = req.query;

  // Para deixar o código antigo mais performatico bastava adicionar um break no laço for, porém, eu prefiro fazer usando forEach,
  // pois fica muito mais facil de ler o código

  // Esse código poderia ser utiliza também algum algoritmo de busca, porém, o requisito pede para deixar mais performatico, e um algoritmo
  // de busca mais avançado deixaria um teste com um db curto mais complexo e não menos.

  let found = false;

  data.forEach((obj) => {
    if (obj.name === name) {
      obj = null;
      found = true;
      return;
    }
  });

  if (found) {
    return res.send('success');
  }
  return res.send('Object not found');
};
