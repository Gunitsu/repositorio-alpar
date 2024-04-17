class ContaBancaria {
    constructor() {
        this.transacoes = [];
    }

    depositar(saldo, valor) {
        if (!validarValor(valor)) {
            return false;
        }
        saldo += valor;
        this.transacoes.push({ tipo: 'Depósito', valor: valor });
        return saldo;
    }

    sacar(saldo, valor) {
        if (!validarValor(valor) || saldo < valor) {
            return false;
        }
        saldo -= valor;
        this.transacoes.push({ tipo: 'Saque', valor: valor });
        return saldo;
    }

    obterExtrato() {
        return this.transacoes;
    }
}

const conta = new ContaBancaria();
let saldoAtual = 0; // Variável para armazenar o saldo atual

document.getElementById("depositBtn").addEventListener("click", function () {
    const valor = parseFloat(document.getElementById("amount").value);
    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor válido para depósito.");
    } else {
        saldoAtual = conta.depositar(saldoAtual, valor);
        if (saldoAtual !== false) {
            atualizarSaldo(saldoAtual);
            alert("Depósito realizado com sucesso!");
        } else {
            alert("Ocorreu um erro ao tentar realizar o depósito.");
        }
    }
});

document.getElementById("withdrawBtn").addEventListener("click", function () {
    const valor = parseFloat(document.getElementById("amount").value);
    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor válido para saque.");
    } else {
        saldoAtual = conta.sacar(saldoAtual, valor);
        if (saldoAtual !== false) {
            atualizarSaldo(saldoAtual);
            alert("Saque realizado com sucesso!");
        } else {
            alert("Saldo insuficiente ou valor inválido para saque.");
        }
    }
});

document.getElementById("statementBtn").addEventListener("click", function () {
    exibirExtrato();
});

function validarValor(valor) {
    return !isNaN(valor) && parseFloat(valor) > 0;
}

function atualizarSaldo(saldo) {
    const saldoElemento = document.getElementById("total");
    saldoElemento.textContent = "R$ " + saldo.toFixed(2);
}

function exibirExtrato() {
    const extratoElemento = document.getElementById("extrato");
    const transactionListElement = document.getElementById("transaction-list");

    // Limpar o conteúdo atual do extrato
    transactionListElement.innerHTML = '';

    // Obter o extrato da conta bancária
    const extrato = conta.obterExtrato();

    // Adicionar cada transação ao extrato
    extrato.forEach(function (transacao) {
        const li = document.createElement("li");
        li.textContent = `${transacao.tipo}: R$ ${transacao.valor.toFixed(2)}`;
        transactionListElement.appendChild(li);
    });

    // Exibir o extrato
    extratoElemento.style.display = "block";
}