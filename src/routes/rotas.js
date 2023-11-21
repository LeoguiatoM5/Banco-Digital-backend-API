const express = require('express');
const router = express.Router();
const contasController = require('../controllers/contasController');
const intermediarios = require('../utils/intermediarios');


router.get('/contas', intermediarios.autenticarSenhaBanco, contasController.listarContas);


router.post('/contas', contasController.criarConta);


router.put('/contas/:numeroConta/usuario', contasController.atualizarUsuario);


router.delete('/contas/:numeroConta',  contasController.excluirConta);

router.post('/transacoes/depositar',  contasController.depositar);


router.post('/transacoes/sacar',  contasController.sacar);


router.post('/transacoes/transferir', contasController.transferir);


router.get('/contas/saldo', contasController.consultarSaldo);


router.get('/contas/extrato',  contasController.emitirExtrato);

module.exports = router;