
const bancodedados = require('../bancodedados');

function listarContas (req,res){ 
  try {
    return res.status(200).json(bancodedados.contas);
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function criarConta(req, res) {
  try {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }


    const contaExistente = bancodedados.contas.find(
      (conta) => conta.usuario.cpf === cpf || conta.usuario.email === email
    );

    if (contaExistente) {
      return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF ou email informado' });
    }


    const numeroConta = (bancodedados.contas.length + 1).toString();

   
    const novaConta = {
      numero: numeroConta,
      saldo: 0,
      usuario: {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
      },
    };

    bancodedados.contas.push(novaConta);

    res.status(201).json({ mensagem: 'Conta criada com sucesso', novaConta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function atualizarUsuario(req, res) {
  try {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
      return res.status(400).json({ mensagem: 'Pelo menos um campo deve ser fornecido para atualização' });
    }

    const conta = bancodedados.contas.find((conta) => conta.numero === numeroConta);

    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }

    if (cpf) {
      const cpfExistente = bancodedados.contas.find(
        (conta) => conta.usuario.cpf === cpf && conta.numero !== numeroConta
      );
      if (cpfExistente) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado' });
      }
      conta.usuario.cpf = cpf;
    }

    if (email) {
      const emailExistente = bancodedados.contas.find(
        (conta) => conta.usuario.email === email && conta.numero !== numeroConta
      );
      if (emailExistente) {
        return res.status(400).json({ mensagem: 'O email informado já existe cadastrado' });
      }
      conta.usuario.email = email;
    }

    if (nome) {
      conta.usuario.nome = nome;
    }

    if (data_nascimento) {
      conta.usuario.data_nascimento = data_nascimento;
    }

    if (telefone) {
      conta.usuario.telefone = telefone;
    }

    if (senha) {
      conta.usuario.senha = senha;
    }

    res.status(201).json({ mensagem: "Conta atualizada com sucesso"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function excluirConta(req, res) {
  try {
    const { numeroConta } = req.params;


    const conta = bancodedados.contas.find((conta) => conta.numero === numeroConta);

    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }


    if (conta.saldo !== 0) {
      return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero' });
    }


    const indice = bancodedados.contas.indexOf(conta);
    bancodedados.contas.splice(indice, 1);

    res.status(201).json({mnesagem: "Conta excluída com sucesso"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function depositar(req, res) {
  try {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || valor === undefined) {
      return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios' });
    }


    const conta = bancodedados.contas.find((conta) => conta.numero === numero_conta);

    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }

 
    if (valor <= 0) {
      return res.status(400).json({ mensagem: 'O valor do depósito deve ser maior que zero' });
    }

    
    conta.saldo += valor;


    const registroDeposito = {
      data: new Date().toLocaleString("pt-br"),
      numero_conta,
      valor,
    };

    bancodedados.depositos.push(registroDeposito);


    res.status(200).json({ mensagem: 'Depósito realizado com sucesso', registroDeposito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function sacar(req, res) {
  try {
    const { numero_conta, valor, senha } = req.body;


    if (!numero_conta || valor === undefined || !senha) {
      return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios' });
    }


    const conta = bancodedados.contas.find((conta) => conta.numero === numero_conta);

    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }

   
    if (conta.usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha inválida' });
    }

  
    if (valor <= 0) {
      return res.status(400).json({ mensagem: 'O valor não pode ser menor ou igual a zero' });
    }

    if (conta.saldo < valor) {
      return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

    conta.saldo -= valor;

  
    const registroSaque = {
      data: new Date().toLocaleString("pt-br"),
      numero_conta,
      valor,
    };

    bancodedados.saques.push(registroSaque);

 
    res.status(200).json({ mensagem: 'Saque realizado com sucesso', registroSaque });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function transferir(req, res) {
  try {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  
    if (!numero_conta_origem || !numero_conta_destino || valor === undefined || !senha) {
      return res.status(400).json({ mensagem: 'Os números de conta, o valor e a senha são obrigatórios' });
    }


    const contaOrigem = bancodedados.contas.find((conta) => conta.numero === numero_conta_origem);
    const contaDestino = bancodedados.contas.find((conta) => conta.numero === numero_conta_destino);

    if (!contaOrigem || !contaDestino) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }

    if (contaOrigem.usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha inválida' });
    }

 
    if (contaOrigem.saldo < valor) {
      return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

  
    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registroTransferencia = {
      data: new Date().toLocaleString("pt-br"),
      numero_conta_origem,
      numero_conta_destino,
      valor,
    };

    bancodedados.transferencias.push(registroTransferencia);

  
    res.status(200).json({ mensagem: 'Transferência concluída com sucesso', registroTransferencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function consultarSaldo(req, res) {
  try {
    const { numero_conta, senha } = req.query;

   
    if (!numero_conta || !senha) {
      return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios' });
    }


    const conta = bancodedados.contas.find((conta) => conta.numero === numero_conta);

    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }

    if (conta.usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha inválida' });
    }


    res.status(200).json({ saldo: conta.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

function emitirExtrato(req, res) {
  try {
    const { numero_conta, senha } = req.query;

   
    if (!numero_conta || !senha) {
      return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios' });
    }

 
    const conta = bancodedados.contas.find((conta) => conta.numero === numero_conta);


    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta bancária não encontrada' });
    }


    if (conta.usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha inválida' });
    }

    
    const depositos = bancodedados.depositos.filter((deposito) => deposito.numero_conta === numero_conta);
    const saques = bancodedados.saques.filter((saque) => saque.numero_conta === numero_conta);
    const transferenciasEnviadas = bancodedados.transferencias.filter(
      (transferencia) => transferencia.numero_conta_origem === numero_conta
    );
    const transferenciasRecebidas = bancodedados.transferencias.filter(
      (transferencia) => transferencia.numero_conta_destino === numero_conta
    );

    const extrato = {
      depositos,
      saques,
      transferenciasEnviadas,
      transferenciasRecebidas,
    };

    res.status(200).json(extrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuario,
  excluirConta,
  depositar,
  sacar,
  transferir,
  consultarSaldo,
  emitirExtrato,
};