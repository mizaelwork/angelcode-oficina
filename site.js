/* ============================================================
   AngelCode — site Oficina (build paralelo · contexto-estrategico)
   Vanilla JS, sem dependências.
   Copy: contexto-estrategico.md (motor / oficina / performance).
   Painel "scanner operacional": diagnóstico coreografado em loop.
   ============================================================ */

const config = {
  whatsappUrl:
    "https://wa.me/5548996986794?text=" +
    encodeURIComponent("Quero encontrar os gargalos da minha operação."),
  instagramUrl: "https://instagram.com/mizael.anjos_",
};

/* ---------- conteúdo ---------- */

const shiftBefore = [
  "Lead pergunta o preço às 19h. Às 9h do dia seguinte já comprou do concorrente.",
  "Follow-up vive na memória de alguém. Memória falha, e falha custa venda.",
  "A equipe passa o dia apagando incêndio e digitando o mesmo dado três vezes.",
  "Ninguém sabe quantas propostas estão abertas. Nem quanto dinheiro tem nelas.",
  "Você descobre quanto vendeu quando o mês fecha. Tarde demais pra corrigir.",
];

const shiftAfter = [
  "Resposta em segundos, de madrugada, no feriado, no almoço. Nenhuma venda esfria.",
  "O sistema cobra, lembra e retoma a conversa sem pedir licença.",
  "O trabalho repetido roda sozinho. A equipe gasta o dia com o que dá dinheiro: vender.",
  "Cada negociação com dono, etapa e próximo passo. Você sabe quanto tem na mesa.",
  "Você abre o painel e vê o número do dia, hoje. Decide com dado, não com sensação.",
];

const diagAreas = [
  "Vendas",
  "Atendimento",
  "Marketing",
  "Processos",
  "Gestão",
  "Tecnologia",
  "Equipe",
];

const steps = [
  {
    title: "Scanner Operacional",
    badge: "diagnóstico",
    text: "Abro o capô antes de falar de peça. Mapeio vendas, atendimento, processos e gestão, e te entrego o mapa do dinheiro que está escapando: o que corrigir primeiro e o que cada correção destrava. Se não valer a pena mexer, eu te digo.",
  },
  {
    title: "Remap",
    badge: "níveis 1 · 2 · 3",
    text: "Primeiro extraio resultado do que você já tem: processo, funil, atendimento. Sem gastar com peça nova. Depois troco o que trava o crescimento, e fecho com painel e indicador pra você decidir pelos números.",
  },
  {
    title: "Motor Forjado",
    badge: "alta performance",
    text: "Operação exclusiva: sistema próprio, agentes especializados, infraestrutura sua. A empresa cresce em vendas sem crescer na mesma proporção em folha de pagamento. Isso é escalar.",
  },
];

const systems = [
  {
    title: "Agente de WhatsApp com IA · API Oficial",
    description:
      "Enquanto sua equipe dorme, nenhum lead esfria. O cliente recebe resposta em segundos, a qualquer hora, e chega em você só quem está pronto pra comprar. Roda na API Oficial do WhatsApp: sem número bloqueado, sem gambiarra.",
    gain: "As vendas que hoje morrem esperando resposta voltam pro caixa.",
  },
  {
    title: "CRM sob medida",
    description:
      "Nunca mais pergunte: “em que pé está aquele cliente?”. Cada negociação com dono, etapa e próximo passo. Isso acontece porque o CRM é desenhado pro seu processo de venda, não um software genérico que a equipe finge usar.",
    gain: "Nenhuma proposta aberta se perde por esquecimento.",
  },
  {
    title: "Painel de instrumentos",
    description:
      "Você deixa de decidir pelo sentimento. Passa a decidir pelos números. Vendas, atendimento e funil num painel só, atualizado sozinho, lido em 30 segundos. Sem painel, todo motor parece estar rodando bem.",
    gain: "A reunião de segunda começa com dado, não com achismo.",
  },
  {
    title: "Automações de operação",
    description:
      "As tarefas que hoje dependem de alguém lembrar, como cobrança, aviso, registro e relatório, viram fluxos que rodam sozinhos, todo dia, sem falhar. Menos erro, menos retrabalho, mais velocidade.",
    gain: "Horas de trabalho repetido saem da folha da semana e não voltam.",
  },
  {
    title: "Integrações",
    description:
      "A mesma informação nunca mais será digitada três vezes. As ferramentas que você já usa passam a conversar entre si: o dado entra uma vez e aparece onde precisa, sem ninguém copiar e colar.",
    gain: "O erro de digitação some junto com o retrabalho.",
  },
];

/*
 * Preparações reais — preencher quando os resultados fecharem.
 * Formato futuro: { title, tag, problem, solution, result, metric }
 * Enquanto vazio, os slots placeholder abaixo são renderizados.
 */
const cases = [];

const caseSlots = [
  "Motor em preparação · documentação em andamento",
  "Remap em curso · números em apuração",
  "Próximo motor entra na oficina em breve",
];

const tapeWords = [
  "potência",
  "diagnóstico",
  "remap",
  "gargalo",
  "oficina",
  "motor forjado",
  "escala",
  "operação",
  "eficiência",
  "alta performance",
];

const pad = (n) => String(n).padStart(2, "0");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- render ---------- */

function renderShift() {
  const before = document.getElementById("shift-before");
  const after = document.getElementById("shift-after");
  if (before) before.innerHTML = shiftBefore.map((t) => `<li>${t}</li>`).join("");
  if (after) after.innerHTML = shiftAfter.map((t) => `<li>${t}</li>`).join("");
}

function renderDiagAreas() {
  const el = document.getElementById("diag-areas");
  if (!el) return;
  el.innerHTML = diagAreas.map((a) => `<li>${a}</li>`).join("");
}

function renderSteps() {
  const el = document.getElementById("steps");
  if (!el) return;
  el.innerHTML = steps
    .map(
      (s, i) => `
      <li class="step reveal" style="--i:${i}">
        <span class="step__num">etapa ${pad(i + 1)}</span>
        <h3>${s.title}&trade;<small>${s.badge}</small></h3>
        <p>${s.text}</p>
      </li>`
    )
    .join("");
}

function renderSystems() {
  const el = document.getElementById("systems");
  if (!el) return;
  el.innerHTML = systems
    .map(
      (s, i) => `
      <article class="row reveal" style="--i:${i}">
        <span class="row__idx">${pad(i + 1)}</span>
        <div class="row__main">
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
        <div class="row__gain">
          <span class="row__gain-label">o que muda na sua semana</span>
          <p>${s.gain}</p>
        </div>
      </article>`
    )
    .join("");
}

function renderCases() {
  const el = document.getElementById("case-slots");
  if (!el) return;

  // quando houver preparações reais, elas substituem os slots automaticamente
  if (cases.length) {
    el.innerHTML = cases
      .map(
        (c, i) => `
        <article class="slot slot--filled reveal" style="--i:${i}">
          <div class="slot__head"><span class="slot__pulse"></span>${c.tag || "preparação real"}</div>
          <div>
            <h3>${c.title}</h3>
            <p class="slot__status">${c.result || c.problem || ""}</p>
          </div>
        </article>`
      )
      .join("");
    return;
  }

  el.innerHTML = caseSlots
    .map(
      (status, i) => `
      <article class="slot reveal" style="--i:${i}">
        <div class="slot__head"><span class="slot__pulse"></span>box ${pad(i + 1)}</div>
        <p class="slot__status">${status}</p>
        <div class="slot__bars" aria-hidden="true"><span></span><span></span><span></span></div>
      </article>`
    )
    .join("");
}

function renderTape() {
  const el = document.querySelector("[data-tape]");
  if (!el) return;
  const seq =
    tapeWords.map((w) => `<span>${w}</span>`).join('<span class="tape__dot">·</span>') +
    '<span class="tape__dot">·</span>';
  // duas metades idênticas → translateX(-50%) faz o loop sem emenda
  el.innerHTML = `<div class="tape__seq">${seq}</div><div class="tape__seq">${seq}</div>`;
}

/* ---------- painel "scanner operacional" ---------- */

function setupScan() {
  const panel = document.querySelector("[data-scan]");
  if (!panel) return;

  const areas = Array.from(panel.querySelectorAll("[data-area]"));
  const log = panel.querySelector("[data-log]");
  const powerEl = panel.querySelector("[data-power]");
  const powerLabel = panel.querySelector("[data-power-label]");
  const gauge = panel.querySelector("[data-gauge]");
  const gaugeRead = panel.querySelector("[data-gauge-read]");

  const GAUGE_N = 28;
  let gaugeBars = [];
  if (gauge) {
    gauge.innerHTML = Array.from({ length: GAUGE_N }, () => "<i></i>").join("");
    gaugeBars = Array.from(gauge.children);
  }

  // resultado da varredura, na ordem das áreas do HTML
  const results = [
    { flag: true,  status: "gargalo",  log: 'gargalo: follow-up esquecido, venda perdida <span class="ok">!</span>' },
    { flag: true,  status: "gargalo",  log: 'gargalo: lead sem resposta há 3 horas <span class="ok">!</span>' },
    { flag: true,  status: "gargalo",  log: 'gargalo: 14h/semana em tarefa manual <span class="ok">!</span>' },
    { flag: false, status: "regulado", log: "gestão: regulada · segue pro próximo" },
    { flag: true,  status: "gargalo",  log: 'gargalo: mesmo dado digitado 3 vezes <span class="ok">!</span>' },
  ];
  const areaNames = ["vendas", "atendimento", "processos", "gestão", "tecnologia"];

  const POWER_FROM = 54;
  const POWER_TO = 91;
  let clock = { h: 8, m: 12, s: 4 };

  const setGauge = (pct) => {
    if (!gaugeBars.length) return;
    const base = Math.round((GAUGE_N * POWER_FROM) / 100);
    const lit = Math.round((GAUGE_N * pct) / 100);
    gaugeBars.forEach((b, i) => {
      b.classList.toggle("is-on", i < lit);
      b.classList.toggle("is-hot", i < lit && i >= base);
    });
    if (gaugeRead) gaugeRead.textContent = `${Math.round(pct)}%`;
  };
  setGauge(POWER_FROM);

  const stamp = () => {
    clock.s += 3 + Math.floor(Math.random() * 9);
    if (clock.s > 59) { clock.s -= 60; clock.m += 1; }
    if (clock.m > 59) { clock.m -= 60; clock.h = (clock.h + 1) % 24; }
    return `${pad(clock.h)}:${pad(clock.m)}:${pad(clock.s)}`;
  };

  // reduced-motion: cena final estática
  if (reducedMotion) {
    areas.forEach((a, i) => {
      a.classList.add("is-done");
      if (results[i].flag) a.classList.add("is-flag");
      a.querySelector("[data-status]").textContent = results[i].status;
    });
    powerLabel.textContent = "potência projetada";
    powerEl.textContent = `${POWER_TO}%`;
    powerEl.classList.add("is-up");
    setGauge(POWER_TO);
    log.innerHTML =
      results
        .map((r) => `<p class="oplog__line is-on"><span class="t">[${stamp()}]</span> ${r.log}</p>`)
        .join("") +
      `<p class="oplog__line is-on"><span class="t">[${stamp()}]</span> remap projetado · potência <span class="ok">${POWER_TO}%</span> ✓</p>`;
    return;
  }

  const addLog = (text) => {
    const line = document.createElement("p");
    line.className = "oplog__line";
    line.innerHTML = `<span class="t">[${stamp()}]</span> ${text}`;
    log.appendChild(line);
    requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add("is-on")));
  };

  const reset = () => {
    areas.forEach((a) => {
      a.classList.remove("is-live", "is-done", "is-flag");
      a.querySelector("[data-status]").textContent = "-";
    });
    log.innerHTML = "";
    powerLabel.textContent = "potência atual";
    powerEl.textContent = `${POWER_FROM}%`;
    powerEl.classList.remove("is-up");
    setGauge(POWER_FROM);
  };

  const countPower = () => {
    powerLabel.textContent = "potência projetada";
    powerEl.classList.add("is-up");
    const t0 = performance.now();
    const DUR = 1400;
    const tick = (t) => {
      const k = Math.min((t - t0) / DUR, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      const val = POWER_FROM + (POWER_TO - POWER_FROM) * eased;
      powerEl.textContent = `${Math.round(val)}%`;
      setGauge(val);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    timers.push({ raf });
  };

  const STEP = 1500;
  let timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clearAll = () => {
    timers.forEach((t) => (t.raf ? cancelAnimationFrame(t.raf) : clearTimeout(t)));
    timers = [];
  };

  const playCycle = () => {
    clearAll();
    reset();

    at(300, () => addLog("scanner conectado ao motor ✓"));

    areas.forEach((area, i) => {
      const t = 300 + STEP * (0.8 + i);
      at(t, () => {
        areas.forEach((a, j) => a.classList.toggle("is-live", j === i));
        area.querySelector("[data-status]").textContent = "varrendo…";
        addLog(`varrendo ${areaNames[i]}…`);
      });
      at(t + STEP * 0.62, () => {
        area.classList.remove("is-live");
        area.classList.add("is-done");
        if (results[i].flag) area.classList.add("is-flag");
        area.querySelector("[data-status]").textContent = results[i].status;
        if (results[i].flag) addLog(results[i].log);
      });
    });

    const endT = 300 + STEP * (1.0 + areas.length);
    at(endT, () => {
      addLog('scan concluído · <span class="ok">4 pontos</span> onde a empresa perde dinheiro');
    });
    at(endT + STEP * 0.7, () => {
      addLog(`remap projetado · potência <span class="ok">${POWER_TO}%</span> ✓`);
      countPower();
    });

    at(endT + STEP * 2.6, playCycle);
  };

  // roda só com o painel visível
  let playing = false;
  const visObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !playing) {
          playing = true;
          playCycle();
        } else if (!e.isIntersecting && playing) {
          playing = false;
          clearAll();
        }
      });
    },
    { threshold: 0.3 }
  );
  visObs.observe(panel);
}

/* ---------- comportamentos ---------- */

function applyLinks() {
  document
    .querySelectorAll("[data-whatsapp-link]")
    .forEach((a) => a.setAttribute("href", config.whatsappUrl));
  document
    .querySelectorAll("[data-instagram-link]")
    .forEach((a) => a.setAttribute("href", config.instagramUrl));
}

function setupMenu() {
  const btn = document.querySelector(".menu-btn");
  const bar = document.querySelector(".topbar");
  if (!btn || !bar) return;

  const close = () => {
    bar.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };
  btn.addEventListener("click", () => {
    const open = bar.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", close));
}

function setupElevation() {
  const bar = document.querySelector("[data-elevate]");
  if (!bar) return;
  const onScroll = () => bar.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((i) => obs.observe(i));
}

function setupProgress() {
  const el = document.querySelector("[data-progress]");
  if (!el) return;
  const root = document.documentElement;
  const onScroll = () => {
    const max = root.scrollHeight - root.clientHeight;
    el.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupSpy() {
  const links = Array.from(document.querySelectorAll(".nav a:not(.btn)"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  const map = new Map();
  links.forEach((l) => {
    const id = (l.getAttribute("href") || "").slice(1);
    const sec = id && document.getElementById(id);
    if (sec) map.set(sec, l);
  });
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const link = map.get(e.target);
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  map.forEach((_, sec) => obs.observe(sec));
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- boot ---------- */

renderShift();
renderDiagAreas();
renderSteps();
renderSystems();
renderCases();
renderTape();
applyLinks();
setupMenu();
setupElevation();
setupReveal();
setupScan();
setupProgress();
setupSpy();
setYear();
