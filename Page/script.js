/* ======================================================
   🌌 STARS BACKGROUND
====================================================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.1 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }
    }

    draw() {
        ctx.fillStyle = "#fff8ba63";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let stars = [];

function initStars() {
    stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

initStars();
animateStars();

window.addEventListener("resize", () => {
    resizeCanvas();
    initStars();
});

/* ======================================================
   ✨ GLOW SETTINGS
====================================================== */

const GlowSettings = {
    selector: ".glowAnimation",
    color1: "#4FD1A1",
    color2: "#8855c2",
    speed: "6s",
    width: "2px",
    length: "40deg",
    blur: "8px",
};

document.querySelectorAll(GlowSettings.selector).forEach(el => {
    el.style.setProperty("--glow-color1", GlowSettings.color1);
    el.style.setProperty("--glow-color2", GlowSettings.color2);
    el.style.setProperty("--glow-speed", GlowSettings.speed);
    el.style.setProperty("--glow-width", GlowSettings.width);
    el.style.setProperty("--glow-length", GlowSettings.length);
    el.style.setProperty("--glow-blur", GlowSettings.blur);
});

/* ======================================================
   🌙☀️ DARK / LIGHT THEME
====================================================== */

const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// detectar sistema
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

const currentTheme = savedTheme || (systemDark ? "dark" : "light");
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
    const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* ======================================================
   🌍 LANGUAGE ES / EN
====================================================== */

const langToggle = document.getElementById("lang-toggle");

const translations = {
    es: {
        nav_about: "Sobre Mí",
        nav_projects: "Proyectos",
        nav_future: "A Futuro",
        nav_contact: "Contáctame",
        hero_title: "Hola soy Francisco Oviedo",
        hero_desc: "Tengo 14 años y me interesa el desarrollo web.<br>Me gusta aprender, crear proyectos y mejorar constantemente en lo que hago.",
        btn_contact: "Contáctame",
        btn_projects: "Ver proyectos",
        projects_title: "Mis Proyectos",
        contact_title: "Contacto",
        send: "Enviar mensaje"
    },
    en: {
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_future: "Future",
        nav_contact: "Contact",
        hero_title: "Hi, I'm Francisco Oviedo",
        hero_desc: "I'm 14 years old and interested in web development.<br>I like learning, building projects and constantly improving.",
        btn_contact: "Contact Me",
        btn_projects: "View projects",
        projects_title: "My Projects",
        contact_title: "Contact",
        send: "Send message"
    }
};

let currentLang = localStorage.getItem("lang") || "es";
setLanguage(currentLang);

langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("lang", currentLang);
    setLanguage(currentLang);
});

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    langToggle.textContent = lang === "es" ? "EN" : "ES";
}

/* ======================================================
   📩 EMAILJS + TOAST
====================================================== */

emailjs.init("FM0T7Yn3XYlnoNaGx");

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", e => {
    e.preventDefault();

    emailjs.sendForm(
        "service_6qk7grn",
        "template_rk2hc2q",
        form
    )
    .then(() => {
        form.reset();
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    })
    .catch(err => {
        console.error(err);
        alert("Error al enviar el mensaje 😢");
    });
});
