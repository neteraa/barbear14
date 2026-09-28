// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    }
    
    lastScroll = currentScroll;
});

// Configurar data mínima (hoje)
const dataInput = document.getElementById('data');
const today = new Date().toISOString().split('T')[0];
dataInput.setAttribute('min', today);

// Horários disponíveis
const horarios = {
    'seg-sex': [
        '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:30', '14:00', '14:30', '15:00', '15:30', 
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ],
    'sab': [
        '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ],
    'dom': []
};

// Atualizar horários quando selecionar data
dataInput.addEventListener('change', function() {
    const horarioSelect = document.getElementById('horario');
    const selectedDate = new Date(this.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    
    // Limpar opções anteriores
    horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
    
    let availableHorarios = [];
    
    // Domingo = 0, Sábado = 6
    if (dayOfWeek === 0) {
        horarioSelect.innerHTML = '<option value="">Fechado aos domingos</option>';
        horarioSelect.disabled = true;
        return;
    } else if (dayOfWeek === 6) {
        availableHorarios = horarios['sab'];
    } else {
        availableHorarios = horarios['seg-sex'];
    }
    
    horarioSelect.disabled = false;
    
    // Adicionar horários disponíveis
    availableHorarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        horarioSelect.appendChild(option);
    });
});

// Função para agendar serviço (botões dos cards)
function agendarServico(servicoNome) {
    const servicoSelect = document.getElementById('servico');
    
    // Encontrar o valor correto no select
    for (let option of servicoSelect.options) {
        if (option.text.includes(servicoNome)) {
            servicoSelect.value = option.value;
            break;
        }
    }
    
    // Scroll suave para seção de agendamento
    document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight do campo por 2 segundos
    servicoSelect.style.transition = 'all 0.3s';
    servicoSelect.style.borderColor = '#d4af37';
    servicoSelect.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)';
    
    setTimeout(() => {
        servicoSelect.style.borderColor = '';
        servicoSelect.style.boxShadow = '';
    }, 2000);
}

// Formatar telefone
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    e.target.value = value;
});

// Submit do formulário
const agendamentoForm = document.getElementById('agendamentoForm');
agendamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const observacoes = document.getElementById('observacoes').value;
    
    // Validações
    if (!nome || !telefone || !servico || !data || !horario) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Formatar data para BR
    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    // Descobrir dia da semana
    const date = new Date(data + 'T00:00:00');
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaSemana = diasSemana[date.getDay()];
    
    // Montar mensagem para WhatsApp
    let mensagem = `🔵 *AGENDAMENTO - BARBEARIA JORGE RODRIGUES* 💈\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n`;
    mensagem += `✂️ *Serviço:* ${servico}\n`;
    mensagem += `📅 *Data:* ${diaSemana}, ${dataFormatada}\n`;
    mensagem += `⏰ *Horário:* ${horario}\n`;
    
    if (observacoes) {
        mensagem += `📝 *Observações:* ${observacoes}\n`;
    }
    
    mensagem += `\n_Aguardo confirmação! 🙏_`;
    
    // Número do WhatsApp
    const whatsappNumber = '5515998183520'; // Formato: 55 + DDD + Número (Itapeva-SP = DDD 15)
    
    // Codificar mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagem);
    
    // Montar URL do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Feedback visual
    showSuccessMessage();
    
    // Limpar formulário após 2 segundos
    setTimeout(() => {
        agendamentoForm.reset();
    }, 2000);
});

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        max-width: 350px;
    `;
    
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 2rem;">✅</div>
            <div>
                <strong style="display: block; margin-bottom: 5px;">Redirecionando para WhatsApp...</strong>
                <span style="font-size: 0.9rem;">Complete seu agendamento pelo WhatsApp!</span>
            </div>
        </div>
    `;
    
    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 5000);
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.servico-card, .contato-item, .sobre-text, .sobre-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Preload: Fazer aparecer elementos já visíveis
window.addEventListener('load', () => {
    document.querySelectorAll('.servico-card, .contato-item, .sobre-text, .sobre-image').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Easter egg: Double click no logo
let logoClicks = 0;
document.querySelector('.logo').addEventListener('click', () => {
    logoClicks++;
    if (logoClicks === 3) {
        document.body.style.animation = 'rainbow 3s infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            logoClicks = 0;
        }, 3000);
    }
});

// Função para ativar cartão fidelidade
function ativarFidelidade() {
    const nome = prompt('Para ativar seu cartão fidelidade, digite seu nome completo:');
    
    if (!nome || nome.trim() === '') {
        alert('Nome não informado. Tente novamente!');
        return;
    }
    
    const telefone = prompt('Digite seu WhatsApp (apenas números):');
    
    if (!telefone || telefone.trim() === '') {
        alert('Telefone não informado. Tente novamente!');
        return;
    }
    
    // Montar mensagem para WhatsApp
    let mensagem = `🎁 *ATIVAR CARTÃO FIDELIDADE* 💳\n\n`;
    mensagem += `Olá! Gostaria de ativar meu cartão fidelidade:\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n`;
    mensagem += `📱 *WhatsApp:* ${telefone}\n\n`;
    mensagem += `_Aguardo o envio do meu cartão digital! 🙏_`;
    
    const whatsappNumber = '5515998183520'; // DDD 15 - Itapeva/SP
    const mensagemEncoded = encodeURIComponent(mensagem);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Feedback
    showSuccessMessage('Redirecionando para o WhatsApp... Complete sua ativação!');
}

// Atualizar showSuccessMessage para aceitar mensagem customizada
function showSuccessMessage(customMessage) {
    const message = customMessage || 'Redirecionando para WhatsApp...';
    
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        max-width: 350px;
    `;
    
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 2rem;">✅</div>
            <div>
                <strong style="display: block; margin-bottom: 5px;">${message}</strong>
                <span style="font-size: 0.9rem;">Aguarde um momento...</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 5000);
}

// ============================================
// SISTEMA DE QR CODE E CHECK-IN
// ============================================

let currentQRCode = null;
let currentClientData = null;

// Abrir modal de check-in
function abrirCheckIn() {
    const modal = document.getElementById('qrcodeModal');
    const nome = prompt('Digite o nome do cliente:');
    
    if (!nome || nome.trim() === '') {
        return;
    }
    
    // Buscar dados do cliente ou criar novo
    const clienteId = gerarIdCliente(nome);
    const dadosCliente = buscarOuCriarCliente(nome, clienteId);
    
    // Se cliente novo, pedir aniversário
    if (!dadosCliente.aniversario) {
        const aniversario = prompt('Data de aniversário (DD/MM):');
        if (aniversario && aniversario.trim() !== '') {
            dadosCliente.aniversario = aniversario.trim();
            // Salvar
            const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
            clientes[clienteId] = dadosCliente;
            localStorage.setItem('barbear14_clientes', JSON.stringify(clientes));
        }
    }
    
    currentClientData = dadosCliente;
    
    // Verificar se é semana de aniversário
    const isAniversarioWeek = verificarSemanaAniversario(dadosCliente.aniversario);
    
    // Atualizar informações no modal
    document.getElementById('clientName').textContent = dadosCliente.nome;
    document.getElementById('clientBirthday').textContent = dadosCliente.aniversario || 'Não cadastrado';
    document.getElementById('lastVisit').textContent = dadosCliente.ultimaVisita || 'Primeira visita';
    document.getElementById('totalVisits').textContent = dadosCliente.totalVisitas;
    document.getElementById('clientPoints').textContent = dadosCliente.pontos;
    
    // Mostrar alerta de aniversário
    if (isAniversarioWeek) {
        alert('🎉 SEMANA DE ANIVERSÁRIO! 🎉\n\nEste cliente ganha 20% de desconto em qualquer serviço!');
    }
    
    // Gerar QR Code
    gerarQRCode(clienteId);
    
    // Mostrar modal
    modal.style.display = 'block';
}

// Gerar ID único para cliente
function gerarIdCliente(nome) {
    return 'BARBEAR14_' + nome.replace(/\s+/g, '_').toUpperCase() + '_' + Date.now();
}

// Buscar ou criar cliente no localStorage
function buscarOuCriarCliente(nome, clienteId) {
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    
    // Verificar se cliente já existe pelo nome
    for (let id in clientes) {
        if (clientes[id].nome.toLowerCase() === nome.toLowerCase()) {
            return clientes[id];
        }
    }
    
    // Cliente novo
    const novoCliente = {
        id: clienteId,
        nome: nome,
        telefone: '',
        aniversario: '',
        dataCadastro: new Date().toISOString(),
        ultimaVisita: null,
        totalVisitas: 0,
        pontos: 0,
        historico: []
    };
    
    clientes[clienteId] = novoCliente;
    localStorage.setItem('barbear14_clientes', JSON.stringify(clientes));
    
    return novoCliente;
}

// Verificar se é semana de aniversário
function verificarSemanaAniversario(aniversarioStr) {
    if (!aniversarioStr) return false;
    
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    
    // Parse DD/MM
    const [diaAniv, mesAniv] = aniversarioStr.split('/').map(n => parseInt(n));
    
    if (!diaAniv || !mesAniv || mesAniv !== mesHoje) return false;
    
    // Verifica se está dentro de 3 dias antes ou depois
    const diff = Math.abs(diaHoje - diaAniv);
    return diff <= 3;
}

// Gerar QR Code
function gerarQRCode(clienteId) {
    const qrcodeContainer = document.getElementById('qrcodeCanvas');
    qrcodeContainer.innerHTML = ''; // Limpar QR Code anterior
    
    // Dados do QR Code
    const qrData = JSON.stringify({
        barbearia: 'BARBEAR14',
        clienteId: clienteId,
        timestamp: Date.now()
    });
    
    // Gerar novo QR Code
    currentQRCode = new QRCode(qrcodeContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#1e2942",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Registrar visita
function registrarVisita() {
    if (!currentClientData) {
        alert('Erro: Dados do cliente não encontrados!');
        return;
    }
    
    const clientes = JSON.parse(localStorage.getItem('barbear14_clientes') || '{}');
    const cliente = clientes[currentClientData.id];
    
    if (!cliente) {
        alert('Erro: Cliente não encontrado!');
        return;
    }
    
    // Atualizar dados
    const agora = new Date();
    cliente.ultimaVisita = agora.toLocaleDateString('pt-BR');
    cliente.totalVisitas += 1;
    cliente.pontos += 1; // 1 ponto por visita
    cliente.historico.push({
        data: agora.toISOString(),
        tipo: 'visita',
        pontos: 1
    });
    
    // Salvar
    clientes[currentClientData.id] = cliente;
    localStorage.setItem('barbear14_clientes', JSON.stringify(clientes));
    
    // Feedback
    alert(`✅ Visita registrada com sucesso!\n\n` +
          `Cliente: ${cliente.nome}\n` +
          `Total de visitas: ${cliente.totalVisitas}\n` +
          `Pontos acumulados: ${cliente.pontos}\n\n` +
          `${cliente.pontos >= 10 ? '🎁 Cliente tem pontos para resgatar prêmio!' : ''}`);
    
    // Fechar modal
    fecharModal();
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('qrcodeModal');
    modal.style.display = 'none';
    currentQRCode = null;
    currentClientData = null;
}

// Eventos do modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('qrcodeModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Fechar ao clicar no X
    if (closeBtn) {
        closeBtn.onclick = fecharModal;
    }
    
    // Fechar ao clicar fora do modal
    window.onclick = function(event) {
        if (event.target == modal) {
            fecharModal();
        }
    };
});

console.log('%c🔵 BARBEARIA JORGE RODRIGUES 💈', 'font-size: 20px; font-weight: bold; color: #e8d4b5;');
console.log('%cSite desenvolvido com ❤️ | Sistema de Check-in ativo!', 'font-size: 12px; color: #7a8a9e;');
