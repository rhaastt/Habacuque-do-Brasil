class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || "./";

    this.innerHTML = `
      <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 text-xs leading-relaxed">

        <!-- Marca -->
        <aside class="max-w-xs">
          <img 
            src="${base}imagens/Logo-PRETO.svg" 
            alt="Logo da Associação Habacuque do Brasil" 
            class="w-20 h-20"
            loading="lazy"
            decoding="async"
          >
          <p class="mt-2">
            <strong>Associação Habacuque do Brasil</strong>
            <br />
            Promovendo o desenvolvimento social de crianças, adolescentes e famílias.
          </p>
        </aside>

        <!-- Navegação institucional -->
        <nav aria-label="Navegação principal">
          <h6 class="footer-title text-xs">Navegação</h6>
          <a href="${base}index.html" class="link link-hover">Início</a>
          <a href="${base}pages/sobre.html" class="link link-hover">Quem Somos</a>
          <a href="${base}pages/projetos/olhar-brilhante.html" class="link link-hover">Projeto</a>
          <a href="${base}pages/nossa-equipe.html" class="link link-hover">Nossa Equipe</a>
        </nav>

        <!-- Ações -->
        <nav aria-label="Ações do usuário">
          <h6 class="footer-title text-xs">Participe</h6>
          <a href="${base}pages/quero-apoiar.html" class="link link-hover">Quero Apoiar</a>
          <a href="${base}pages/quero-doar.html" class="link link-hover">Quero Doar</a>
          <a href="${base}pages/contato.html" class="link link-hover">Contato</a>
        </nav>

        <!-- Contato -->
        <address class="not-italic">
          <h6 class="footer-title text-xs">Contatos</h6>

          <a href="tel:+5511939524950" class="link link-hover block">
            <i data-lucide="phone" class="h-4 w-4 inline-block mr-1" aria-hidden="true"></i>(11) 93952-4950
          </a>

          <a href="tel:+5511940854187" class="link link-hover block">
             <i data-lucide="phone" class="h-4 w-4 inline-block mr-1" aria-hidden="true"></i> (11) 94085-4187
          </a>

          <a href="mailto:onghabacuque@gmail.com" class="link link-hover block">
            <i data-lucide="mail" class="h-4 w-4 inline-block mr-1" aria-hidden="true"></i> onghabacuque@gmail.com
          </a>
        </address>

        <!-- Redes sociais -->
        <nav aria-label="Redes sociais">
          <h6 class="footer-title text-xs">Redes sociais</h6>

          <div class="grid grid-flow-col gap-3 items-center">
            <a 
              href="https://www.instagram.com/ong_habacuque/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram — abre em nova aba"
              title="Instagram"
              class="btn btn-ghost btn-sm btn-circle transition-transform duration-150 hover:scale-110"
            >
              <i data-lucide="instagram" class="h-5 w-5" aria-hidden="true"></i>
            </a>

            <a 
              href="https://www.facebook.com/ongHabacuque/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook — abre em nova aba"
              title="Facebook"
              class="btn btn-ghost btn-sm btn-circle transition-transform duration-150 hover:scale-110"
            >
              <i data-lucide="facebook" class="h-5 w-5" aria-hidden="true"></i>
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