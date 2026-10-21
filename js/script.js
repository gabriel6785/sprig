// Sprig — interações da Landing Page
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

// Ano atual no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Destaca o link da seção visível
const links = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

// Validação do formulário
const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Digite um e-mail válido."),
  mensagem: (v) => (v.trim().length >= 10 ? "" : "Escreva pelo menos 10 caracteres."),
};

function validate(field) {
  const msg = rules[field.name](field.value);
  field.classList.toggle("invalid", Boolean(msg));
  form.querySelector(`[data-for="${field.name}"]`).textContent = msg;
  return !msg;
}

form.querySelectorAll("input, textarea").forEach((f) => f.addEventListener("blur", () => validate(f)));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  const allValid = fields.map(validate).every(Boolean);
  if (!allValid) {
    statusEl.textContent = "";
    fields.find((f) => f.classList.contains("invalid")).focus();
    return;
  }
  statusEl.textContent = "Mensagem enviada! Responderemos em até 1 dia útil.";
  form.reset();
});
