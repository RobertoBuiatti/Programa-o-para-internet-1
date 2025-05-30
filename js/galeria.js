// Elementos da galeria
const galeriaGrid = document.querySelector('.galeria-grid');
const filtros = document.querySelectorAll('.filtro-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Galeria inicializada');
    initFiltros();
    initLightbox();
});

// Inicializa os filtros
function initFiltros() {
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            // Remove classe active de todos os botões
            filtros.forEach(f => f.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            filtro.classList.add('active');
            
            // Aplica o filtro
            const categoria = filtro.getAttribute('data-filter');
            filtrarItems(categoria);
        });
    });
}

// Filtra os itens da galeria
function filtrarItems(categoria) {
    const items = document.querySelectorAll('.galeria-item');
    
    items.forEach(item => {
        // Remove animação anterior
        item.style.animation = 'none';
        item.offsetHeight; // Força reflow
        
        if (categoria === 'todos') {
            item.style.display = 'block';
            // Adiciona animação de fade in
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else if (item.classList.contains(categoria)) {
            item.style.display = 'block';
            // Adiciona animação de fade in
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Inicializa o lightbox
function initLightbox() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const titulo = item.querySelector('h3').textContent;
            const descricao = item.querySelector('p').textContent;
            
            openLightbox(img.src, titulo, descricao);
        });
    });
}

// Abre o lightbox
function openLightbox(src, titulo, descricao) {
    lightboxImg.src = src;
    lightboxCaption.innerHTML = `<h3>${titulo}</h3><p>${descricao}</p>`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll
    
    // Adiciona evento de tecla ESC
    document.addEventListener('keydown', handleEscKey);
}

// Fecha o lightbox
function closeLightboxHandler() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll
    // Remove evento de tecla ESC
    document.removeEventListener('keydown', handleEscKey);
}

// Manipula tecla ESC
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeLightboxHandler();
    }
}

// Evento de clique para fechar o lightbox
closeLightbox.addEventListener('click', closeLightboxHandler);

// Fecha o lightbox ao clicar fora da imagem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxHandler();
    }
});

// Previne propagação do clique na imagem
lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Animação suave ao filtrar
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.galeria-item');
    items.forEach((item, index) => {
        item.style.animation = `fadeInUp ${0.3 + index * 0.1}s ease forwards`;
    });
});
