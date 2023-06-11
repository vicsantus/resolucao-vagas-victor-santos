let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let teste1 = require('./teste1');
let teste2 = require('./teste2');
let teste3 = require('./teste3');
let teste4 = require('./teste4');
let teste5 = require('./teste5');

const { verifyToken } = require('./middleware/Auth');

app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function (_req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.get('/user', teste1.getUser);
app.get('/users', teste1.getUsers);

// ******** ATENÇÃO - Para ter acesso as rotas delete e put, é necessário fazer cadastro na rota post /users, anotar o token e coloca-lo no
// header Authorization das rotas delete e put de /users **********
app.post('/users', teste2);
app.delete('/users', verifyToken, teste3);
app.put('/users', verifyToken, teste4);
app.get('/users/access', teste5);

const port = 3000;
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
