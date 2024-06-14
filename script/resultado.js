// Função para carregar os dados armazenados
function carregarDados() {
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
    return solicitacoes;
}

// Função para filtrar os resultados com base nos filtros aplicados
function filtrarResultados() {
    const pesquisa = document.getElementById('filtro-pesquisa').value.toLowerCase();
    const dataFiltro = document.getElementById('filtro-data').value;
    const statusFiltro = document.getElementById('filtro-status').value.toLowerCase();

    const solicitacoes = carregarDados();

    const resultadosFiltrados = solicitacoes.filter(item => {
        const atendePesquisa = pesquisa ? 
            item.solicitacao.includes(pesquisa) : true;
        const atendeData = dataFiltro ? item.data === dataFiltro : true;
        const atendeStatus = statusFiltro ? item.status.toLowerCase() === statusFiltro : true;

        return atendePesquisa && atendeData && atendeStatus;
    });

    renderizarTabela(resultadosFiltrados);
}

// Função para renderizar a tabela com os dados
function renderizarTabela(dados) {
    const tbody = document.querySelector('#tabela-resultados tbody');
    tbody.innerHTML = ''; // Limpar conteúdo atual

    dados.forEach(item => {
        const tr = document.createElement('tr');

        const tdSolicitacao = document.createElement('td');
        tdSolicitacao.textContent = item.solicitacao;

        const tdNome = document.createElement('td');
        tdNome.textContent = item.nome;

        const tdData = document.createElement('td');
        tdData.textContent = item.data;

        const tdCategoria = document.createElement('td');
        tdCategoria.textContent = item.categoria;

        const tdStatus = document.createElement('td');
        const spanStatus = document.createElement('span');
        spanStatus.textContent = item.status.charAt(0).toUpperCase() + item.status.slice(1);
        spanStatus.className = `status ${item.status.replace(/\s+/g, '-').toLowerCase()}`;
        tdStatus.appendChild(spanStatus);

        tr.appendChild(tdSolicitacao);
        tr.appendChild(tdNome);
        tr.appendChild(tdData);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdStatus);

        tbody.appendChild(tr);
    });
}

// Adiciona event listeners para os filtros
document.getElementById('btn-pesquisar').addEventListener('click', filtrarResultados);
document.getElementById('filtro-data').addEventListener('change', filtrarResultados);
document.getElementById('filtro-status').addEventListener('change', filtrarResultados);

// Renderizar tabela inicialmente com todos os dados
renderizarTabela(carregarDados());
