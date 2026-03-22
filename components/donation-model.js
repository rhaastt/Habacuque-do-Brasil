class DonationModal extends HTMLElement {
  connectedCallback() {
    const modalId = this.getAttribute("modal-id") || "modal-doacao";
    const title = this.getAttribute("title") || "Doação";
    const amount = this.getAttribute("amount") || "R$0";
    const heading =
      this.getAttribute("heading") || `${title} — ${amount}`;
    const description =
      this.getAttribute("description") ||
      `Valor de <strong>${amount}</strong>. Siga os passos abaixo para realizar sua doação.`;

    this.innerHTML = `
      <dialog id="${modalId}" class="modal">
        <div class="modal-box max-w-lg">
          <h3 class="font-bold text-2xl text-primary leading-tight"></h3>

          <p class="text-base text-base-content/80 mt-3 mb-5 leading-relaxed" data-donation-description></p>

          <ol class="list-decimal list-inside space-y-3 text-base text-base-content/80 mb-6 leading-relaxed">
            <li>
              Escolha uma das opções: <strong>PIX</strong> ou <strong>dados bancários</strong>.
            </li>
            <li>
              Realize a transferência com o valor desejado.
            </li>
            <li>
              Se quiser, envie o comprovante via <strong>WhatsApp</strong> pela página de contato.
            </li>
          </ol>

          <div>
              <h4 class="font-semibold text-primary mb-2 text-sm uppercase tracking-wide">
                Dados bancários
              </h4>
              <p class="text-base text-base-content/70 bg-base-200 rounded-box p-3 leading-relaxed">
               <strong>Nome da Empresa:</strong> ASSOCIACAO HABACUQUE DO BRASIL
               <br> <strong>CNPJ:</strong> 27.083.432/0001-60<br>
               <strong>Banco:</strong> 403 - Cora SCFI<br />
               <strong>Agência:</strong> 0001<br />
               <strong>Conta:</strong> 6558757-1
              </p>
            </div>

          <div class="space-y-5">
            <div>
              <h4 class="font-semibold text-primary mt-2 mb-2 text-sm uppercase tracking-wide">
                Chave(s) PIX
              </h4>
              <p class="text-base text-base-content/70 bg-base-200 rounded-box p-3 leading-relaxed"><strong>CNPJ:</strong>
               27.083.432/0001-60
              </p>
              <button class="btn btn-primary btn-xs mt-2" data-copy-pix="27.083.432/0001-60">Copiar chave PIX</button>
            </div>

            <div>
              <h4 class="font-semibold text-primary mb-2 text-sm uppercase tracking-wide">
                QR Code PIX
              </h4>
              <div class="bg-base-200 rounded-box p-8 flex items-center justify-center text-sm text-base-content/60 border border-dashed border-base-300 text-center leading-relaxed">
                <img src="../imagens/qr-code.jpg" alt="QR Code PIX" class="w-full h-auto">
              </div>
            </div>
          </div>

          <div class="modal-action mt-6">
            <form method="dialog">
              <button type="submit" class="btn btn-primary transition-all duration-150">Fechar</button>
            </form>
          </div>
        </div>

        <form method="dialog" class="modal-backdrop">
          <button type="submit" aria-label="Fechar"></button>
        </form>
      </dialog>
    `;

    this.querySelector("h3").textContent = heading;
    const descEl = this.querySelector("[data-donation-description]");
    descEl.innerHTML = description;

    this.querySelectorAll("[data-copy-pix]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.copyPix;
    
        navigator.clipboard.writeText(value);
    
        const original = btn.textContent;
        btn.textContent = "Copiado!";
    
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      });
    });
  }
}

customElements.define("donation-modal", DonationModal);
