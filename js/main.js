// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Fullmetal Alchemist - Site carregado com sucesso!');
    
    // Inicializa o menu mobile
    initMobileMenu();
});

// Função para inicializar o menu mobile
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Menu principal');

    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    // Insere o botão de menu antes da lista de links
    nav.insertBefore(menuToggle, navLinks);

    // Adiciona evento de clique no botão do menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Fecha o menu ao clicar em um link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });

    // Fecha o menu ao redimensionar a tela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
}

// Ativa o link atual no menu baseado na URL
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Executa quando o histórico de navegação muda
window.addEventListener('popstate', setActiveNavLink);
setActiveNavLink();
