class SiteHeader extends HTMLElement {
    connectedCallback() {
      const base = this.getAttribute("base") || "./";
      const current = this.getAttribute("current") || "";
  
      const isActive = (key) => (current === key ? "active" : "");
  
      this.innerHTML = `
  <div class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
    
    <!-- CONTAINER PADRÃO -->
    <div class="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
      
      <!-- Logo -->
      <div class="flex items-center">
        <a href="${base}index.html" class="btn btn-ghost text-xl gap-2 px-0">
          <img
            src="${base}imagens/Logo-PRETO.svg"
            alt="Logo da Associação Habacuque do Brasil"
            class="h-8 w-auto"
          />
          Habacuque
        </a>
      </div>

      <!-- Menu desktop -->
      <ul class="hidden lg:flex menu menu-horizontal gap-2 px-1 text-lg">
        <li><a href="${base}index.html" class="${isActive("inicio")}">Início</a></li>

        <li>
          <details>
            <summary>Quem Somos</summary>
            <ul class="p-2 bg-base-100 rounded-box w-56 z-[60]">
              <li><a href="${base}pages/sobre.html" class="${isActive("sobre")}">Sobre</a></li>
              <li><a href="${base}pages/nossa-equipe.html" class="${isActive("nossa-equipe")}">Nossa Equipe</a></li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary>Projetos</summary>
            <ul class="p-2 bg-base-100 rounded-box w-72 z-[60]">
              <li><a href="${base}pages/projetos.html">Todos os Projetos</a></li>
              <li><a href="${base}pages/projetos/convivencia-e-fortalecimento.html">Convivência e Fortalecimento</a></li>
              <li><a href="${base}pages/projetos/atividades-socioeducativas.html">Atividades Socioeducativas</a></li>
              <li><a href="${base}pages/projetos/acoes-comunitarias.html">Ações Comunitárias</a></li>
            </ul>
          </details>
        </li>

        <li><a href="${base}pages/quero-apoiar.html">Quero Apoiar</a></li>
        <li><a href="${base}pages/quero-doar.html">Quero Doar</a></li>
        <li><a href="${base}pages/contato.html">Contato</a></li>
      </ul>

      <!-- Mobile -->
      <div class="lg:hidden">
        <label for="nav-drawer" class="btn btn-square btn-ghost">
          <i data-lucide="menu" class="h-6 w-6"></i>
        </label>
      </div>

    </div>
  </div>
`;
  
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    }
  }
  
  customElements.define("site-header", SiteHeader);