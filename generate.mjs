import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EXPIRES_LABEL = "2 de novembro de 2026";
const EXPIRES_ISO = "2026-11-02T23:59:59-03:00";

const firms = [
  {
    slug: "paloma",
    greet: "Paloma",
    phone: "(51) 99297-0045",
    wa: "5551992970045",
    kicker: "Advocacia previdenciária",
    title: "Paloma Bernardes",
    lede: "Advocacia previdenciária no Passo d'Areia, em Porto Alegre.",
    address: "Rua Sport Club São José, 71, sala 204\nPasso d'Areia, Porto Alegre",
    areas: ["Direito previdenciário"],
    theme: "paloma",
    layout: "split",
  },
  {
    slug: "jussara",
    greet: "Jussara",
    phone: "(51) 98580-2851",
    wa: "5551985802851",
    kicker: "Advocacia previdenciária",
    title: "Jussara Heis",
    lede: "Advocacia previdenciária em Porto Alegre.",
    address: "Rua Santa Catarina, 40, sala 902\nPorto Alegre",
    areas: ["Direito previdenciário"],
    theme: "jussara",
    layout: "editorial",
  },
  {
    slug: "eny",
    greet: "Eny",
    phone: "(51) 99142-6339",
    wa: "5551991426339",
    kicker: "Eny Scheffer Advogados",
    title: "Eny Scheffer",
    lede: "Escritório em Porto Alegre. Atuação publicada em direito civil, do consumidor, de família, imobiliário e administrativo.",
    address: "Avenida Brasiliano Índio de Moraes, 366/D\nPorto Alegre",
    meta: "OAB/RS 74.079",
    areas: ["Civil", "Consumidor", "Família", "Imobiliário", "Administrativo"],
    theme: "eny",
    layout: "split",
  },
  {
    slug: "michelle",
    greet: "Michelle",
    phone: "(51) 3279-2777",
    wa: "",
    kicker: "Advocacia e assessoria jurídica",
    title: "Michelle Ferreira",
    lede: "Advocacia e assessoria jurídica no Passo d'Areia, em Porto Alegre.",
    address: "Rua Cristóvão Pereira, 117, sala 201\nPasso d'Areia, Porto Alegre",
    areas: [],
    theme: "michelle",
    layout: "editorial",
  },
  {
    slug: "dilto",
    greet: "Dilto",
    phone: "(51) 99941-6467",
    wa: "5551999416467",
    kicker: "Advocacia",
    title: "Dilto Nunes",
    lede: "Advocacia no Passo d'Areia, em Porto Alegre.",
    address: "Avenida dos Industriários, 619, sala 1\nPasso d'Areia, Porto Alegre",
    areas: [],
    theme: "dilto",
    layout: "stack",
  },
  {
    slug: "raquel",
    greet: "Raquel",
    phone: "(51) 98254-1558",
    wa: "5551982541558",
    kicker: "Advocacia",
    title: "Raquel Olinski",
    lede: "Advocacia em Porto Alegre, com atuação publicada em direito do trabalho.",
    address: "Avenida General Emílio Lúcio Esteves, 139\nPorto Alegre",
    areas: ["Direito do trabalho"],
    theme: "raquel",
    layout: "editorial",
  },
  {
    slug: "taiana",
    greet: "Taiana",
    phone: "(51) 99842-5960",
    wa: "5551998425960",
    kicker: "Advocacia cível",
    title: "Taiana Lúcia Soares",
    lede: "Advocacia cível em Porto Alegre.",
    address: "Rua Vicente da Fontoura, 2352, sala 501\nPorto Alegre",
    areas: ["Direito cível"],
    theme: "taiana",
    layout: "split",
  },
  {
    slug: "bergmann",
    greet: "",
    phone: "(51) 99957-9361",
    wa: "5551999579361",
    kicker: "Advocacia",
    title: "Bergmann Advogados",
    lede: "Advocacia em Porto Alegre.",
    address: "Rua Líbano, 62\nPorto Alegre",
    areas: [],
    theme: "bergmann",
    layout: "stack",
  },
  {
    slug: "vs",
    greet: "",
    phone: "(51) 3013-2482",
    wa: "",
    kicker: "Imobiliário, cível e inventários",
    title: "VS Advogados",
    lede: "Imobiliário, cível e inventários em Porto Alegre.",
    address: "Rua Jari, 132\nPorto Alegre",
    areas: ["Imobiliário", "Cível", "Inventários"],
    theme: "vs",
    layout: "editorial",
  },
];

const css = `
:root {
  --bg: #f6f3ee;
  --ink: #161513;
  --muted: #5e584f;
  --line: rgba(22,21,19,.16);
  --accent: #1d4e89;
  --paper: #fffdf9;
  --serif: "Fraunces", "Times New Roman", serif;
  --sans: "Outfit", "Segoe UI", sans-serif;
}
[data-theme="paloma"] { --bg:#16130f; --ink:#f4efe6; --muted:#cbbba6; --line:rgba(244,239,230,.18); --accent:#c9864f; --paper:#221c16; }
[data-theme="jussara"] { --bg:#f4f1eb; --ink:#172033; --muted:#5d6878; --line:rgba(23,32,51,.14); --accent:#1f4f78; --paper:#fffdf8; }
[data-theme="eny"] { --bg:#101c18; --ink:#e7f0ea; --muted:#b7c9bf; --line:rgba(231,240,234,.16); --accent:#d4b483; --paper:#172822; }
[data-theme="michelle"] { --bg:#f7f3ec; --ink:#1c1916; --muted:#6d645b; --line:rgba(28,25,22,.14); --accent:#6e5340; --paper:#fffdf8; }
[data-theme="dilto"] { --bg:#101114; --ink:#ece7df; --muted:#b7b1a6; --line:rgba(236,231,223,.16); --accent:#c6a56a; --paper:#191b20; }
[data-theme="raquel"] { --bg:#fbf8f3; --ink:#1d2b26; --muted:#5d6d66; --line:rgba(29,43,38,.14); --accent:#2f6d57; --paper:#ffffff; }
[data-theme="taiana"] { --bg:#f6f1ea; --ink:#3b241c; --muted:#7a5d52; --line:rgba(59,36,28,.14); --accent:#9a4e3a; --paper:#fffdf9; }
[data-theme="bergmann"] { --bg:#f5f5f3; --ink:#111111; --muted:#5c5c5c; --line:rgba(17,17,17,.14); --accent:#111111; --paper:#ffffff; }
[data-theme="vs"] { --bg:#0f1c2e; --ink:#f4f1ea; --muted:#c5cbd6; --line:rgba(244,241,234,.16); --accent:#e0cfae; --paper:#16263c; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-weight: 400;
  letter-spacing: -0.01em;
}
a { color: inherit; }
.wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 28px 22px 22px;
  overflow-x: hidden;
}
.top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: baseline;
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--muted);
}
h1 {
  font-family: var(--serif);
  font-weight: 460;
  font-size: clamp(52px, 12vw, 112px);
  line-height: .9;
  letter-spacing: -0.045em;
  margin: 18px 0 0;
}
.kicker {
  margin-top: 28px;
  font-size: 13px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
}
.lede {
  max-width: 34rem;
  font-size: clamp(18px, 2.4vw, 22px);
  line-height: 1.45;
  margin: 18px 0 0;
}
.meta {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.areas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
  padding: 0;
  list-style: none;
}
.areas li {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
}
.stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.panel {
  margin-top: 36px;
  display: grid;
  gap: 22px;
}
.block span {
  display: block;
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}
.block p, .phone {
  margin: 0;
  white-space: pre-line;
  font-size: 18px;
  line-height: 1.35;
}
.phone {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.04em;
  text-decoration: none;
  overflow-wrap: anywhere;
}
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  text-decoration: none;
  background: var(--accent);
  color: var(--bg);
  font-size: 15px;
}
[data-theme="jussara"] .btn, [data-theme="michelle"] .btn, [data-theme="raquel"] .btn, [data-theme="taiana"] .btn, [data-theme="bergmann"] .btn {
  color: #fff;
}
[data-theme="bergmann"] .btn { color: #fff; background: #111; }
.btn.ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line);
}
footer {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}
@media (min-width: 900px) {
  .wrap { padding: 42px 64px 32px; }
  .stage {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
    gap: 64px;
    align-items: center;
  }
  h1 { font-size: clamp(64px, 6.4vw, 104px); }
  .panel { grid-template-columns: 1fr; }
}
.gone {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 32px;
  font-family: var(--sans);
}
`;

function page(firm) {
  const tel = firm.phone.replace(/\D/g, "");
  const areas = firm.areas.length
    ? `<ul class="areas">${firm.areas.map((a) => `<li>${a}</li>`).join("")}</ul>`
    : "";
  const meta = firm.meta ? `<p class="meta">${firm.meta}</p>` : "";
  const wa = firm.wa
    ? `<a class="btn" href="https://wa.me/${firm.wa}">WhatsApp</a>`
    : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>${firm.title}</title>
  <meta property="og:title" content="${firm.title}">
  <meta property="og:description" content="${firm.lede}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,460;9..144,560&family=Outfit:wght@300;500&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body data-theme="${firm.theme}" data-layout="${firm.layout}">
  <main class="wrap" id="live">
    <header class="top">
      <span>Porto Alegre</span>
      <span>Advocacia</span>
    </header>
    <section class="stage">
      <div>
        <p class="kicker">${firm.kicker}</p>
        <h1>${firm.title}</h1>
        ${meta}
      </div>
      <div>
        <p class="lede">${firm.lede}</p>
        ${areas}
        <div class="panel">
          <div class="block">
            <span>Endereço</span>
            <p>${firm.address}</p>
          </div>
          <div class="block">
            <span>Telefone</span>
            <a class="phone" href="tel:+55${tel}">${firm.phone}</a>
          </div>
        </div>
        <div class="actions">
          ${wa}
          <a class="btn ghost" href="tel:+55${tel}">Ligar</a>
        </div>
      </div>
    </section>
    <footer>Prévia preparada por Eduardo Rad, Flight Class. Esta página sai do ar em ${EXPIRES_LABEL}.</footer>
  </main>
  <script>
    if (Date.now() > new Date("${EXPIRES_ISO}").getTime()) {
      document.body.innerHTML = '<div class="gone"><p>Esta prévia encerrou.</p></div>';
    }
  </script>
</body>
</html>`;
}

const root = dirname(new URL(import.meta.url).pathname);
const base = root.startsWith("/") && process.platform === "win32" ? root.slice(1) : root;

for (const firm of firms) {
  const dir = join(base, firm.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(firm), "utf8");
}

writeFileSync(
  join(base, "index.html"),
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Prévias</title></head><body></body></html>`,
  "utf8",
);
writeFileSync(join(base, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf8");
writeFileSync(join(base, "firms.json"), JSON.stringify(firms, null, 2), "utf8");
console.log(firms.map((f) => f.slug).join("\n"));
