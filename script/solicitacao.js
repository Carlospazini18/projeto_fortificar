// Função para gerar um ID único
function gerarIdUnico() {
    return 'sol-' + Math.random().toString(36).substr(2, 9);
}

// Função para capturar dados e armazená-los localmente
function storeFormData(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Capturar valores dos inputs
    let solicitacao = document.getElementById('solicitacao')?.value || '';
    let nome = document.getElementById('nome')?.value || '';
    let status = document.getElementById('status')?.value || '';
    let date = document.getElementById('date')?.value || '';
    let time = document.getElementById('time')?.value || '';
    let amount = document.getElementById('amount')?.value || '';
    let confirmAgendamento = document.querySelector('input[name="confirm-agendamento"]:checked')?.value || '';
    let confirmDoacao = document.querySelector('input[name="confirm-doacao"]:checked')?.value || '';
    let area = document.getElementById('area')?.value || '';

    // Verificar se os campos obrigatórios estão preenchidos
    if (!solicitacao || !nome || !status) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Armazenar os dados no localStorage
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];

    // Verificar se o ID já existe
    let idExistente = solicitacoes.some(item => item.solicitacao === solicitacao);

    if (idExistente) {
        alert("O ID da solicitação já existe. Por favor, insira um ID único.");
        return;
    }

    // Gerar um ID único para a solicitação
    let idUnico = gerarIdUnico();

    // Capturar os dados como um objeto
    let dadosSolicitacao = {
        id: idUnico,
        solicitacao: solicitacao,
        nome: nome,
        data: date,
        hora: time,
        categoria: document.querySelector('input[name="categoria"]')?.value || '',
        status: status,
        valor: amount,
        confirmAgendamento: confirmAgendamento,
        confirmDoacao: confirmDoacao,
        area: area
    };

    solicitacoes.push(dadosSolicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    // Exemplo de como acessar os dados
    console.log("Solicitações armazenadas:", solicitacoes);

    // Opcional: resetar o formulário após salvar os dados
    document.getElementById('form-solicitacao').reset();
}

// Função para buscar dados pelo número de solicitação
function buscarSolicitacao() {
    let solicitacaoNum = document.getElementById('solicitacao').value;
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];

    let solicitacaoEncontrada = solicitacoes.find(item => item.solicitacao === solicitacaoNum);

    if (solicitacaoEncontrada) {
        document.getElementById('nome').value = solicitacaoEncontrada.nome;
        document.getElementById('status').value = solicitacaoEncontrada.status;
        document.getElementById('date').value = solicitacaoEncontrada.data;
        document.getElementById('time').value = solicitacaoEncontrada.hora;
        document.getElementById('amount').value = solicitacaoEncontrada.valor;
        document.querySelector(`input[name="confirm-agendamento"][value="${solicitacaoEncontrada.confirmAgendamento}"]`).checked = true;
        document.querySelector(`input[name="confirm-doacao"][value="${solicitacaoEncontrada.confirmDoacao}"]`).checked = true;
        document.getElementById('area').value = solicitacaoEncontrada.area;
    } else {
        alert("Solicitação não encontrada.");
    }
}

// Função para atualizar os dados de uma solicitação existente
function atualizarSolicitacao(event) {
    event.preventDefault();

    let solicitacaoNum = document.getElementById('solicitacao').value;
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];

    let index = solicitacoes.findIndex(item => item.solicitacao === solicitacaoNum);

    if (index !== -1) {
        solicitacoes[index].nome = document.getElementById('nome').value;
        solicitacoes[index].status = document.getElementById('status').value;
        solicitacoes[index].data = document.getElementById('date').value;
        solicitacoes[index].hora = document.getElementById('time').value;
        solicitacoes[index].valor = document.getElementById('amount').value;
        solicitacoes[index].confirmAgendamento = document.querySelector('input[name="confirm-agendamento"]:checked')?.value || '';
        solicitacoes[index].confirmDoacao = document.querySelector('input[name="confirm-doacao"]:checked')?.value || '';
        solicitacoes[index].area = document.getElementById('area').value;

        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
        alert("Solicitação atualizada com sucesso.");
    } else {
        alert("Solicitação não encontrada.");
    }
}

// Função para deletar uma solicitação
function deletarSolicitacao(event) {
    event.preventDefault();

    let solicitacaoNum = document.getElementById('solicitacao').value;
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];

    let index = solicitacoes.findIndex(item => item.solicitacao === solicitacaoNum);

    if (index !== -1) {
        solicitacoes.splice(index, 1); // Remove a solicitação do array
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
        alert("Solicitação deletada com sucesso.");
        document.getElementById('form-solicitacao').reset(); // Opcional: resetar o formulário
    } else {
        alert("Solicitação não encontrada.");
    }
}

// Adiciona um listener para o botão "enviar"
document.getElementById('btn-enviar').addEventListener('click', storeFormData);

// Adiciona um listener para o botão "buscar"
document.getElementById('btn-buscar').addEventListener('click', buscarSolicitacao);

// Adiciona um listener para o botão "atualizar"
document.getElementById('btn-atualizar').addEventListener('click', atualizarSolicitacao);

// Adiciona um listener para o botão "deletar"
document.getElementById('btn-deletar').addEventListener('click', deletarSolicitacao);

// Função para alternar o menu dropdown
function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');
}

// Função para fechar o menu dropdown
function closeDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
}

// Função para selecionar uma opção do dropdown
function selectOption(event) {
    let selectedOption = event.target.innerText;
    document.getElementById('status').value = selectedOption;
    closeDropdown();
}

// Adicionar evento de clique ao botão do dropdown
document.querySelector('.dropdown-button').addEventListener('click', toggleDropdown);

// Adicionar evento de clique a cada item do menu
document.querySelectorAll('.dropdown-menu li').forEach(function(item) {
    item.addEventListener('click', selectOption);
});

// Fechar dropdown se clicar fora
document.addEventListener('click', function(event) {
    if (!event.target.closest('.status-dropdown')) {
        closeDropdown();
    }
});
