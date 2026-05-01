# Proposta de animações suaves para o site

## Objetivo

Padronizar animações discretas, acessíveis e coerentes com a identidade institucional da Associação Habacuque do Brasil. O site já usa uma linguagem visual acolhedora, com DaisyUI, Tailwind via CDN, componentes JavaScript vanilla e estilos modulares em `css/theme/`. A proposta abaixo evita movimentos excessivos e reforça interações que ajudam a orientar a navegação.

## Diagnóstico do projeto

O projeto é um site estático com páginas HTML organizadas entre a home e as seções `quem-somos`, `projetos`, `quero-apoiar`, `contato` e `galeria`. A estrutura visual é baseada em:

- Seções amplas com `.section-wide`.
- Cabeçalho com estado transparente sobre hero e sólido após scroll.
- Heros com imagens fortes, overlay escuro e chamadas centrais ou alinhadas à esquerda.
- Cards de projetos, estatísticas, galeria, CTAs e carrossel horizontal.
- Microinterações já existentes com `transition-all`, `duration-150`, `duration-200`, `hover:shadow-*`, `hover:-translate-y-*` e `hover:scale-*`.

Também já existe uma animação contínua no hero das páginas de doação e apoio, usando crossfade de imagens em `css/theme/hero.css`. Por isso, novas animações devem ser mais sutis e não competir com esse movimento.

## Princípios de movimento

1. **Suavidade acima de impacto visual**  
   Usar deslocamentos pequenos, entre `4px` e `12px`, combinados com opacidade. Evitar giros, saltos, bounce e parallax forte.

2. **Durações curtas e consistentes**  
   Padronizar microinterações em `150ms`, entradas de conteúdo em `240ms` a `320ms` e transições de header/imagem em até `300ms`.

3. **Easing único por padrão**  
   Usar `cubic-bezier(0.22, 1, 0.36, 1)` para entradas suaves e `ease` para interações simples já existentes.

4. **Acessibilidade obrigatória**  
   Respeitar `prefers-reduced-motion: reduce`, removendo deslocamentos, parando animações infinitas e mantendo transições quase instantâneas.

5. **Performance primeiro**  
   Animar preferencialmente `opacity` e `transform`. Evitar animar `width`, `height`, `top`, `left`, `box-shadow` em excesso e filtros pesados.

## Tokens implementados

Foi criado o arquivo `css/theme/animacoes.css` e ele foi importado em `css/theme-institucional.css`. A base concentra os tempos, easings, distâncias e microinterações para evitar classes soltas em cada página.

```css
:root {
  --motion-fast: 150ms;
  --motion-medium: 240ms;
  --motion-slow: 320ms;
  --motion-slower: 420ms;
  --motion-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-distance-sm: 0.25rem;
  --motion-distance-md: 0.75rem;
  --motion-distance-lg: 1rem;
}
```

## Implementação aplicada

Além do CSS global, foi criado `components/motion-reveal.js` e incluído com `defer` nas páginas HTML. O script usa `IntersectionObserver` para revelar elementos quando entram no viewport e aplica automaticamente os padrões de movimento conforme o tipo de elemento.

Arquivos adicionados:

- `css/theme/animacoes.css`
- `components/motion-reveal.js`

Arquivos conectados:

- `css/theme-institucional.css`
- `index.html`
- `pages/contato.html`
- `pages/galeria.html`
- `pages/projetos/acoes-comunitarias.html`
- `pages/projetos/olhar-brilhante.html`
- `pages/quem-somos/nossa-equipe.html`
- `pages/quem-somos/nossa-historia.html`
- `pages/quem-somos/transparencia.html`
- `pages/quero-apoiar/quero-apoiar.html`
- `pages/quero-apoiar/quero-doar.html`

Também foram corrigidos os caminhos relativos de `pages/galeria.html` para garantir o carregamento correto do tema, componentes, stickers e estado ativo do menu.

## Presets modernos adicionados

O sistema deixou de ter apenas um reveal genérico e passou a trabalhar com presets via `data-motion`. O próprio script escolhe o preset automaticamente, mas a estrutura permite sobrescrever manualmente no HTML se necessário.

Presets disponíveis:

- `fade-up`: padrão para cards e blocos gerais.
- `fade-in`: usado para imagens, figuras e iframes.
- `scale-in`: usado para estatísticas, cards destacados e caixas arredondadas.
- `slide-right`: usado para headers de seção.
- `slide-left`: disponível para seções futuras com entrada lateral no sentido oposto.

O stagger também foi modernizado. Em vez de depender apenas de `nth-child`, o JS define `--motion-delay` nos elementos filhos de `.grid`, `.columns-1` e `scroll-carousel`, limitando o atraso para manter a página responsiva.

## Padrões recomendados

### 1. Entrada de conteúdo no carregamento

Aplicar nos títulos, subtítulos e botões dos heros. A animação deve acontecer uma vez ao carregar, sem repetir.

Uso implementado:

- `.hero h1`, `.hero-content h1` e `section[class*="bg-cover"] h1`.
- Parágrafos imediatamente após o título com delay de `80ms`.
- Botões dentro do hero com delay de `140ms`.

```css
.hero h1,
.hero-content h1,
section[class*="bg-cover"] h1 {
  animation: motion-fade-up var(--motion-slow) var(--motion-ease-out) both;
}

.hero h1 + p,
.hero-content h1 + p,
section[class*="bg-cover"] h1 + p {
  animation: motion-fade-up var(--motion-slow) var(--motion-ease-out) 80ms both;
}

.hero .btn,
.hero-content .btn,
section[class*="bg-cover"] .btn {
  animation: motion-fade-up var(--motion-slow) var(--motion-ease-out) 140ms both;
}

@keyframes motion-fade-up {
  from {
    opacity: 0;
    transform: translateY(var(--motion-distance-md));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Onde aplicar:

- Home: título, texto e botões do hero.
- Galeria: título e descrição do hero.
- Páginas de projeto: título, descrição e CTA principal.
- Quero doar e quero apoiar: conteúdo sobre o hero com crossfade de fundo.

### 2. Reveal por viewport

Usar para seções que aparecem durante a rolagem: estatísticas, cards, blocos de texto com imagem, galeria, mapa e CTA final.

Classes e atributos implementados:

- `.motion-reveal` para blocos individuais.
- `.motion-stagger` no contêiner quando os filhos devem aparecer em sequência.
- `data-motion` para definir o preset visual do elemento.
- `--motion-delay` para controlar o atraso individual no stagger.

```css
.motion-reveal {
  --motion-delay: 0ms;
  opacity: 0;
  transform: translateY(var(--motion-distance-md));
  transition:
    opacity var(--motion-slower) var(--motion-ease-emphasized),
    transform var(--motion-slower) var(--motion-ease-emphasized);
  transition-delay: var(--motion-delay);
  will-change: opacity, transform;
}

.motion-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
  will-change: auto;
}
```

O JavaScript implementado em `components/motion-reveal.js` seleciona automaticamente `.stats`, `.card`, headers de seção, iframes, caixas arredondadas e figuras. Ele ignora header, footer, sidebar, heros e figuras internas de cards para evitar animações duplicadas.

Onde aplicar:

- Bloco de impacto social na home.
- Cards de projetos.
- Seções com ícones e listas curtas.
- Blocos de transparência e história.
- Galeria de fotos.
- Mapa e formulário de contato.

### 3. Stagger discreto em grids

Para grupos de cards, ícones ou fotos, o script aplica atrasos pequenos com `--motion-delay`. O efeito é limitado a poucos passos para não atrasar a leitura em grids grandes.

```js
reveal.style.setProperty("--motion-delay", `${Math.min(index, 6) * 55}ms`);
```

Onde aplicar:

- Grid de projetos na home.
- Cards das páginas de projetos.
- Fotos da galeria.
- Itens do carrossel de ODS, sem animar o track do `scroll-carousel`.

### 4. Cards e imagens

O site já usava `hover:-translate-y-0.5`, `hover:shadow-2xl` e `duration-150`. A implementação modernizou esse padrão com elevação um pouco mais refinada, borda com cor da marca, sombra suave, zoom discreto em imagens e microinteração nos ícones Lucide.

Padrão implementado:

```css
.card:hover {
  transform: translateY(calc(var(--motion-distance-sm) * -1));
  border-color: color-mix(in oklch, var(--color-primary) 28%, var(--color-base-300));
  box-shadow: 0 18px 36px rgb(0 0 0 / 0.12);
}

.card:hover figure img {
  transform: scale(1.035);
}

.card:hover [data-lucide],
.card:hover svg {
  transform: translateY(-0.125rem) scale(1.04);
}
```

Também foi adicionado um tratamento específico para galeria:

```css
.motion-gallery-item img {
  transition:
    transform 300ms var(--motion-ease-out),
    box-shadow var(--motion-fast) ease;
}

.motion-gallery-item:hover img {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.14);
}
```

Cuidados:

- Usar `overflow-hidden` no `figure` quando a imagem escalar.
- Não aplicar escala em imagens muito grandes fora de cards, para evitar sensação de parallax.
- Manter `focus-visible:ring-*` nos links e cards clicáveis.

### 5. Botões

Os botões já têm transição global em `css/theme/botoes.css`. A implementação adicionou `motion-button-lift` automaticamente em `.btn-primary` e `.btn-accent`, com lift discreto e um brilho rápido no hover.

Efeitos aplicados:

- Pequeno `translateY(-1px)`.
- Brilho diagonal sutil com pseudo-elemento.
- Sem alterar foco visível ou comportamento do DaisyUI.

```css
.motion-button-lift:hover {
  transform: translateY(-1px);
}

.motion-button-lift:hover::after {
  opacity: 1;
  transform: translateX(120%);
}
```

Aplicado automaticamente em:

- `Quero Doar`.
- `Quero Apoiar`.
- CTAs finais de doação, contato e projetos.

### 6. Header e menus

O cabeçalho já muda de aparência quando sai do topo. Manter as transições próximas de `300ms` e evitar animações adicionais no logo ou nos links principais.

Implementado:

- Padronizar a transição do header em `background-color`, `box-shadow`, `color` e `filter`.
- Para dropdowns, usar fade curto, `transform-origin: top`, transição de fundo e sombra.
- Não animar altura do menu mobile; preferir opacidade e transform.

```css
.site-header-dropdown {
  transform-origin: top;
  transition:
    opacity var(--motion-fast) ease,
    transform var(--motion-fast) ease,
    background-color var(--motion-medium) ease,
    box-shadow var(--motion-medium) ease;
}
```

### 7. Carrossel horizontal

O `scroll-carousel` depende de overflow horizontal, `scroll-smooth` e snap. Portanto:

- Não animar `transform` no trilho inteiro.
- Animar apenas os cards internos quando entram no viewport.
- Manter dots com transição curta de cor e escala.

Padrão implementado para dots:

```css
scroll-carousel button[aria-current="true"] {
  transform: scale(1.15);
}
```

### 8. Galeria

Na galeria, o melhor efeito é uma entrada suave por viewport e hover mínimo na imagem.

Padrão implementado:

```css
.motion-gallery-item img {
  transition:
    transform 300ms var(--motion-ease-out),
    box-shadow var(--motion-fast) ease;
}

.motion-gallery-item:hover img {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.14);
}
```

Evitar:

- Lightbox animado complexo sem necessidade.
- Zoom agressivo.
- Movimento automático nas fotos.

## Acessibilidade e motion reduzido

Foi adicionada uma regra global para usuários que preferem menos movimento. Ela reduz animações e transições para `1ms`, desativa a rolagem suave e evita deslocamentos nos elementos revelados.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }

  .motion-reveal,
  .hero h1,
  .hero-content h1,
  .hero h1 + p,
  .hero-content h1 + p,
  .hero .btn,
  .hero-content .btn,
  section[class*="bg-cover"] h1,
  section[class*="bg-cover"] h1 + p,
  section[class*="bg-cover"] .btn {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

Também foi adicionada uma regra específica para o hero com crossfade de fundo: as animações de `.hero-bg` são pausadas e a primeira imagem permanece visível em `prefers-reduced-motion: reduce`.

## Status da implementação

1. `css/theme/animacoes.css` criado com tokens, keyframes, presets, microinterações e acessibilidade.
2. `css/theme-institucional.css` atualizado para importar o módulo de animações.
3. `components/motion-reveal.js` criado com `IntersectionObserver`, presets automáticos e stagger por `--motion-delay`.
4. Script incluído nas páginas HTML com `defer`.
5. Animações aplicadas de forma automática em heros, estatísticas, cards, headers de seção, galeria, iframes, CTAs e carrosséis.
6. Validação executada com `ReadLints` e `git diff --check`, sem erros.

## Itens implementados por impacto

Alta prioridade:

- Entrada do hero.
- Reveal de estatísticas, cards de projetos e CTAs.
- Regra global de `prefers-reduced-motion`.

Média prioridade:

- Stagger em grids.
- Hover padronizado em cards e galeria.
- Dots do carrossel.

Complementos implementados:

- Dropdown com transições de opacidade, transform, fundo e sombra.
- Refinamento dos botões primários e accent com lift e brilho discreto.
- Animações específicas em ícones Lucide dentro dos cards.

## Resumo da direção visual

As animações devem parecer naturais, leves e institucionais. O movimento ideal para este site é quase imperceptível: ele melhora a leitura, cria sensação de cuidado e deixa a navegação mais agradável sem chamar atenção para si mesmo.
