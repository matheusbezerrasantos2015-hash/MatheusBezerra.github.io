// ===== RELÓGIO DIGITAL =====
const clock = document.getElementById('clock');
const dateEl = document.getElementById('date');
const toggle24 = document.getElementById('toggle24');
const toggle12 = document.getElementById('toggle12');
let is24Hour = true;

// Função para atualizar o relógio
function updateClock() {
const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

  // Formato 12h
let ampm = '';
if (!is24Hour) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12
}

  // Formatação com zero à esquerda
const displayTime = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}${ampm}`;
clock.textContent = displayTime;

  // Formatar data
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateEl.textContent = now.toLocaleDateString('pt-BR', options);
}

// Atualiza a cada segundo
setInterval(updateClock, 1000);
updateClock(); // inicializa imediatamente

// Botões 24h / 12h
toggle24.addEventListener('click', () => {
is24Hour = true;
toggle24.classList.add('active');
toggle12.classList.remove('active');
});

toggle12.addEventListener('click', () => {
is24Hour = false;
toggle12.classList.add('active');
toggle24.classList.remove('active');
});

// ===== MODO CLARO / ESCURO =====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Carrega preferência do usuário ou usa tema do sistema
if (localStorage.getItem('theme')) {
root.classList.toggle('light', localStorage.getItem('theme') === 'light');
}
updateThemeIcon();

// Alterna tema ao clicar
themeToggle.addEventListener('click', () => {
root.classList.toggle('light');

  // Salva preferência
if (root.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
} else {
    localStorage.setItem('theme', 'dark');
}

updateThemeIcon();
});

// Atualiza ícone do botão
function updateThemeIcon() {
if (root.classList.contains('light')) {
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}
}

// ===== ANIMAÇÃO DOS CARDS DE HABILIDADES =====
const skillsBoxes = document.querySelectorAll('.skills-box');

function checkSkillsVisibility() {
  const triggerBottom = window.innerHeight * 0.9; // ponto de disparo
skillsBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('visible'); // adiciona classe para animação
    }
});
}

// Verifica ao rolar a página
window.addEventListener('scroll', checkSkillsVisibility);

// Inicializa a animação no carregamento
checkSkillsVisibility();
