class SiteSidebar extends HTMLElement {
    connectedCallback() {
      const base = this.getAttribute("base") || "./";
      const current = this.getAttribute("current") || "";
  
      const isActive = (key) => (current === key ? "active" : "");
      const isOpenQuemSomos = current === "sobre" || current === "nossa-equipe";
      const isOpenProjetos = current === "projetos";
  
    this.className = "drawer-side z-[60]";
    this.innerHTML = `
      <label for="nav-drawer" aria-label="Fechar menu" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4 text-lg">
        <li class="menu-title">Menu</li>
        <li><a href="${base}index.html" class="${isActive("inicio")}">Início</a></li>
        <li>
          <details ${isOpenQuemSomos ? "open" : ""}>
            <summary>Quem Somos</summary>
            <ul>
              <li><a href="${base}pages/sobre.html" class="${isActive("sobre")}">Sobre</a></li>
              <li><a href="${base}pages/nossa-equipe.html" class="${isActive("nossa-equipe")}">Nossa Equipe</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details ${isOpenProjetos ? "open" : ""}>
            <summary>Projetos</summary>
            <ul>
              <li><a href="${base}pages/projetos.html" class="${isActive("projetos")}">Todos os Projetos</a></li>
              <li><a href="${base}pages/projetos/convivencia-e-fortalecimento.html">Convivência e Fortalecimento</a></li>
              <li><a href="${base}pages/projetos/atividades-socioeducativas.html">Atividades Socioeducativas</a></li>
              <li><a href="${base}pages/projetos/acoes-comunitarias.html">Ações Comunitárias</a></li>
            </ul>
          </details>
        </li>
        <li><a href="${base}pages/quero-apoiar.html" class="${isActive("quero-apoiar")}">Quero Apoiar</a></li>
        <li><a href="${base}pages/quero-doar.html" class="${isActive("quero-doar")}">Quero Doar</a></li>
        <li><a href="${base}pages/contato.html" class="${isActive("contato")}">Contato</a></li>
      </ul>
    `;
    }
  }
  
  customElements.define("site-sidebar", SiteSidebar);