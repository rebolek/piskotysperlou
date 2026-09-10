const configs = {
    single: {
        title: "1. Gastro-Začátečník (Single)",
        desc: "Jednoduchá vrstva Perly namazaná na rovnou stranu piškotu. Pro ty, kteří se ještě stydí sami před sebou.",
        layers: ["perla", "piskot"]
    },
    double: {
        title: "2. Klasik (Česká Makronka)",
        desc: "Sendvičová konstrukce: Piškot – Perla – Piškot. Tuk je bezpečně uzavřen uvnitř a nešpiní prsty. Vrchol elegance.",
        layers: ["piskot", "perla", "piskot"]
    },
    extreme: {
        title: "3. Extremist (Piškotová Věž)",
        desc: "3x piškot, 2x hrubá vrstva Perly přímo z mrazáku. Určeno pro lidi po těžkém rozchodu nebo neudělané zkoušce na VŠ.",
        layers: ["piskot", "perla", "piskot", "perla", "piskot"]
    }
};

function renderLayers(layers) {
    const display = document.getElementById("visualDisplay");
    if (!display) return;

    display.replaceChildren(...layers.map((kind) => {
        const el = document.createElement("div");
        el.className = kind === "perla" ? "perla-mini" : "piskot-mini";
        return el;
    }));
}

function selectConfig(type, button) {
    const config = configs[type];
    if (!config) return;

    document.querySelectorAll(".config-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === button);
    });

    document.getElementById("configTitle").textContent = config.title;
    document.getElementById("configDesc").textContent = config.desc;
    renderLayers(config.layers);
}

function toggleFaq(button) {
    const item = button.parentElement;
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
        faqItem.querySelector(".faq-question span").textContent = "➕";
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
        item.classList.add("active");
        button.querySelector("span").textContent = "➖";
        button.setAttribute("aria-expanded", "true");
    }
}

function handleNewsletter(e) {
    e.preventDefault();
    alert("Děkujeme! Nyní jste oficiálně přihlášeni k odběru nostalgie. Běžte si dát piškot!");
    e.target.reset();
}

document.querySelectorAll(".config-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectConfig(btn.dataset.config, btn));
});

const defaultConfigButton = document.querySelector('.config-btn[data-config="single"]');
selectConfig("single", defaultConfigButton);

document.querySelectorAll(".faq-question").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => toggleFaq(button));
});

const piskotClicker = document.getElementById("piskotClicker");
const clickHint = document.getElementById("clickHint");
let clickCount = 0;

if (piskotClicker && clickHint) {
    piskotClicker.addEventListener("click", () => {
        clickCount += 1;
        const remaining = 10 - clickCount;

        if (remaining > 0) {
            clickHint.textContent = `🔥 Ještě ${remaining}x klikni pro Retro 90s režim!`;
        } else {
            clickHint.textContent = "🎉 VÍTEJ V ROCE 1998! 🎉";
            document.body.classList.toggle("retro-mode");
            clickCount = 0;
        }
    });
}

document.querySelector(".newsletter-form")?.addEventListener("submit", handleNewsletter);
