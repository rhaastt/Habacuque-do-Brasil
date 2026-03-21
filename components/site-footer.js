class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || "./";

    this.innerHTML = `
      <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 text-sm">
        <aside>
          <img src="${base}imagens/Logo-PRETO.svg" alt="Logo da Associação Habacuque do Brasil" class="w-20 h-20">
          <p>
            Associação Habacuque do Brasil
            <br />
            Promovendo o desenvolvimento social de crianças, adolescentes e famílias.
          </p>
        </aside>
        <nav>
          <h6 class="footer-title">Navegação</h6>
          <a href="${base}index.html" class="link link-hover">Início</a>
          <a href="${base}pages/sobre.html" class="link link-hover">Quem Somos</a>
          <a href="${base}pages/projetos/olhar-brilhante.html" class="link link-hover">Projeto</a>
          <a href="${base}pages/nossa-equipe.html" class="link link-hover">Nossa Equipe</a>
        </nav>
        <nav>
          <h6 class="footer-title">Participe</h6>
          <a href="${base}pages/quero-apoiar.html" class="link link-hover">Quero Apoiar</a>
          <a href="${base}pages/quero-doar.html" class="link link-hover">Quero Doar</a>
          <a href="${base}pages/contato.html" class="link link-hover">Contato</a>
        </nav>
        <nav>
          <h6 class="footer-title">Contatos</h6>
          <a href="tel:+5511999990001" class="link link-hover">(11) 99999-0001</a>
          <a href="tel:+5511999990002" class="link link-hover">(11) 99999-0002</a>
          <a href="tel:+5511999990003" class="link link-hover">(11) 99999-0003</a>
        </nav>
        <nav>
          <h6 class="footer-title">Redes sociais</h6>
          <div class="grid grid-flow-col gap-2">
            <a href="#" aria-label="Instagram" class="link link-hover">
              <i data-lucide="instagram" class="h-6 w-6" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="Facebook" class="link link-hover">
              <i data-lucide="facebook" class="h-6 w-6" aria-hidden="true"></i>
            </a>
          </div>
        </nav>
      </footer>
    `;

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

customElements.define("site-footer", SiteFooter);
