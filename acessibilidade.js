// acessibilidade.js
// Script de Acessibilidade - Alto Contraste

// Verificar se já existe preferência salva
document.addEventListener('DOMContentLoaded', function() {
    const altoContrasteSalvo = localStorage.getItem('altoContraste');
    
    if(altoContrasteSalvo === 'ativo') {
        ativarAltoContraste();
    }
    
    // Criar botão flutuante
    criarBotaoAcessibilidade();
});

// Criar botão flutuante de acessibilidade
function criarBotaoAcessibilidade() {
    const botao = document.createElement('button');
    botao.id = 'btn-acessibilidade';
    botao.innerHTML = '👁️ Alto Contraste';
    botao.onclick = toggleAltoContraste;
    botao.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: #000;
        color: #fff;
        border: 3px solid #fff;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s;
    `;
    
    // Efeito hover
    botao.onmouseover = function() {
        this.style.transform = 'scale(1.05)';
    };
    botao.onmouseout = function() {
        this.style.transform = 'scale(1)';
    };
    
    document.body.appendChild(botao);
}

// Alternar alto contraste
function toggleAltoContraste() {
    const body = document.body;
    
    if(body.classList.contains('alto-contraste')) {
        desativarAltoContraste();
    } else {
        ativarAltoContraste();
    }
}

// Ativar alto contraste
function ativarAltoContraste() {
    document.body.classList.add('alto-contraste');
    localStorage.setItem('altoContraste', 'ativo');
    
    const botao = document.getElementById('btn-acessibilidade');
    if(botao) {
        botao.innerHTML = '👁️ Contraste Normal';
        botao.style.background = '#fff';
        botao.style.color = '#000';
        botao.style.borderColor = '#000';
    }
    
    // Anúncio para leitores de tela
    anunciarMudanca('Alto contraste ativado');
}

// Desativar alto contraste
function desativarAltoContraste() {
    document.body.classList.remove('alto-contraste');
    localStorage.setItem('altoContraste', 'inativo');
    
    const botao = document.getElementById('btn-acessibilidade');
    if(botao) {
        botao.innerHTML = '👁️ Alto Contraste';
        botao.style.background = '#000';
        botao.style.color = '#fff';
        botao.style.borderColor = '#fff';
    }
    
    // Anúncio para leitores de tela
    anunciarMudanca('Alto contraste desativado');
}

// Anúncio para leitores de tela (accessibility)
function anunciarMudanca(mensagem) {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('role', 'status');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);';
    anuncio.textContent = mensagem;
    document.body.appendChild(anuncio);
    
    setTimeout(() => {
        document.body.removeChild(anuncio);
    }, 1000);
}

// Aumentar fonte (funcionalidade extra)
function aumentarFonte() {
    const html = document.documentElement;
    const tamanhoAtual = parseFloat(getComputedStyle(html).fontSize) || 16;
    const novoTamanho = Math.min(tamanhoAtual + 2, 24); // Máximo 24px
    html.style.fontSize = novoTamanho + 'px';
    localStorage.setItem('tamanhoFonte', novoTamanho);
}

// Diminuir fonte (funcionalidade extra)
function diminuirFonte() {
    const html = document.documentElement;
    const tamanhoAtual = parseFloat(getComputedStyle(html).fontSize) || 16;
    const novoTamanho = Math.max(tamanhoAtual - 2, 12); // Mínimo 12px
    html.style.fontSize = novoTamanho + 'px';
    localStorage.setItem('tamanhoFonte', novoTamanho);
}

// Restaurar configurações padrão
function restaurarPadrao() {
    desativarAltoContraste();
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('tamanhoFonte');
}