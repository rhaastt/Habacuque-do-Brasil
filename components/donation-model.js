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

          <div class="space-y-5">
            <div>
              <h4 class="font-semibold text-primary mb-2 text-sm uppercase tracking-wide">
                Chave(s) PIX
              </h4>
              <p class="text-base text-base-content/70 bg-base-200 rounded-box p-3 leading-relaxed">
                em atualização
              </p>
            </div>

            <div>
              <h4 class="font-semibold text-primary mb-2 text-sm uppercase tracking-wide">
                Dados bancários
              </h4>
              <p class="text-base text-base-content/70 bg-base-200 rounded-box p-3 leading-relaxed">
                Banco: em atualização<br />
                Agência: em atualização<br />
                Conta: em atualização
              </p>
            </div>

            <div>
              <h4 class="font-semibold text-primary mb-2 text-sm uppercase tracking-wide">
                QR Code PIX
              </h4>
              <div class="bg-base-200 rounded-box p-8 flex items-center justify-center text-sm text-base-content/60 border border-dashed border-base-300 text-center leading-relaxed">
                QR code em atualização<br />
                (imagem será adicionada em breve)
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
  }
}

customElements.define("donation-modal", DonationModal);
