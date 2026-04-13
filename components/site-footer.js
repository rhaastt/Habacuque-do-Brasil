class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || "./";

    this.innerHTML = `
      <footer class="footer sm:footer-horizontal bg-black text-white p-10 text-xs leading-relaxed">

        <!-- Marca -->
        <aside class="max-w-xs">
          <img 
            src="${base}imagens/logos/logo-branco.svg" 
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
          <a href="${base}pages/quem-somos/nossa-historia.html" class="link link-hover">Nossa História</a>
          <a href="${base}pages/quem-somos/nossa-equipe.html" class="link link-hover">Nossa Equipe</a>
          <a href="${base}pages/quem-somos/transparencia.html" class="link link-hover">Transparência</a>
          <a href="${base}pages/projetos/olhar-brilhante.html" class="link link-hover">Projeto Olhar Brilhante</a>
          <a href="${base}pages/projetos/acoes-comunitarias.html" class="link link-hover">Ações Comunitárias</a>
          <a href="${base}pages/galeria.html" class="link link-hover">Galeria</a>
        </nav>

        <!-- Ações -->
        <nav aria-label="Ações do usuário">
          <h6 class="footer-title text-xs">Participe</h6>
          <a href="${base}pages/quero-apoiar/quero-apoiar.html" class="link link-hover">Quero Apoiar</a>
          <a href="${base}pages/quero-apoiar/quero-doar.html" class="link link-hover">Quero Doar</a>
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
              class="btn btn-ghost btn-circle btn-sm  shadow-none transition-all duration-150 hover:scale-110 hover:bg-transparent"
            >
              <img src="${base}imagens/logos/instagram-branco.svg" alt="Instagram" class="h-6 w-auto object-contain" />
            </a>

            <a 
              href="https://www.facebook.com/ongHabacuque/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook — abre em nova aba"
              title="Facebook"
              class="btn btn-ghost btn-circle btn-sm shadow-none transition-all duration-150 hover:scale-110 hover:bg-transparent"
            >
              <img src="${base}imagens/logos/facebook-branco.svg" alt="Facebook" class="h-6 w-auto object-contain"/>
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