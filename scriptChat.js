// DOM Elements
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');
const chatContainer = document.querySelector('.chat-container');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// Theme Management
const theme = {
    current: localStorage.getItem('theme') || 'light',
    
    toggle() {
        this.current = this.current === 'light' ? 'dark' : 'light';
        this.apply();
        localStorage.setItem('theme', this.current);
    },
    
    apply() {
        if (this.current === 'dark') {
            body.classList.add('dark-theme');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            body.classList.remove('dark-theme');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    },
    
    init() {
        // Apply saved theme or default
        if (this.current === 'dark') {
            body.classList.add('dark-theme');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
};

// Chat Management
const chat = {
    messages: [],
    
    addMessage(text, type = 'sent') {
        const message = {
            id: Date.now(),
            text,
            type,
            timestamp: new Date().toISOString()
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    },
    
    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message-${message.type}`);
        
        const textElement = document.createElement('p');
        textElement.textContent = message.text;
        messageElement.appendChild(textElement);
        
        if (chatContainer) {
            chatContainer.appendChild(messageElement);
        }
    },
    
    scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    },
    
    handleInput(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    },
    
    sendMessage() {
        const text = chatInput?.value.trim();
        if (!text) return;
        
        this.addMessage(text, 'sent');
        chatInput.value = '';
        
        // Simulate response after a short delay
        setTimeout(() => {
            this.simulateResponse();
        }, 1000);
    },
    
    simulateResponse() {
        const responses = [
            "Analizando el contenido proporcionado...",
            "Esta publicación parece ser falsa. Detectamos inconsistencias en...",
            "La información compartida es verídica según nuestras fuentes...",
            "Necesitamos más contexto para realizar un análisis preciso."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(randomResponse, 'received');
    }
};

// Plan Management
const plan = {
    current: 'basic',
    usageCount: 0,
    dailyLimit: 10,
    
    checkUsage() {
        return this.usageCount < this.dailyLimit;
    },
    
    incrementUsage() {
        this.usageCount++;
        this.updateUI();
    },
    
    updateUI() {
        const usageElement = document.querySelector('.usage-count');
        if (usageElement) {
            usageElement.textContent = `${this.usageCount}/${this.dailyLimit} consultas realizadas`;
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    theme.init();
    
    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            theme.toggle();
        });
    }

    // Chat input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => chat.handleInput(e));
    }
    
    // Send button
    if (sendButton) {
        sendButton.addEventListener('click', () => chat.sendMessage());
    }
});

// Authentication Management
const auth = {
    isLoggedIn: false,
    
    login(email, password) {
        // Simulate authentication
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    this.isLoggedIn = true;
                    resolve({ success: true });
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 1000);
        });
    },
    
    logout() {
        this.isLoggedIn = false;
        window.location.href = '/login';
    },
    
    checkAuth() {
        return this.isLoggedIn;
    }
};

// Form Validation
const validation = {
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePassword(password) {
        return password.length >= 8;
    },
    
    showError(element, message) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        
        element.parentNode.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 3000);
    }
};

// Initialize the application
function initApp() {
    theme.init();
    plan.updateUI();
    
    // Check authentication status
    if (!auth.checkAuth()) {
        const loginForm = document.querySelector('#loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                
                try {
                    await auth.login(email, password);
                    window.location.href = '/chat';
                } catch (error) {
                    validation.showError(loginForm, error.message);
                }
            });
        }
    }
}

// Start the application
initApp();