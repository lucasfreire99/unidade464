# Central Operacional • Unidade 464 (TRANENGE)

> **PAINEL HIPOTÉTICO / DEMONSTRATIVO** — Indicadores, equipe, equipamentos, localização e movimentações são fictícios.

Dashboard estático em HTML5 + CSS3 + JavaScript puro. Sem frameworks, sem backend, sem APIs, sem internet: funciona offline.

## Estrutura de pastas

```text
unidade464/
├── index.html   # estrutura e conteúdo (painéis, sidebar, mapa SVG)
├── style.css    # tema, layout responsivo e animações CSS
├── app.js       # dados fictícios, simulação, gráfico e navegação
└── README.md
```

## Executar localmente

1. Baixe a pasta `unidade464/`.
2. Dê dois cliques em `index.html` (abre no navegador). Não precisa de servidor.
3. Opcional, com servidor local: `python3 -m http.server 8080` dentro da pasta e acesse `http://localhost:8080`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `unidade464`) e envie os arquivos:
   ```bash
   cd unidade464
   git init
   git add .
   git commit -m "Painel demonstrativo Unidade 464"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/unidade464.git
   git push -u origin main
   ```
2. No repositório: **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
4. Aguarde ~1 minuto. O site ficará em `https://SEU_USUARIO.github.io/unidade464/`.

Os arquivos precisam estar na raiz do repositório (o `index.html` ao lado de `style.css` e `app.js`).

## Onde alterar os dados fictícios

Tudo está no topo do `app.js`, no objeto **`DATA`**:

| O que mudar | Campo em `DATA` |
|---|---|
| Avanço físico e meta | `avanco` |
| Efetivo total (base) | `efetivoBase` |
| Equipamentos total / em operação | `equipamentos` |
| Produção do dia (%) | `producaoDia` |
| Horas trabalhadas / improdutivas | `horas` |
| Frentes de serviço (nome e %) | `frentes` |
| Cards de equipamentos em campo | `equipamentos_campo` (`nivel`: `ok`, `info`, `warn`, `crit`) |
| Quadro de efetivo | `efetivo` (o item com `variavel: true` absorve a variação do total) |
| Logística | `logistica` |
| Controle de campo | `campo` |
| Financeiro (R$ milhões) | `financeiro` |
| Eventos iniciais e sorteados | `eventosIniciais`, `eventosPool` |

Textos fixos (nome da obra, local "Rodovia • Trecho 464", frente ativa, descrição, rodapé) ficam no `index.html`.
Pontos, estradas e frentes do mapa são elementos `<svg>` no `index.html` (seção "Mapa operacional").

## Cores, animações e indicadores

**Cores** — variáveis no início do `style.css`:

```css
:root {
  --bg: #07090d;      /* fundo */
  --panel: #101722;   /* painéis */
  --ok: #2ee59d;      /* verde: normal */
  --warn: #ffc247;    /* amarelo: atenção */
  --crit: #ff5a5f;    /* vermelho: crítico */
  --info: #4aa3ff;    /* azul: informação */
  --pulse-speed: 2s;  /* velocidade da pulsação */
}
```

**Animações**
- Pulsação: `@keyframes pulse` e `--pulse-speed`.
- Veículos do mapa: `@keyframes r1`, `r2`, `r3` e `animation-duration` em `.v1`…`.v4` (maior duração = mais lento).
- Ícones de equipamentos: `@keyframes bob`, `drive`, `sway`, `shake`.
- Barras: `transition` em `.bar i` e brilho em `@keyframes shine`.
- Desenho da linha do gráfico: `@keyframes draw` (duração 1.8s).
- Quem prefere menos movimento: o site respeita `prefers-reduced-motion`.

**Indicadores e ritmo da simulação** — objeto **`CONFIG`** no `app.js`:
`tickMs` (atualização geral, padrão 3000 ms), `feedMinMs`/`feedMaxMs` (novos eventos), `feedMax`, `chartPoints`, `tweenMs`.
Os limites de variação de cada indicador estão na função `tick()`.

## Observações

- Nenhum dado real é usado; todos os valores, nomes de equipamentos e locais são inventados.
- O relógio e a data mostram a hora do seu dispositivo.
