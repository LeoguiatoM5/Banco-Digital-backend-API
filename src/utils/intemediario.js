const bancodedados = require("../bancodedados");



function autenticarSenhaBanco(req, res, next) {
  try {
    const { senha } = req.query;

    if (!senha) {
      return res.status(400).json({ sucesso: false, mensagem: 'A senha do banco é obrigatória!' });
    }

    if (senha !== bancodedados.banco.senha) {
      return res.status(403).json({ sucesso: false, mensagem: 'A senha do banco informada é inválida!' });
    }

    next();
  } catch (error) {
  
    console.error('Erro na função autenticarSenhaBanco:', error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
  }
}
  module.exports = {
    autenticarSenhaBanco,
  };