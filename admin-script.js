// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    carregarDashboard();
    carregarClientes();
    carregarCheckins();
    carregarFidelidade();
});

// Navegação entre seções
function showSection(sectionName) {
    // Remover active de todas as seções e navItems
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Ativar seção e navItem corretos
    document.getElementById(sectionName + '-section').classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
    
    // Atualizar título
    const titles = {
        'overview': ['Visão Geral', 'Dashboard de gestão da barbearia'],
        'clientes': ['Clientes', 'Gestão de todos os clientes cadastrados'],
        'checkins': ['Check-ins', 'Histórico de atendimentos realizados'],
        'fidelidade': ['Fidelidade', 'Programa de pontos e recompensas'],
        'relatorios': ['Relatórios', 'Análises e estatísticas detalhadas']
    };
    
    document.getElementById('page-title').textContent = titles[sectionName][0];
    document.getElementById('page-subtitle').textContent = titles[sectionName][1];
}

// Carregar Overview
function carregarDashboard() {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const totalClientes = Object.keys(clientes).length;
    let totalVisitas = 0;
    let totalPontos = 0;
    
    // Calcular totais
    for (let id in clientes) {
        totalVisitas += clientes[id].totalVisitas;
        totalPontos += clientes[id].pontos;
    }
    
    const faturamentoEstimado = totalVisitas * 30; // R$30 média
    
    // Atualizar stats
    document.getElementById('totalClientes').textContent = totalClientes;
    document.getElementById('totalVisitas').textContent = totalVisitas;
    document.getElementById('faturamento').textContent = 'R$ ' + faturamentoEstimado.toLocaleString('pt-BR');
    document.getElementById('pontosDistribuidos').textContent = totalPontos;
    
    // Top 5 clientes
    const clientesArray = Object.values(clientes).sort((a, b) => b.pontos - a.pontos).slice(0, 5);
    const topClientesHtml = clientesArray.map((cliente, index) => `
        <div class="ranking-item">
            <div class="ranking-position">${index + 1}</div>
            <div class="ranking-info">
                <strong>${cliente.nome}</strong>
                <span>${cliente.totalVisitas} visitas</span>
            </div>
            <div class="ranking-points">${cliente.pontos} pts</div>
        </div>
    `).join('');
    
    document.getElementById('topClientes').innerHTML = topClientesHtml || '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Nenhum cliente cadastrado ainda</p>';
    
    // Atividades recentes
    const atividades = [];
    for (let id in clientes) {
        const cliente = clientes[id];
        if (cliente.historico && cliente.historico.length > 0) {
            cliente.historico.forEach(h => {
                atividades.push({
                    ...h,
                    nomeCliente: cliente.nome
                });
            });
        }
    }
    
    const atividadesRecentes = atividades.sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 5);
    const atividadesHtml = atividadesRecentes.map(ativ => {
        const data = new Date(ativ.data);
        const dataFormatada = data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        
        return `
            <div class="activity-item">
                <div class="activity-icon">✂️</div>
                <div class="activity-content">
                    <strong>${ativ.nomeCliente}</strong> realizou um atendimento e ganhou <strong>${ativ.pontos} pontos</strong>
                    <div class="activity-time">${dataFormatada}</div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('recentActivity').innerHTML = atividadesHtml || '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Nenhuma atividade ainda</p>';
}

// Carregar tabela de clientes
function carregarClientes() {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const clientesArray = Object.values(clientes);
    
    const tbody = document.getElementById('clientesTableBody');
    
    if (clientesArray.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">Nenhum cliente cadastrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = clientesArray.map(cliente => {
        const dataCadastro = new Date(cliente.dataCadastro).toLocaleDateString('pt-BR');
        
        return `
            <tr>
                <td><strong>${cliente.nome}</strong></td>
                <td>${dataCadastro}</td>
                <td>${cliente.ultimaVisita || '-'}</td>
                <td>${cliente.totalVisitas}</td>
                <td><strong>${cliente.pontos} pts</strong></td>
                <td class="table-actions">
                    <button class="btn-action" onclick="verCliente('${cliente.id}')" title="Ver detalhes">👁️</button>
                    <button class="btn-action" onclick="editarCliente('${cliente.id}')" title="Editar">✏️</button>
                    <button class="btn-action" onclick="excluirCliente('${cliente.id}')" title="Excluir">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Buscar clientes
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchClientes');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            const rows = document.querySelectorAll('#clientesTableBody tr');
            
            rows.forEach(row => {
                const nome = row.querySelector('td:first-child')?.textContent.toLowerCase();
                if (nome && nome.includes(termo)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});

// Carregar check-ins
function carregarCheckins() {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    
    // Calcular stats
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    let checkinsHoje = 0;
    let checkinsSemana = 0;
    let checkinsMes = 0;
    
    const historicoCompleto = [];
    
    for (let id in clientes) {
        const cliente = clientes[id];
        if (cliente.historico) {
            cliente.historico.forEach(h => {
                const dataCheckin = new Date(h.data);
                dataCheckin.setHours(0, 0, 0, 0);
                
                if (dataCheckin.getTime() === hoje.getTime()) checkinsHoje++;
                if (dataCheckin >= inicioSemana) checkinsSemana++;
                if (dataCheckin >= inicioMes) checkinsMes++;
                
                historicoCompleto.push({
                    ...h,
                    nomeCliente: cliente.nome
                });
            });
        }
    }
    
    document.getElementById('checkinsHoje').textContent = checkinsHoje;
    document.getElementById('checkinsSemana').textContent = checkinsSemana;
    document.getElementById('checkinsMes').textContent = checkinsMes;
    
    // Histórico
    const historicoOrdenado = historicoCompleto.sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 20);
    
    const tbody = document.getElementById('checkinsHistorico');
    tbody.innerHTML = historicoOrdenado.map(h => {
        const data = new Date(h.data);
        const dataFormatada = data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        
        return `
            <tr>
                <td>${dataFormatada}</td>
                <td><strong>${h.nomeCliente}</strong></td>
                <td>${h.tipo === 'visita' ? 'Atendimento' : 'Check-in'}</td>
                <td><strong>+${h.pontos} pts</strong></td>
            </tr>
        `;
    }).join('');
}

// Carregar fidelidade
function carregarFidelidade() {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const clientesArray = Object.values(clientes);
    
    if (clientesArray.length === 0) {
        document.getElementById('premiosResgatados').textContent = '0';
        document.getElementById('taxaAdesao').textContent = '0%';
        document.getElementById('pontosMedias').textContent = '0';
        return;
    }
    
    // Calcular métricas
    const totalPontos = clientesArray.reduce((sum, c) => sum + c.pontos, 0);
    const pontosMedias = Math.round(totalPontos / clientesArray.length);
    
    document.getElementById('premiosResgatados').textContent = '0'; // Implementar resgate depois
    document.getElementById('taxaAdesao').textContent = '100%';
    document.getElementById('pontosMedias').textContent = pontosMedias;
    
    // Clientes próximos de resgatar
    const proximosResgate = clientesArray
        .filter(c => c.pontos >= 7)
        .sort((a, b) => b.pontos - a.pontos)
        .slice(0, 10);
    
    const proximosHtml = proximosResgate.map(cliente => {
        const progresso = Math.min((cliente.pontos / 10) * 100, 100);
        const faltam = Math.max(10 - cliente.pontos, 0);
        
        return `
            <div class="proximity-item">
                <strong>${cliente.nome}</strong>
                <div class="proximity-progress">
                    <div class="proximity-progress-bar" style="width: ${progresso}%"></div>
                </div>
                <span class="proximity-points">${cliente.pontos}/10 pts ${faltam > 0 ? `(faltam ${faltam})` : '✅ Pode resgatar!'}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('clientesProximosResgate').innerHTML = proximosHtml || '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Nenhum cliente próximo de resgatar</p>';
}

// Funções de ação
function abrirCheckInAdmin() {
    window.location.href = 'index.html#agendar';
}

function verCliente(id) {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const cliente = clientes[id];
    
    if (!cliente) return;
    
    alert(`📋 Detalhes do Cliente\n\n` +
          `Nome: ${cliente.nome}\n` +
          `Cadastro: ${new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}\n` +
          `Última Visita: ${cliente.ultimaVisita || 'Nunca'}\n` +
          `Total de Visitas: ${cliente.totalVisitas}\n` +
          `Pontos: ${cliente.pontos}\n` +
          `Histórico: ${cliente.historico.length} registros`);
}

function editarCliente(id) {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const cliente = clientes[id];
    
    if (!cliente) return;
    
    const novoNome = prompt('Novo nome do cliente:', cliente.nome);
    if (novoNome && novoNome.trim() !== '') {
        cliente.nome = novoNome.trim();
        clientes[id] = cliente;
        localStorage.setItem('barbear14_clientes', JSON.stringify(clientes));
        carregarClientes();
        carregarDashboard();
    }
}

function excluirCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?\n\nEsta ação não pode ser desfeita!')) {
        return;
    }
    
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    delete clientes[id];
    localStorage.setItem('barbear14_clientes', JSON.stringify(clientes));
    
    carregarClientes();
    carregarDashboard();
    carregarCheckins();
    carregarFidelidade();
    
    alert('✅ Cliente excluído com sucesso!');
}

function exportarClientes() {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const clientesArray = Object.values(clientes);
    
    if (clientesArray.length === 0) {
        alert('Nenhum cliente para exportar!');
        return;
    }
    
    // Criar CSV
    let csv = 'Nome,Cadastro,Última Visita,Total Visitas,Pontos\n';
    clientesArray.forEach(c => {
        csv += `"${c.nome}",${new Date(c.dataCadastro).toLocaleDateString('pt-BR')},"${c.ultimaVisita || '-'}",${c.totalVisitas},${c.pontos}\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barbear14_clientes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function gerarRelatorio() {
    alert('📊 Funcionalidade de relatórios em desenvolvimento!\n\nEm breve você poderá gerar relatórios personalizados por período.');
}

console.log('%c💈 BARBEAR14 Admin Dashboard', 'font-size: 20px; font-weight: bold; color: #1e2942;');
console.log('%cSistema de Gestão Ativo', 'font-size: 12px; color: #7a8a9e;');
