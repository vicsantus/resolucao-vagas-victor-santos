const data = require('./fakeData');

module.exports = (req, res) => {
  const { id } = req.query;
  const { name, job } = req.body; // Pega name e job de dentro do body

  // Caso não encontre name, job ou o id retorna um erro.
  if (!name || !job || !id) {
    return res.send({ Error: 'Name, Job ou id não encontrados na requisição' });
  }

  // Aqui tambem poderia ser usado algum algoritmo mais complexo, porém, a função find tem complexidade O(n)
  let reg = data.find((user) => user.id == id);

  // Caso não encontre id não seja encontrado.
  if (!reg) {
    return res.send({ Error: 'Id não encontrado' });
  }

  // Utilizando spread fica mais facil e mais intuitivo de ler o código
  reg = { ...reg, name, job };

  return res.send(reg);
};
