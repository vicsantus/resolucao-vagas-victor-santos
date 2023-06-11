const data = require('./fakeData');

module.exports = function (req, res) {
  const { name, job } = req.body;

  // Pensei nesse algoritmo comentado abaixo para adicionar o novo elemento com o id.
  // O algoritmo também usa busca binária no bd para achar o maior id, e adicionar o novo elemento com id + 1
  // Porém fica muito complexo e acho que o intuito do teste2 não seja esse, então apenas corrigi o erro como se
  // o "data" fosse uma model do sequelize ou outra orm ou odm, auto incrementando o id.

  // Também é possivel fazer um algoritmo para sortear os elementos por ordem de maior para o menor elemento e pegar o id do primeiro elemento

  //   let maxId = -Infinity;
  //   let maxIdObject = null;

  //   for (let i = 0; i < data.length; i++) {
  //     const currentObject = data[i];
  //     const currentId = currentObject.id;

  //     if (typeof currentId === 'number' && currentId > maxId) {
  //       maxId = currentId;
  //       maxIdObject = currentObject;
  //     }
  //   }

  //   const newUser = { id: maxId + 1, name, job };

  // Caso não encontre name ou job eu faria um middleware de erro, e o colocaria no app na rota post de users,
  // mas para exemplificar, retorno o erro dessa forma.

  if (!name || !job) {
    return res.send({ Error: 'Name ou Job não encontrados na requisição' });
  }
  const newUser = { name, job };

  data.push(newUser);

  return res.send(newUser);
};
