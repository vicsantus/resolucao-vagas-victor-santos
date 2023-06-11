const jwt = require('jsonwebtoken');

// Aqui eu posso pegar a chave da varial de sistema ou pegar como string
const secret = process.env.JWT_SECRET || 'secret_key';

// Essa função cria um token para acesso por 24h, porém pode ser menos tempo. E então retorna esse token, o qual eu sugiro anotar ao
// criar novo usuário na rota app.post('/users', teste2), pois, senão não vai ser possivel acessar os testes 4 e 3

const createToken = (data) => {
  const JWT_CONFIG = {
    algorithm: 'HS256', // Aqui pode ser mudado o algoritmo de "codificação" do token
    expiresIn: '24h', // Aqui pode ser mudado a expiração do token
  };

  const token = jwt.sign({ data }, secret, JWT_CONFIG);
  return token;
};

const verifyToken = (req, res, next) => {
  // Função tenta pegar authorization do header da requisição. Caso não exista, retorna erro.
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: 'Token not found' });

    // Caso autorization exista ele verifica o token e após testado segue o curso da aplicação caso esteja ok, ou retorna erro
    const token = jwt.verify(authorization, secret);
    req.data = token.data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
