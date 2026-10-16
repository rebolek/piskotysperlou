const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* CONFIGURATOR — content lives in the buttons' data-* attributes */
function renderLayers(layers) {
    const display = document.getElementById("visualDisplay");
    if (!display) return;

    // the flat side of a piškot is the one covered in Perla: flat side up when
    // Perla is directly above it, otherwise flat side down (towards Perla below)
    display.replaceChildren(...layers.map((kind, i) => {
        const el = document.createElement("div");
        el.className = kind === "perla" ? "perla-mini" : "piskot-mini";
        if (kind === "piskot" && layers[i - 1] === "perla") el.classList.add("flat-up");
        return el;
    }));
}

function selectConfig(button) {
    document.querySelectorAll(".config-btn").forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    document.getElementById("configTitle").textContent = button.dataset.title;
    document.getElementById("configDesc").textContent = button.dataset.desc;
    renderLayers(button.dataset.layers.split(" "));
}

document.querySelectorAll(".config-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectConfig(btn));
});

const activeConfigButton = document.querySelector(".config-btn.active");
if (activeConfigButton) selectConfig(activeConfigButton);

/* FAQ */
function toggleFaq(button) {
    const item = button.parentElement;
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
        const question = faqItem.querySelector(".faq-question");
        faqItem.classList.remove("active");
        question.querySelector("span").textContent = "➕";
        question.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
        item.classList.add("active");
        button.querySelector("span").textContent = "➖";
        button.setAttribute("aria-expanded", "true");
    }
}

document.querySelectorAll(".faq-question").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => toggleFaq(button));
});

/* EASTER EGG */
const piskotClicker = document.getElementById("piskotClicker");
const clickHint = document.getElementById("clickHint");
let clickCount = 0;

function saveRetroMode(isRetro) {
    try {
        localStorage.setItem("retro", isRetro ? "1" : "0");
    } catch {
        // storage blocked: retro mode just won't persist
    }
}

try {
    if (localStorage.getItem("retro") === "1") document.body.classList.add("retro-mode");
} catch {
    // storage blocked
}

function registerPiskotClick() {
    clickCount += 1;
    const remaining = 10 - clickCount;

    if (remaining > 0) {
        clickHint.textContent = `🔥 Ještě ${remaining}x klikni pro Retro 90s režim!`;
    } else {
        document.body.classList.toggle("retro-mode");
        const isRetro = document.body.classList.contains("retro-mode");
        saveRetroMode(isRetro);
        clickHint.textContent = isRetro ? "🎉 VÍTEJ V ROCE 1998! 🎉" : "Zpátky v přítomnosti.";
        clickCount = 0;
    }
}

if (piskotClicker && clickHint) {
    piskotClicker.addEventListener("click", registerPiskotClick);
    piskotClicker.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            registerPiskotClick();
        }
    });
}

/* FOOTER YEAR */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* NEWSLETTER */
document.querySelector(".newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsletterStatus").textContent =
        "Děkujeme! Nyní jste oficiálně přihlášeni k odběru nostalgie. Běžte si dát piškot!";
    e.target.reset();
});

/* AD BANNER */
const adTrack = document.querySelector(".ad-banner-track");
const adSlides = document.querySelectorAll(".ad-slide");
const adDots = document.querySelectorAll(".ad-dot");
const adPause = document.getElementById("adPause");
let adIndex = 0;
let adTimer = null;
let adUserPaused = reducedMotion.matches;

function showSlide(index) {
    adSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        slide.setAttribute("aria-hidden", String(i !== index));
    });
    adDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
    });
    adIndex = index;
}

function stopBanner() {
    clearInterval(adTimer);
    adTimer = null;
}

function startBanner() {
    stopBanner();
    if (adUserPaused || document.hidden) return;
    adTimer = setInterval(() => showSlide((adIndex + 1) % adSlides.length), 6000);
}

function setBannerPaused(paused) {
    adUserPaused = paused;
    adPause.setAttribute("aria-pressed", String(paused));
    adPause.setAttribute("aria-label", paused ? "Spustit automatické přepínání" : "Pozastavit automatické přepínání");
    adPause.textContent = paused ? "▶" : "⏸";
    startBanner();
}

if (adSlides.length && adTrack && adPause) {
    adDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            showSlide(Number(dot.dataset.index));
            startBanner();
        });
    });

    adPause.addEventListener("click", () => setBannerPaused(!adUserPaused));

    const adBanner = adTrack.parentElement;
    adBanner.addEventListener("mouseenter", stopBanner);
    adBanner.addEventListener("mouseleave", startBanner);
    adBanner.addEventListener("focusin", stopBanner);
    adBanner.addEventListener("focusout", startBanner);
    document.addEventListener("visibilitychange", startBanner);

    setBannerPaused(adUserPaused);
}

/* MOBILE NAV */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeNav() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
            closeNav();
            navToggle.focus();
        }
    });
}
