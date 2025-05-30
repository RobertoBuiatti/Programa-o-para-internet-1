// Elementos do formulário
const form = document.getElementById('form-contato');
const inputs = form.querySelectorAll('input, select, textarea');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Formulário de contato inicializado');
    initForm();
});

// Inicializa o formulário
function initForm() {
    // Adiciona eventos de validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            // Remove mensagens de erro quando o usuário começa a digitar
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
                input.classList.remove('error');
            }
        });
    });

    // Adiciona evento de submit
    form.addEventListener('submit', handleSubmit);
}

// Valida um campo específico
function validateField(field) {
    // Remove mensagem de erro anterior
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    field.classList.remove('error');

    // Validações específicas para cada tipo de campo
    switch(field.id) {
        case 'nome':
            if (field.value.trim().length < 3) {
                showError(field, 'O nome deve ter pelo menos 3 caracteres');
                return false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, 'Digite um email válido');
                return false;
            }
            break;

        case 'assunto':
            if (field.value === '') {
                showError(field, 'Selecione um assunto');
                return false;
            }
            break;

        case 'mensagem':
            if (field.value.trim().length < 10) {
                showError(field, 'A mensagem deve ter pelo menos 10 caracteres');
                return false;
            }
            break;
    }

    return true;
}

// Exibe mensagem de erro
function showError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'var(--primary-red)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

// Manipula o envio do formulário
function handleSubmit(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Valida todos os campos
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Aqui você adicionaria a lógica para enviar os dados para um servidor
        // Simulando um envio com sucesso
        const submitButton = form.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    }
}

// Exibe mensagem de sucesso
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '1rem';
    successMessage.style.borderRadius = '8px';
    successMessage.style.textAlign = 'center';
    successMessage.style.marginBottom = '1rem';
    successMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Adiciona estilos CSS para campos com erro
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--primary-red);
    }

    .error-message {
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
