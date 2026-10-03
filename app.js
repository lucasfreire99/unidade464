/* =========================================================
   CENTRAL OPERACIONAL • UNIDADE 464 — PAINEL DEMONSTRATIVO
   Todos os dados são FICTÍCIOS. Sem backend, sem APIs.
   ---------------------------------------------------------
   1) DADOS FICTÍCIOS ........ objeto DATA (logo abaixo)
   2) INTERVALOS / SIMULAÇÃO . objeto CONFIG
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1) DADOS FICTÍCIOS (edite aqui) ---------- */
  var DATA = {
    avanco:   { valor: 87.6, meta: 84.0 },
    efetivoBase: 126,
    equipamentos: { total: 42, operando: 38 },
    producaoDia: 92.4,
    horas: { trabalhadas: 1284, improdutivas: 168 },

    frentes: [
      { nome: 'Fundação / Estaqueamento',     pct: 91 },
      { nome: 'Mesoestrutura',                pct: 76 },
      { nome: 'Superestrutura',               pct: 64 },
      { nome: 'Pavimentação / Acabamento',    pct: 48 }
    ],

    equipamentos_campo: [
      { icone: '🚜', nome: 'Escavadeira EX-204', desc: 'Frente 03 • ciclo ativo',  status: 'OPERANDO', nivel: 'ok' },
      { icone: '🚚', nome: 'Caminhão TR-118',    desc: 'Rota logística B',         status: 'EM ROTA',  nivel: 'info' },
      { icone: '🏗️', nome: 'Guindaste GR-07',    desc: 'Setor estrutural',         status: 'ATENÇÃO',  nivel: 'warn' },
      { icone: '🚧', nome: 'Perfuratriz PF-12',  desc: 'Fundação • frente 01',     status: 'OPERANDO', nivel: 'ok' }
    ],

    efetivo: [
      { nome: 'Engenharia',        n: 8 },
      { nome: 'Técnicos',          n: 12 },
      { nome: 'Encarregados',      n: 7 },
      { nome: 'Operadores',        n: 31 },
      { nome: 'Motoristas',        n: 28 },
      { nome: 'Administrativo',    n: 10 },
      { nome: 'Apoio / Terceiros', n: 30, variavel: true }   // absorve a variação do efetivo
    ],

    logistica: { previstas: 18, realizadas: 14, pendentes: 4, emRota: 7, cargas: 32 },

    campo: [
      { titulo: 'Segurança',  texto: 'Inspeção de equipamentos programada • 14:30', nivel: 'warn' },
      { titulo: 'Qualidade',  texto: 'Controle tecnológico dentro da faixa prevista', nivel: 'ok' },
      { titulo: 'Logística',  texto: 'Entrega de material prevista para o próximo ciclo', nivel: 'info' },
      { titulo: 'RDO',        texto: 'Relatório diário aguardando fechamento', nivel: 'warn' }
    ],

    // valores em R$ milhões — fictícios
    financeiro: { orcamento: 15.4, custo: 12.8, saldo: 2.6, medicao: 11.9 },

    // eventos iniciais (mais recente primeiro) — fictícios
    eventosIniciais: [
      { cat: 'Segurança',   msg: 'Rotina de inspeção programada',               st: 'ATENÇÃO',      nv: 'warn' },
      { cat: 'Efetivo',     msg: 'Atualização do quadro de campo',              st: 'SINCRONIZADO', nv: 'info' },
      { cat: 'Qualidade',   msg: 'Leitura de controle tecnológico recebida',    st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'Logística',   msg: 'TR-118 entrou na rota B',                     st: 'EM ROTA',      nv: 'info' },
      { cat: 'Equipamento', msg: 'EX-204 iniciou novo ciclo operacional',       st: 'OPERANDO',     nv: 'ok' },
      { cat: 'Produção',    msg: 'Medição da superestrutura recalculada',       st: 'ATUALIZADO',   nv: 'info' },
      { cat: 'RDO',         msg: 'Registro diário atualizado pela frente 03',   st: 'CONCLUÍDO',    nv: 'ok' }
    ],

    // eventos que entram automaticamente (sorteados) — fictícios
    eventosPool: [
      { cat: 'RDO',         msg: 'Registro diário atualizado pela frente 01',   st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'RDO',         msg: 'Relatório da frente 05 enviado para revisão', st: 'ATUALIZADO',   nv: 'info' },
      { cat: 'Produção',    msg: 'Concretagem do bloco B-12 registrada',        st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'Produção',    msg: 'Avanço de estaqueamento sincronizado',        st: 'ATUALIZADO',   nv: 'info' },
      { cat: 'Equipamento', msg: 'PF-12 iniciou nova perfuração',               st: 'OPERANDO',     nv: 'ok' },
      { cat: 'Equipamento', msg: 'GR-07 solicitou checagem preventiva',         st: 'ATENÇÃO',      nv: 'warn' },
      { cat: 'Logística',   msg: 'TR-121 chegou ao ponto de descarga PC-02',    st: 'ENTREGUE',     nv: 'ok' },
      { cat: 'Logística',   msg: 'TR-118 entrou na rota B',                     st: 'EM ROTA',      nv: 'info' },
      { cat: 'Qualidade',   msg: 'Corpo de prova encaminhado ao laboratório',   st: 'RECEBIDO',     nv: 'info' },
      { cat: 'Qualidade',   msg: 'Leitura de controle tecnológico recebida',    st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'Efetivo',     msg: 'Atualização do quadro de campo',              st: 'SINCRONIZADO', nv: 'info' },
      { cat: 'Efetivo',     msg: 'Troca de turno registrada na frente 03',      st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'Segurança',   msg: 'Diálogo diário de segurança registrado',      st: 'CONCLUÍDO',    nv: 'ok' },
      { cat: 'Segurança',   msg: 'Rotina de inspeção programada',               st: 'ATENÇÃO',      nv: 'warn' }
    ]
  };

  /* ---------- 2) CONFIG (intervalos e limites) ---------- */
  var CONFIG = {
    tickMs: 3000,          // atualização geral dos indicadores (2–4 s)
    feedMinMs: 4500,       // novo evento: mínimo
    feedMaxMs: 8000,       // novo evento: máximo
    feedMax: 40,           // eventos mantidos no histórico
    feedVisible: 7,        // eventos visíveis no painel principal
    chartPoints: 24,       // pontos do gráfico
    tweenMs: 900           // duração da animação numérica
  };

  /* ---------- utilitários ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var rndInt = function (a, b) { return Math.floor(rnd(a, b + 1)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var nf = function (v, d) { return v.toLocaleString('pt-BR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function clockStr(d) { return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); }

  /* animação numérica suave */
  function tween(node, to, fmt) {
    if (!node) return;
    var from = node._v == null ? to : node._v;
    node._v = to;
    if (reduce || from === to) { node.textContent = fmt(to); return; }
    if (node._raf) cancelAnimationFrame(node._raf);
    var t0 = performance.now();
    (function step(t) {
      var k = clamp((t - t0) / CONFIG.tweenMs, 0, 1);
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = fmt(from + (to - from) * e);
      if (k < 1) node._raf = requestAnimationFrame(step);
    })(t0);
  }
  function setWidth(node, pct) { if (node) node.style.width = clamp(pct, 0, 100) + '%'; }

  /* ---------- estado ---------- */
  var S = {
    avanco: DATA.avanco.valor,
    efetivoDelta: 0,
    equipOper: DATA.equipamentos.operando,
    prod: DATA.producaoDia,
    horas: DATA.horas.trabalhadas,
    improd: DATA.horas.improdutivas,
    frentes: DATA.frentes.map(function (f) { return f.pct; }),
    log: Object.assign({}, DATA.logistica),
    serie: [], meta: []
  };

  /* ---------- relógio ---------- */
  function tickClock() {
    var d = new Date();
    var t = clockStr(d);
    $('clock').textContent = t;
    $('chartTime').textContent = t;
    $('date').textContent = pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function markUpdate() {
    var t = clockStr(new Date());
    $('lastUpdate').textContent = t;
    $('k-read').textContent = 'última leitura: agora';
    setTimeout(function () { $('k-read').textContent = 'última leitura: ' + t; }, 1800);
  }

  /* ---------- frentes de serviço ---------- */
  var frRefs = [];
  function renderFrentes() {
    var box = $('frentes');
    DATA.frentes.forEach(function (f, i) {
      var row = el('div', 'bar-row'); row.style.marginTop = '0';
      var top = el('div', 'bar-top');
      var n = el('span', null, f.nome);
      var p = el('span', 'mono', nf(f.pct) + '%');
      top.appendChild(n); top.appendChild(p);
      var bar = el('div', 'bar'); var fill = el('i');
      bar.appendChild(fill);
      row.appendChild(top); row.appendChild(bar); box.appendChild(row);
      frRefs.push({ p: p, fill: fill, bar: bar });
    });
    // crescimento inicial (próximo frame, para a transição rodar)
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      frRefs.forEach(function (r, i) { setWidth(r.fill, S.frentes[i]); });
    }); });
  }
  function updateFrentes() {
    S.frentes.forEach(function (v, i) {
      if (Math.random() < 0.6) S.frentes[i] = clamp(v + rnd(-0.4, 0.9), DATA.frentes[i].pct - 3, DATA.frentes[i].pct + 4);
      var r = frRefs[i];
      setWidth(r.fill, S.frentes[i]);
      tween(r.p, S.frentes[i], function (x) { return nf(x, 1) + '%'; });
    });
  }

  /* ---------- equipamentos em campo ---------- */
  function renderEquip() {
    var ul = $('equip');
    DATA.equipamentos_campo.forEach(function (e) {
      var li = el('li');
      var ic = el('div', 'eq-ico'); ic.appendChild(el('span', null, e.icone)); ic.setAttribute('aria-hidden', 'true');
      var info = el('div', 'eq-info');
      info.appendChild(el('div', 'eq-name', e.nome));
      info.appendChild(el('div', 'eq-desc', e.desc));
      info.appendChild(el('span', 'badge ' + e.nivel, e.status));
      li.appendChild(ic); li.appendChild(info); ul.appendChild(li);
    });
  }

  /* ---------- efetivo ---------- */
  var efRefs = [], efTotal;
  function efetivoTotal() { return DATA.efetivoBase + S.efetivoDelta; }
  function renderEfetivo() {
    var box = $('efetivo');
    DATA.efetivo.forEach(function (g) {
      var row = el('div', 'bar-row'); row.style.marginTop = '0';
      var top = el('div', 'bar-top');
      var v = el('span', 'mono', pad(g.n));
      top.appendChild(el('span', null, g.nome)); top.appendChild(v);
      var bar = el('div', 'bar info'); var fill = el('i'); bar.appendChild(fill);
      row.appendChild(top); row.appendChild(bar); box.appendChild(row);
      efRefs.push({ v: v, fill: fill, g: g });
    });
    var tot = el('div', 'total-row');
    tot.appendChild(el('span', null, 'TOTAL'));
    efTotal = el('span', 'mono c-ok', nf(efetivoTotal()));
    tot.appendChild(efTotal); box.appendChild(tot);
    requestAnimationFrame(function () { requestAnimationFrame(paintEfetivo); });
  }
  function paintEfetivo() {
    var max = 40;
    efRefs.forEach(function (r) {
      var n = r.g.variavel ? r.g.n + S.efetivoDelta : r.g.n;
      r.v.textContent = n < 10 ? pad(n) : '' + n;
      setWidth(r.fill, n / max * 100);
    });
    efTotal.textContent = nf(efetivoTotal());
  }

  /* ---------- logística ---------- */
  var lgRefs = {};
  function renderLogi() {
    var box = $('logi');
    var itens = [
      ['previstas', 'Entregas previstas'], ['realizadas', 'Entregas realizadas'],
      ['pendentes', 'Materiais pendentes'], ['emRota', 'Veículos em rota'], ['cargas', 'Cargas processadas']
    ];
    itens.forEach(function (it) {
      var row = el('div', 'stat');
      row.appendChild(el('span', null, it[1]));
      var b = el('b', null, pad(S.log[it[0]]));
      row.appendChild(b); box.appendChild(row);
      lgRefs[it[0]] = b;
    });
    paintLogi();
  }
  function paintLogi() {
    for (var k in lgRefs) lgRefs[k].textContent = S.log[k] < 10 ? pad(S.log[k]) : '' + S.log[k];
    var pct = S.log.realizadas / S.log.previstas * 100;
    setWidth($('lg-bar'), pct);
    $('lg-pct').textContent = nf(Math.round(pct)) + '%';
  }
  function updateLogi() {
    var L = S.log;
    if (Math.random() < 0.35 && L.realizadas < L.previstas) { L.realizadas++; L.cargas += rndInt(1, 2); if (L.pendentes > 1 && Math.random() < .5) L.pendentes--; }
    L.emRota = clamp(L.emRota + rndInt(-1, 1), 5, 9);
    paintLogi();
  }

  /* ---------- controle de campo ---------- */
  function renderCampo() {
    var ul = $('campo');
    DATA.campo.forEach(function (c) {
      var li = el('li', c.nivel);
      li.appendChild(el('h3', null, c.titulo));
      li.appendChild(el('p', null, c.texto));
      ul.appendChild(li);
    });
  }

  /* ---------- financeiro ---------- */
  function renderFin() {
    var f = DATA.financeiro, box = $('fin');
    var linhas = [
      ['Orçamento previsto', f.orcamento, ''],
      ['Custo realizado',    f.custo,     'warn'],
      ['Medição acumulada',  f.medicao,   'info'],
      ['Saldo estimado',     f.saldo,     '']
    ];
    var rows = [];
    linhas.forEach(function (l) {
      var row = el('div', 'fin-row bar-row'); row.style.marginTop = '0';
      var top = el('div', 'bar-top');
      top.appendChild(el('span', null, l[0]));
      top.appendChild(el('b', 'mono', 'R$ ' + nf(l[1], 1) + ' mi'));
      var bar = el('div', 'bar ' + l[2]); var fill = el('i'); bar.appendChild(fill);
      row.appendChild(top); row.appendChild(bar); box.appendChild(row);
      rows.push([fill, l[1] / f.orcamento * 100]);
    });
    box.appendChild(el('p', 'mut', 'Valores hipotéticos — não representam dados reais da TRANENGE.')).style.fontSize = '11.5px';
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      rows.forEach(function (r) { setWidth(r[0], r[1]); });
    }); });
  }

  /* ---------- horas e produtividade ---------- */
  var hRefs = {};
  function renderHours() {
    var box = $('hours');
    [['trab', 'Horas trabalhadas'], ['prod', 'Horas produtivas'], ['improd', 'Horas improdutivas'], ['efi', 'Eficiência operacional']].forEach(function (it) {
      var row = el('div', 'stat');
      row.appendChild(el('span', null, it[1]));
      var b = el('b', it[0] === 'improd' ? 'c-crit' : (it[0] === 'prod' || it[0] === 'efi' ? 'c-ok' : '')); row.appendChild(b);
      box.appendChild(row); hRefs[it[0]] = b;
    });
    paintHours(true);
  }
  function paintHours(first) {
    var prod = S.horas - S.improd, efi = prod / S.horas * 100;
    var i0 = function (x) { return nf(Math.round(x)); };
    var f1 = function (x) { return nf(x, 1) + '%'; };
    if (first) { hRefs.trab._v = S.horas; hRefs.prod._v = prod; hRefs.improd._v = S.improd; hRefs.efi._v = efi; }
    tween(hRefs.trab, S.horas, i0); tween(hRefs.prod, prod, i0); tween(hRefs.improd, S.improd, i0); tween(hRefs.efi, efi, f1);
    tween($('h-ef-val'), efi, f1);
    $('ring').style.setProperty('--p', efi.toFixed(2));
    setWidth($('st-p'), efi); setWidth($('st-u'), 100 - efi);
  }

  /* ---------- gráfico (SVG) ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var CH = { w: 640, h: 240, l: 36, r: 12, t: 12, b: 22, min: 40, max: 100 };
  function X(i) { return CH.l + i * (CH.w - CH.l - CH.r) / (CONFIG.chartPoints - 1); }
  function Y(v) { return CH.t + (1 - (v - CH.min) / (CH.max - CH.min)) * (CH.h - CH.t - CH.b); }
  function smooth(vals) {
    var p = vals.map(function (v, i) { return [X(i), Y(v)]; });
    var d = 'M' + p[0][0].toFixed(1) + ',' + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }
  function initChart() {
    var g = $('grid');
    [40, 55, 70, 85, 100].forEach(function (v) {
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('class', 'gl'); ln.setAttribute('x1', CH.l); ln.setAttribute('x2', CH.w - CH.r);
      ln.setAttribute('y1', Y(v)); ln.setAttribute('y2', Y(v)); g.appendChild(ln);
      var tx = document.createElementNS(NS, 'text');
      tx.setAttribute('class', 'gt'); tx.setAttribute('x', 4); tx.setAttribute('y', Y(v) + 3); tx.textContent = v + '%'; g.appendChild(tx);
    });
    for (var i = 0; i < CONFIG.chartPoints; i += 4) {
      var vl = document.createElementNS(NS, 'line');
      vl.setAttribute('class', 'gl'); vl.setAttribute('x1', X(i)); vl.setAttribute('x2', X(i));
      vl.setAttribute('y1', CH.t); vl.setAttribute('y2', CH.h - CH.b); g.appendChild(vl);
    }
    var v = 72;
    for (var k = 0; k < CONFIG.chartPoints; k++) {
      v = clamp(v + rnd(-2.2, 3.2), 62, 96);
      S.serie.push(v); S.meta.push(70 + k * 0.55);
    }
    S.serie[S.serie.length - 1] = DATA.producaoDia;
    drawChart();
    $('line').classList.add('draw');
  }
  function drawChart() {
    var d = smooth(S.serie);
    $('line').setAttribute('d', d);
    $('area').setAttribute('d', d + ' L' + X(CONFIG.chartPoints - 1) + ',' + (CH.h - CH.b) + ' L' + X(0) + ',' + (CH.h - CH.b) + ' Z');
    $('meta').setAttribute('d', smooth(S.meta));
    var lx = X(CONFIG.chartPoints - 1), ly = Y(S.serie[S.serie.length - 1]);
    ['dot', 'dotRing'].forEach(function (id) { $(id).setAttribute('cx', lx); $(id).setAttribute('cy', ly); });
  }
  function updateChart() {
    var last = S.serie[S.serie.length - 1];
    S.serie.shift(); S.serie.push(clamp(last + rnd(-3, 3.4), 60, 97));
    S.meta.shift(); S.meta.push(clamp(S.meta[S.meta.length - 1] + 0.5, 70, 92));
    drawChart();
  }

  /* ---------- feed de movimentações ---------- */
  var feed = [];
  function feedItem(ev, time) {
    var li = el('li', ev.nv);
    li.appendChild(el('span', 'fd-cat', ev.cat));
    li.appendChild(el('span', 'fd-time', time));
    li.appendChild(el('span', 'fd-msg', ev.msg));
    li.appendChild(el('span', 'badge ' + ev.nv, ev.st));
    return li;
  }
  function trimFeed() {
    var ul = $('feed'), isHist = document.body.classList.contains('view-historico');
    while (ul.children.length > CONFIG.feedMax) ul.removeChild(ul.lastChild);
    var vis = isHist ? CONFIG.feedMax : CONFIG.feedVisible;
    for (var i = 0; i < ul.children.length; i++) ul.children[i].hidden = i >= vis;
  }
  function initFeed() {
    var ul = $('feed'), now = Date.now();
    DATA.eventosIniciais.forEach(function (ev, i) {
      ul.appendChild(feedItem(ev, clockStr(new Date(now - i * 47000 - 5000))));
    });
    trimFeed();
  }
  function addEvent() {
    var ev = pick(DATA.eventosPool), ul = $('feed');
    var li = feedItem(ev, clockStr(new Date()));
    ul.insertBefore(li, ul.firstChild);
    trimFeed();
    if (ev.nv === 'warn') markUpdate();
  }
  function scheduleEvent() {
    setTimeout(function () {
      if (!document.hidden) addEvent();
      scheduleEvent();
    }, rnd(CONFIG.feedMinMs, CONFIG.feedMaxMs));
  }

  /* ---------- KPIs ---------- */
  function paintKpis() {
    tween($('k-avanco'), S.avanco, function (x) { return nf(x, 1) + '%'; });
    setWidth($('k-avanco-bar'), S.avanco);
    $('k-avanco-sub').textContent = 'Meta acumulada: ' + nf(DATA.avanco.meta, 1) + '%';
    tween($('k-efetivo'), efetivoTotal(), function (x) { return nf(Math.round(x)); });
    tween($('k-equip'), DATA.equipamentos.total, function (x) { return nf(Math.round(x)); });
    $('k-equip-sub').textContent = S.equipOper + ' em operação';
    setWidth($('k-equip-bar'), S.equipOper / DATA.equipamentos.total * 100);
    tween($('k-prod'), S.prod, function (x) { return nf(x, 1) + '%'; });
    setWidth($('k-prod-bar'), S.prod);
    tween($('k-horas'), S.horas, function (x) { return nf(Math.round(x)); });
  }

  /* ---------- atualização geral (a cada 2–4 s) ---------- */
  function tick() {
    if (document.hidden) return;
    S.avanco = clamp(S.avanco + rnd(-0.06, 0.12), 87.4, 88.2);
    S.prod = clamp(S.prod + rnd(-1.2, 1.2), 89.5, 95);
    S.equipOper = clamp(S.equipOper + rndInt(-1, 1), 36, 40);
    if (Math.random() < 0.4) S.efetivoDelta = clamp(S.efetivoDelta + rndInt(-1, 1), -3, 3);
    S.horas += rndInt(1, 4);
    if (Math.random() < 0.25) S.improd += 1;
    paintKpis(); paintEfetivo(); paintHours(); updateFrentes(); updateLogi(); updateChart(); markUpdate();
  }

  /* ---------- navegação da sidebar ---------- */
  function showView(view) {
    document.body.className = document.body.className.replace(/\bview-\S+/g, '').trim();
    document.body.classList.add('view-' + view);
    var panels = document.querySelectorAll('.grid > [data-tags]');
    Array.prototype.forEach.call(panels, function (p) {
      var tags = p.getAttribute('data-tags').split(' ');
      var show = view === 'painel' || tags.indexOf(view) !== -1;
      p.hidden = !show;
      if (show) { p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; }
    });
    // Histórico: o feed ocupa a largura toda
    var feedPanel = $('feed').closest('section');
    feedPanel.classList.toggle('s-4', view !== 'historico');
    feedPanel.classList.toggle('s-12', view === 'historico');
    trimFeed();
  }
  function initNav() {
    var btns = Array.prototype.slice.call(document.querySelectorAll('.nav-btn'));
    var timer;
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('active'); x.removeAttribute('aria-current'); });
        b.classList.add('active'); b.setAttribute('aria-current', 'page');
        var title = b.getAttribute('data-title');
        $('viewTitle').innerHTML = title;
        document.title = title.replace(/&amp;/g, '&') + ' — Unidade 464 (demonstrativo)';
        $('viewNote').textContent = 'Carregando módulo…';
        $('loadbar').classList.add('on');
        clearTimeout(timer);
        timer = setTimeout(function () {
          showView(b.getAttribute('data-view'));
          $('loadbar').classList.remove('on');
          $('viewNote').textContent = b.getAttribute('data-note');
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        }, reduce ? 0 : 650);
      });
    });
  }

  /* ---------- inicialização ---------- */
  function init() {
    tickClock(); setInterval(tickClock, 1000);
    renderFrentes(); renderEquip(); renderEfetivo(); renderLogi(); renderCampo(); renderFin(); renderHours();
    initChart(); initFeed(); initNav();
    paintKpis();
    markUpdate();
    setInterval(tick, CONFIG.tickMs);
    scheduleEvent();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
