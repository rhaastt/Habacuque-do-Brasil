class SiteHeader extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || "./";
    const current = this.getAttribute("current") || "";
    const heroOverlay = this.hasAttribute("hero-overlay");

    const isActive = (key) => (current === key ? "active" : "");

    if (heroOverlay) {
      this.setAttribute("data-hero-overlay", "");
    }

    const barClasses = heroOverlay
      ? "navbar site-header-bar site-header-bar--overlay fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-all duration-300 ease-out"
      : "navbar site-header-bar bg-base-100 shadow-lg sticky top-0 z-50";

    this.classList.add("block");

    this.innerHTML = `
  <div class="${barClasses}" data-site-header-bar>
    <div class="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">

      <div class="flex items-center">
        <a href="${base}index.html" class="site-header-home btn btn-ghost text-xl gap-2 px-0 border-transparent">
          <img
            src="${base}imagens/Logo-PRETO.svg"
            alt="Logo da Associação Habacuque do Brasil"
            class="site-header-logo h-8 w-auto transition-all duration-300"
          />
          <span class="site-header-brand font-semibold">Habacuque</span>
        </a>
      </div>

      <ul class="hidden lg:flex menu menu-horizontal gap-2 px-1 text-lg">
        <li><a href="${base}index.html" class="${isActive("inicio")}">Início</a></li>

        <li>
          <details>
            <summary>Quem Somos</summary>
            <ul class="site-header-dropdown p-2 rounded-box w-56 z-[60] shadow-lg transition-all duration-300 ease-out bg-base-100 text-base-content">
              <li><a href="${base}pages/sobre.html" class="${isActive("sobre")}">Nossa História</a></li>
              <li><a href="${base}pages/nossa-equipe.html" class="${isActive("nossa-equipe")}">Nossa Equipe</a></li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary>Ações</summary>
            <ul class="site-header-dropdown p-2 rounded-box w-72 z-[60] shadow-lg transition-all duration-300 ease-out bg-base-100 text-base-content">
              <li><a href="${base}pages/projetos/olhar-brilhante.html">Projeto Olhar Brilhante</a></li>
              <li><a href="${base}pages/projetos/acoes-comunitarias.html">Ações Comunitárias</a></li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary>Quero Apoiar</summary>
            <ul class="site-header-dropdown p-2 rounded-box w-72 z-[60] shadow-lg transition-all duration-300 ease-out bg-base-100 text-base-content">
              <li><a href="${base}pages/quero-apoiar.html">Quero Apoiar</a></li>
              <li><a href="${base}pages/quero-doar.html">Quero Doar</a></li>
            </ul>
          </details>
        </li>
        <li><a href="${base}pages/contato.html">Contato</a></li>
      </ul>

      <div class="lg:hidden">
        <label for="nav-drawer" class="site-header-menu-btn btn btn-square btn-ghost border-transparent">
          <i data-lucide="menu" class="h-6 w-6"></i>
        </label>
      </div>

    </div>
  </div>
`;

    const bar = this.querySelector("[data-site-header-bar]");
    if (heroOverlay && bar) {
      const SCROLL_THRESHOLD = 48;
      const onScroll = () => {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;
        bar.classList.toggle("site-header--scrolled", scrolled);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const menuDetails = this.querySelectorAll("[data-site-header-bar] details");
    menuDetails.forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        menuDetails.forEach((other) => {
          if (other !== details) {
            other.open = false;
          }
        });
      });
    });

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

customElements.define("site-header", SiteHeader);
