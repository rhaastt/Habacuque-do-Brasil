class SiteSidebar extends HTMLElement {
    connectedCallback() {
      const base = this.getAttribute("base") || "./";
      const current = this.getAttribute("current") || "";
  
      const isActive = (key) => (current === key ? "active" : "");
      const isOpenQuemSomos = current === "sobre" || current === "nossa-equipe";
      const isOpenProjetos = current === "projetos";
      const isOpenQueroApoiar = current === "quero-apoiar" || current === "quero-doar";
  
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
            <summary>Projeto</summary>
            <ul>
              <li><a href="${base}pages/projetos/olhar-brilhante.html">Projeto Olhar Brilhante</a></li>
              <li><a href="${base}pages/projetos/acoes-comunitarias.html">Ações Comunitárias</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details ${isOpenQueroApoiar ? "open" : ""}>
            <summary>Quero Apoiar</summary>
            <ul>
              <li><a href="${base}pages/quero-apoiar.html">Quero Apoiar</a></li>
              <li><a href="${base}pages/quero-doar.html">Quero Doar</a></li>
            </ul>
          </details>
        </li>
        <li><a href="${base}pages/contato.html" class="${isActive("contato")}">Contato</a></li>
      </ul>
    `;
    }
  }
  
  customElements.define("site-sidebar", SiteSidebar);