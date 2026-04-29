// Animação do header ao fazer scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.topo');
  const logoDark = document.querySelector('.logo-dark');
  const logoLight = document.querySelector('.logo-light');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    logoDark.style.display = 'none';
    logoLight.style.display = 'block';
  } else {
    header.classList.remove('scrolled');
    logoDark.style.display = 'block';
    logoLight.style.display = 'none';
  }
});

const timelineObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const timelineItems = entry.target.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 100);
      });
      
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const timelineSection = document.querySelector('.timeline-section');
if (timelineSection) {
  timelineObserver.observe(timelineSection);
}

// Funcionalidade do formulário de orçamento
document.addEventListener('DOMContentLoaded', function() {
  const orcamentoForm = document.getElementById('orcamentoForm');
  
  if (orcamentoForm) {
    // Formatação de telefone
    const telefonInput = document.getElementById('telefone');
    
    if (telefonInput) {
      telefonInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        
        if (valor.length > 11) {
          valor = valor.slice(0, 11); // Limita a 11 dígitos
        }
        
        // Formata no padrão (99) 99999-9999
        if (valor.length <= 2) {
          e.target.value = valor;
        } else if (valor.length <= 7) {
          e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else {
          e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
        }
      });
    }
    
    // Formatação de CEP
    const cepInput = document.getElementById('cep');
    
    if (cepInput) {
      cepInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        
        if (valor.length > 8) {
          valor = valor.slice(0, 8); // Limita a 8 dígitos
        }
        
        // Formata no padrão 99999-999
        if (valor.length <= 5) {
          e.target.value = valor;
        } else {
          e.target.value = `${valor.slice(0, 5)}-${valor.slice(5)}`;
        }
      });
    }
    
    // Validação e envio do formulário
    orcamentoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar campos obrigatórios
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const convidados = document.getElementById('convidados').value;
      const tipoEvento = document.getElementById('tipoEvento').value;
      const dataEvento = document.getElementById('dataEvento').value;
      const tipoServico = document.getElementById('tipoServico').value;
      const privacidade = document.getElementById('privacidade').checked;
      
      if (!nome || !email || !telefone || !convidados || !tipoEvento || !dataEvento || !tipoServico || !privacidade) {
        alert('Por favor, preencha todos os campos obrigatórios e aceite a Política de Privacidade.');
        return;
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
      }
      
      // Coletar dados do formulário
      const formData = new FormData(orcamentoForm);
      
      // Aqui você pode enviar os dados para o servidor
      console.log('Formulário validado e pronto para envio');
      console.log('Dados:', Object.fromEntries(formData));
      
      // Simular envio (você pode conectar a um endpoint real)
      alert('Obrigado! Receberemos sua solicitação em breve. Responderemos até 48 horas úteis.');
      orcamentoForm.reset();
    });
  }
});

/* ================================================
   FORMULÁRIO DE ORÇAMENTO - LÓGICA JAVASCRIPT
   ================================================ */

class FormularioOrcamento {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.form = document.getElementById('orcamentoForm');
        this.btnAnterior = document.getElementById('btnAnterior');
        this.btnProximo = document.getElementById('btnProximo');
        this.btnEnviar = document.getElementById('btnEnviar');
        this.progressFill = document.getElementById('progressFill');
        this.currentStepSpan = document.getElementById('currentStep');

        this.init();
    }

    init() {
        // Event listeners
        this.btnProximo.addEventListener('click', (e) => this.handleProximo(e));
        this.btnAnterior.addEventListener('click', (e) => this.handleAnterior(e));
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validação em tempo real
        this.setupRealTimeValidation();

        // Atualizar interface inicial
        this.updateUI();
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    handleProximo(e) {
        e.preventDefault();

        // Validar campos da etapa atual
        if (!this.validateStep(this.currentStep)) {
            return;
        }

        // Ir para próxima etapa
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }

    handleAnterior(e) {
        e.preventDefault();

        // Ir para etapa anterior
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }

    goToStep(stepNumber) {
        // Esconder etapa atual
        document.getElementById(`step${this.currentStep}`).classList.remove('active');

        // Atualizar step atual
        this.currentStep = stepNumber;

        // Mostrar nova etapa
        document.getElementById(`step${this.currentStep}`).classList.add('active');

        // Atualizar UI
        this.updateUI();

        // Scroll para o topo do formulário
        document.querySelector('.orcamento-header').scrollIntoView({ behavior: 'smooth' });
    }

    updateUI() {
        // Atualizar texto de progresso
        this.currentStepSpan.textContent = this.currentStep;

        // Atualizar barra de progresso
        const percentual = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = percentual + '%';

        // Mostrar/esconder botão anterior
        if (this.currentStep === 1) {
            this.btnAnterior.style.display = 'none';
        } else {
            this.btnAnterior.style.display = 'flex';
        }

        // Mostrar/esconder botão próximo e enviar
        if (this.currentStep === this.totalSteps) {
            this.btnProximo.style.display = 'none';
            this.btnEnviar.style.display = 'flex';
        } else {
            this.btnProximo.style.display = 'flex';
            this.btnEnviar.style.display = 'none';
        }
    }

    validateStep(stepNumber) {
        const stepElement = document.getElementById(`step${stepNumber}`);
        const requiredFields = stepElement.querySelectorAll('[required]');

        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        let isValid = true;
        let errorMessage = '';

        // Validação por tipo de campo
        if (field.type === 'email') {
            if (!this.isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Por favor, digite um email válido';
            }
        } else if (field.type === 'tel') {
            if (!this.isValidPhone(field.value)) {
                isValid = false;
                errorMessage = 'Por favor, digite um telefone válido';
            }
        } else if (field.type === 'number') {
            if (field.value < 1) {
                isValid = false;
                errorMessage = 'O número deve ser maior que 0';
            }
        } else if (field.type === 'date') {
            if (!this.isValidDate(field.value)) {
                isValid = false;
                errorMessage = 'Por favor, selecione uma data válida';
            }
        } else if (field.tagName === 'SELECT') {
            if (field.value === '') {
                isValid = false;
                errorMessage = 'Por favor, selecione uma opção';
            }
        } else if (field.value.trim() === '') {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Atualizar visual do campo
        if (isValid) {
            formGroup.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        } else {
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        }

        return isValid;
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    isValidPhone(phone) {
        const regex = /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/;
        return regex.test(phone.replace(/\s/g, ''));
    }

    isValidDate(date) {
        if (!date) return false;

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Data não pode ser anterior à hoje
        return selectedDate >= today;
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validar última etapa
        if (!this.validateStep(this.totalSteps)) {
            return;
        }

        // Coletar dados do formulário
        const formData = new FormData(this.form);
        const dados = Object.fromEntries(formData);

        // Coletar checkboxes (restrições)
        const restricoes = [];
        document.querySelectorAll('input[name="restricoes"]:checked').forEach(checkbox => {
            restricoes.push(checkbox.value);
        });
        dados.restricoes = restricoes.join(', ');

        console.log('Dados do formulário:', dados);

        // Aqui você pode enviar os dados para um servidor
        // this.enviarParaServidor(dados);

        // Por enquanto, mostrar mensagem de sucesso
        this.mostrarSucesso();
    }

    mostrarSucesso() {
        // Esconder formulário
        document.querySelector('.form-container').innerHTML = `
            <div class="sucesso-message">
                <div class="sucesso-icon">
                    <i class="bi bi-check-circle"></i>
                </div>
                <h2>Orçamento Enviado!</h2>
                <p>Obrigado por solicitar nossos serviços. Entraremos em contato em até 48 horas úteis com uma proposta personalizada.</p>
                <p class="sucesso-email">Um email de confirmação foi enviado para seu endereço de email.</p>
                <a href="index.html" class="btn-voltar">
                    <i class="bi bi-house"></i> Voltar para Home
                </a>
            </div>
        `;

        // Scroll para topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    enviarParaServidor(dados) {
        // Implementar envio via fetch
        /*
        fetch('/api/orcamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            this.mostrarSucesso();
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao enviar formulário. Tente novamente.');
        });
        */
    }
}

// Inicializar formulário quando documento carregar
document.addEventListener('DOMContentLoaded', () => {
    new FormularioOrcamento();
});