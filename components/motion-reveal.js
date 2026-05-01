(function () {
  const revealSelector = [
    ".motion-reveal",
    ".stats",
    ".card",
    "main section > header",
    "main section iframe",
    "main section .rounded-2xl",
    "main section .rounded-box",
    "main section figure",
  ].join(",");

  const staggerSelector = [
    ".grid",
    ".columns-1",
    "scroll-carousel",
  ].join(",");

  function getMotionPreset(element) {
    if (element.dataset.motion) return element.dataset.motion;
    if (element.matches(".stats, .radial-progress")) return "scale-in";
    if (element.matches("iframe, figure")) return "fade-in";
    if (element.matches("main section > header")) return "slide-right";
    return "fade-up";
  }

  function applyStaggerIndexes() {
    document.querySelectorAll(staggerSelector).forEach((container) => {
      const trackContainer = container.matches("scroll-carousel")
        ? container.querySelector('[role="region"]') || container
        : container;
      const children = Array.from(trackContainer.children);
      let hasReveal = false;

      children.forEach((child, index) => {
        const reveal = child.matches(".motion-reveal")
          ? child
          : child.querySelector(".motion-reveal");

        if (!reveal) return;

        hasReveal = true;
        reveal.style.setProperty("--motion-delay", `${Math.min(index, 6) * 55}ms`);
      });

      if (hasReveal) {
        container.classList.add("motion-stagger");
      }
    });
  }

  function setupReveal() {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll(revealSelector))
      .filter((element) => !element.closest("site-header, site-footer, site-sidebar"))
      .filter((element) => !element.closest(".hero, section[class*='bg-cover']"))
      .filter((element) => !(element.matches("figure") && element.closest(".card")))
      .filter((element) => !(element.matches("header") && element.closest(".card")));

    elements.forEach((element) => {
      element.classList.add("motion-reveal");
      element.dataset.motion = getMotionPreset(element);

      if (element.matches("figure") || element.closest(".columns-1")) {
        element.classList.add("motion-gallery-item");
      }
    });

    applyStaggerIndexes();

    document.querySelectorAll(".btn-primary, .btn-accent").forEach((button) => {
      button.classList.add("motion-button-lift");
    });

    if (shouldReduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupReveal);
  } else {
    setupReveal();
  }
})();
