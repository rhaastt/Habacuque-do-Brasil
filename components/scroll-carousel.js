/**
 * Carrossel horizontal no mobile com indicadores (dots); em md+ vira grid.
 * Coloque os itens como filhos diretos (ex.: div.card).
 *
 * Atributos opcionais:
 * - track-class: classes Tailwind da faixa (grid em desktop)
 * - aria-label: rótulo acessível da região
 * - skip-item-min-width: não aplica min-w-[80%] nos itens (ex.: ícones em linha com gap fixo)
 * - hide-dots: não renderiza indicadores (ex.: grid que rola como bloco inteiro)
 */
class ScrollCarousel extends HTMLElement {
  connectedCallback() {
    const items = Array.from(this.children);
  
    if (!items.length) return;

    const trackClass =
      this.getAttribute("track-class") ||
      "flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible scroll-smooth";
    const label =
      this.getAttribute("aria-label") || "Carrossel de conteúdo";
    const skipItemMinWidth = this.hasAttribute("skip-item-min-width");
    const hideDots = this.hasAttribute("hide-dots");

    this.style.display = "block";
    this.style.width = "100%";
    this.style.minWidth = "0";

    const track = document.createElement("div");
    track.className = trackClass;
    track.style.minWidth = "0";
    track.setAttribute("role", "region");
    track.setAttribute("aria-label", label);

    items.forEach((el) => {
      if (skipItemMinWidth) {
        el.classList.add("snap-start");
      } else {
        el.classList.add("min-w-[80%]", "md:min-w-0", "snap-start");
      }
      track.appendChild(el);
    });

    const n = items.length;
    let dotsWrap;
    const dots = [];

    if (!hideDots) {
      dotsWrap = document.createElement("div");
      dotsWrap.className = "flex justify-center gap-2 mt-6 md:hidden";
      dotsWrap.setAttribute("aria-hidden", "true");
      for (let i = 0; i < n; i++) {
        const dot = document.createElement("span");
        dot.className =
          "w-2 h-2 rounded-full " +
          (i === 0 ? "bg-primary" : "bg-base-content/30");
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    this.appendChild(track);

    if (!hideDots) {
      this.appendChild(dotsWrap);

      const scrollStep = () => {
        const first = track.children[0];
        const second = track.children[1];
        if (!first) return 0;
        if (second) return second.offsetLeft - first.offsetLeft;
        const g = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 24;
        return first.offsetWidth + g;
      };

      const updateDots = () => {
        const step = scrollStep();
        if (step <= 0) return;
        const index = Math.min(
          n - 1,
          Math.max(0, Math.round(track.scrollLeft / step))
        );
        dots.forEach((dot, i) => {
          dot.classList.toggle("bg-primary", i === index);
          dot.classList.toggle("bg-base-content/30", i !== index);
        });
      };

      track.addEventListener("scroll", () => {
        requestAnimationFrame(updateDots);
      });

      window.addEventListener("resize", () => {
        requestAnimationFrame(updateDots);
      });

      requestAnimationFrame(updateDots);
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

customElements.define("scroll-carousel", ScrollCarousel);
