import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EXPIRES_LABEL = "2 de novembro de 2026";
const EXPIRES_ISO = "2026-11-02T23:59:59-03:00";
const ASSETS = "C:\\Users\\Rad\\.cursor\\projects\\c-Users-Rad-Projects-previews-poa\\assets";

const firms = [
  {
    slug: "paloma",
    greet: "Paloma",
    phone: "(51) 99297-0045",
    wa: "5551992970045",
    kicker: "Previdenciário",
    title: "Paloma<br>Bernardes",
    plain: "Paloma Bernardes",
    lede: "Advocacia previdenciária no Passo d'Areia. O tempo do benefício pede clareza, e o escritório está em Porto Alegre.",
    address: "Rua Sport Club São José, 71, sala 204<br>Passo d'Areia, Porto Alegre",
    areas: ["Direito previdenciário"],
    layout: "cinema",
    theme: "paloma",
  },
  {
    slug: "jussara",
    greet: "Jussara",
    phone: "(51) 98580-2851",
    wa: "5551985802851",
    kicker: "Previdenciário",
    title: "Jussara<br>Heis",
    plain: "Jussara Heis",
    lede: "Advocacia previdenciária em Porto Alegre. Planejamento e benefício, com atendimento na Rua Santa Catarina.",
    address: "Rua Santa Catarina, 40, sala 902<br>Porto Alegre",
    areas: ["Direito previdenciário"],
    layout: "study",
    theme: "jussara",
  },
  {
    slug: "eny",
    greet: "Eny",
    phone: "(51) 99142-6339",
    wa: "5551991426339",
    kicker: "Eny Scheffer Advogados",
    title: "Eny<br>Scheffer",
    plain: "Eny Scheffer",
    lede: "Escritório em Porto Alegre. Atuação publicada em civil, consumidor, família, imobiliário e administrativo.",
    address: "Avenida Brasiliano Índio de Moraes, 366/D<br>Porto Alegre",
    meta: "OAB/RS 74.079",
    areas: ["Civil", "Consumidor", "Família", "Imobiliário", "Administrativo"],
    layout: "chambers",
    theme: "eny",
  },
  {
    slug: "michelle",
    greet: "Michelle",
    phone: "(51) 3279-2777",
    wa: "",
    kicker: "Assessoria jurídica",
    title: "Michelle<br>Ferreira",
    plain: "Michelle Ferreira",
    lede: "Advocacia e assessoria jurídica no Passo d'Areia, em Porto Alegre.",
    address: "Rua Cristóvão Pereira, 117, sala 201<br>Passo d'Areia, Porto Alegre",
    areas: [],
    layout: "chambers",
    theme: "michelle",
  },
  {
    slug: "dilto",
    greet: "Dilto",
    phone: "(51) 99941-6467",
    wa: "5551999416467",
    kicker: "Advocacia",
    title: "Dilto<br>Nunes",
    plain: "Dilto Nunes",
    lede: "Advocacia no Passo d'Areia. Avenida dos Industriários, Porto Alegre.",
    address: "Avenida dos Industriários, 619, sala 1<br>Passo d'Areia, Porto Alegre",
    areas: [],
    layout: "cinema",
    theme: "dilto",
  },
  {
    slug: "raquel",
    greet: "Raquel",
    phone: "(51) 98254-1558",
    wa: "5551982541558",
    kicker: "Direito do trabalho",
    title: "Raquel<br>Olinski",
    plain: "Raquel Olinski",
    lede: "Advocacia em Porto Alegre, com atuação publicada em direito do trabalho. Preventivo, consultivo e contencioso.",
    address: "Avenida General Emílio Lúcio Esteves, 139<br>Santa Maria Goretti, Porto Alegre",
    areas: ["Direito do trabalho"],
    layout: "study",
    theme: "raquel",
  },
  {
    slug: "taiana",
    greet: "Taiana",
    phone: "(51) 99842-5960",
    wa: "5551998425960",
    kicker: "Direito cível",
    title: "Taiana Lúcia<br>Soares",
    plain: "Taiana Lúcia Soares",
    lede: "Advocacia cível em Porto Alegre.",
    address: "Rua Vicente da Fontoura, 2352, sala 501<br>Porto Alegre",
    areas: ["Direito cível"],
    layout: "cinema",
    theme: "taiana",
  },
  {
    slug: "bergmann",
    greet: "",
    phone: "(51) 99957-9361",
    wa: "5551999579361",
    kicker: "Advocacia",
    title: "Bergmann<br>Advogados",
    plain: "Bergmann Advogados",
    lede: "Advocacia em Porto Alegre.",
    address: "Rua Líbano, 62<br>Porto Alegre",
    areas: [],
    layout: "study",
    theme: "bergmann",
  },
  {
    slug: "vs",
    greet: "",
    phone: "(51) 3013-2482",
    wa: "",
    kicker: "Imobiliário e inventários",
    title: "VS<br>Advogados",
    plain: "VS Advogados",
    lede: "Imobiliário, cível e inventários em Porto Alegre.",
    address: "Rua Jari, 132<br>Porto Alegre",
    areas: ["Imobiliário", "Cível", "Inventários"],
    layout: "cinema",
    theme: "vs",
  },
];

const css = `
:root { --ink:#f4efe6; --muted:rgba(244,239,230,.72); --line:rgba(244,239,230,.22); --accent:#c9864f; --bg:#14110e; --serif:"Fraunces",serif; --sans:"Outfit",sans-serif; }
[data-theme="jussara"]{ --ink:#f3efe6; --muted:rgba(243,239,230,.7); --accent:#d7c39a; --bg:#0c121c; }
[data-theme="eny"]{ --ink:#1a140e; --muted:#6d624f; --line:rgba(26,20,14,.16); --accent:#1f6b45; --bg:#f3efe6; }
[data-theme="michelle"]{ --ink:#241c16; --muted:#6e6256; --line:rgba(36,28,22,.16); --accent:#8a5a32; --bg:#f6f1e8; }
[data-theme="dilto"]{ --ink:#f2efe8; --muted:rgba(242,239,232,.7); --accent:#e0a15a; --bg:#0c0e12; }
[data-theme="raquel"]{ --ink:#17241e; --muted:#5d6c64; --line:rgba(23,36,30,.14); --accent:#2d6a52; --bg:#f7f4ee; }
[data-theme="taiana"]{ --ink:#f6f1ea; --muted:rgba(246,241,234,.74); --accent:#e7d3c4; --bg:#2a211c; }
[data-theme="bergmann"]{ --ink:#111; --muted:#5c5c5c; --line:rgba(0,0,0,.12); --accent:#111; --bg:#f4f4f2; }
[data-theme="vs"]{ --ink:#f6f3ec; --muted:rgba(246,243,236,.74); --accent:#e6d3b0; --bg:#121820; }
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans)}
img{display:block;width:100%;height:100%;object-fit:cover}
a{color:inherit}
.hero{position:relative;min-height:100svh;display:grid;align-items:end;overflow:hidden}
.media{position:absolute;inset:0}
.media img{animation:ken 26s ease-in-out infinite alternate;transform-origin:55% 40%}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.18) 40%,rgba(0,0,0,.78) 100%)}
.sheen{position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.16) 48%,transparent 60%);transform:translateX(-130%);animation:sheen 8.5s ease-in-out 1.2s infinite}
.hero-copy{position:relative;z-index:2;padding:28px 22px 36px}
.eyebrow{margin:0 0 14px;letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:var(--muted)}
h1{margin:0;font-family:var(--serif);font-weight:500;font-size:clamp(58px,14vw,108px);line-height:.88;letter-spacing:-.045em}
.rule{display:block;height:1px;width:0;margin:18px 0;background:var(--accent);animation:draw 1.1s ease .35s forwards}
.lede{max-width:36rem;margin:0;font-size:18px;line-height:1.45}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.btn{display:inline-flex;align-items:center;min-height:48px;padding:0 20px;border-radius:999px;text-decoration:none;background:var(--accent);color:#1a120c;font-size:15px}
.btn.ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)}
.sheet{padding:28px 22px 48px}
.grid{display:grid;gap:22px}
.label{display:block;margin-bottom:6px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.phone{font-family:var(--serif);font-size:clamp(32px,6vw,46px);letter-spacing:-.04em;text-decoration:none}
.areas{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0;padding:0;list-style:none}
.areas li{border:1px solid var(--line);border-radius:999px;padding:8px 12px;font-size:13px}
footer{padding:0 22px 28px;color:var(--muted);font-size:12px;line-height:1.5}
.rise{animation:rise .9s ease both}
.d2{animation-delay:.12s}.d3{animation-delay:.24s}.d4{animation-delay:.4s}
body[data-theme="eny"] .hero,body[data-theme="michelle"] .hero,body[data-theme="raquel"] .hero,body[data-theme="bergmann"] .hero{min-height:auto;display:block}
body[data-theme="eny"] .media,body[data-theme="michelle"] .media,body[data-theme="raquel"] .media,body[data-theme="bergmann"] .media{position:relative;height:64svh}
body[data-theme="eny"] .shade,body[data-theme="michelle"] .shade,body[data-theme="raquel"] .shade,body[data-theme="bergmann"] .shade,body[data-theme="eny"] .sheen,body[data-theme="michelle"] .sheen,body[data-theme="raquel"] .sheen,body[data-theme="bergmann"] .sheen{display:none}
body[data-theme="eny"] .hero-copy,body[data-theme="michelle"] .hero-copy,body[data-theme="raquel"] .hero-copy,body[data-theme="bergmann"] .hero-copy{padding-top:26px}
body[data-theme="eny"] .btn,body[data-theme="michelle"] .btn,body[data-theme="raquel"] .btn,body[data-theme="bergmann"] .btn{color:#fff}
body[data-theme="eny"] .btn.ghost,body[data-theme="michelle"] .btn.ghost,body[data-theme="raquel"] .btn.ghost,body[data-theme="bergmann"] .btn.ghost{color:var(--ink);border-color:var(--line)}
@media(min-width:980px){
  .hero-copy{padding:48px 64px 56px}
  .sheet,footer{padding-left:64px;padding-right:64px}
  .grid{grid-template-columns:1.2fr .8fr;align-items:end}
  body.study .hero{display:grid;grid-template-columns:.86fr 1.14fr;min-height:100svh;align-items:stretch}
  body.study .media,body.chambers .media{position:relative;height:auto;min-height:100svh}
  body.chambers .shade,body.chambers .sheen{display:none}
  body.chambers .btn{color:#fff}
  body.chambers .btn.ghost,body.study[data-theme="raquel"] .btn.ghost,body.study[data-theme="bergmann"] .btn.ghost{color:var(--ink);border-color:var(--line)}
  body.study[data-theme="bergmann"] .btn,body.study[data-theme="raquel"] .btn{color:#fff}
  body.study .media img{animation:pan 22s ease-in-out infinite alternate}
  body.study .shade{display:block;background:linear-gradient(90deg,transparent 70%,var(--bg) 98%)}
  body.study .hero-copy{margin:0;display:flex;flex-direction:column;justify-content:flex-end;padding:64px}
  body.chambers .hero{display:grid;grid-template-columns:1.15fr .85fr;min-height:100svh;align-items:stretch}
  body.chambers .media{height:auto;min-height:100svh}
  body.chambers .hero-copy{display:flex;flex-direction:column;justify-content:center;padding:64px}
}
@keyframes ken{from{transform:scale(1.04)}to{transform:scale(1.14) translate3d(-1.6%,-1.2%,0)}}
@keyframes pan{from{object-position:50% 30%}to{object-position:50% 70%}}
@keyframes sheen{0%,55%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@keyframes draw{to{width:76px}}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){
  .media img,.sheen,.rule,.rise{animation:none}
  .rule{width:76px}
}
.gone{min-height:100vh;display:grid;place-items:center;font-family:var(--sans)}
`;

function page(firm) {
  const tel = firm.phone.replace(/\D/g, "");
  const areas = firm.areas.length
    ? `<ul class="areas">${firm.areas.map((a) => `<li>${a}</li>`).join("")}</ul>`
    : "";
  const meta = firm.meta ? `<p class="eyebrow">${firm.meta}</p>` : "";
  const wa = firm.wa ? `<a class="btn" href="https://wa.me/${firm.wa}">WhatsApp</a>` : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${firm.plain}</title>
<meta property="og:title" content="${firm.plain}">
<meta property="og:description" content="${firm.lede}">
<meta property="og:image" content="hero.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,560&family=Outfit:wght@300;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body class="${firm.layout}" data-theme="${firm.theme}">
<header class="hero">
  <div class="media">
    <img src="hero.jpg" alt="">
    <div class="shade"></div>
    <div class="sheen"></div>
  </div>
  <div class="hero-copy">
    <p class="eyebrow rise">${firm.kicker}</p>
    <h1 class="rise d2">${firm.title}</h1>
    <span class="rule"></span>
    ${meta}
    <p class="lede rise d3">${firm.lede}</p>
    ${areas}
    <div class="actions rise d4">${wa}<a class="btn ghost" href="tel:+55${tel}">Ligar</a></div>
  </div>
</header>
<section class="sheet">
  <div class="grid">
    <div><span class="label">Endereço</span><p>${firm.address}</p></div>
    <div><span class="label">Telefone</span><a class="phone" href="tel:+55${tel}">${firm.phone}</a></div>
  </div>
</section>
<footer>Prévia preparada por Eduardo Rad, Flight Class. Esta página sai do ar em ${EXPIRES_LABEL}.</footer>
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
  copyFileSync(join(ASSETS, `${firm.slug}-hero.jpg`), join(dir, "hero.jpg"));
  writeFileSync(join(dir, "index.html"), page(firm), "utf8");
}
writeFileSync(join(base, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf8");
console.log("ok", firms.length);
