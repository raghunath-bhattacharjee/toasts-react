export const injectToastStyles = () => {
  if (document.getElementById("__toast_styles__")) return;

  const style = document.createElement("style");
  style.id = "__toast_styles__";
  style.innerHTML = `
    :root {
      --rtl-radius: 12px;
      --rtl-shadow: 0 10px 25px rgba(0,0,0,.25);
      --rtl-text: #fff;
      --rtl-font: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Container */
    .rtl-toast-container {
      position: fixed;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 360px;
      font-family: var(--rtl-font);
    }

    .rtl-toast-container.top-right { top: 16px; right: 16px; }
    .rtl-toast-container.top-left { top: 16px; left: 16px; }
    .rtl-toast-container.bottom-right { bottom: 16px; right: 16px; }
    .rtl-toast-container.bottom-left { bottom: 16px; left: 16px; }

    /* Toast */
    .rtl-toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      border-radius: var(--rtl-radius);
      color: var(--rtl-text);
      font-size: 14px;
      line-height: 1.4;
      box-shadow: var(--rtl-shadow);
      animation: rtl-slide-in 0.25s ease-out;
      word-break: break-word;
    }

    /* Variants */
    .rtl-toast.success { background: #16a34a; }
    .rtl-toast.error   { background: #dc2626; }
    .rtl-toast.info    { background: #2563eb; }
    .rtl-toast.warning { background: #ca8a04; }
    .rtl-toast.loading { background: #6b7280; }

    /* Close button */
    .rtl-toast-close {
      margin-left: auto;
      background: none;
      border: none;
      color: inherit;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    .rtl-toast-close:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .rtl-toast-close:focus-visible {
      outline: 2px solid rgba(255,255,255,0.6);
      outline-offset: 2px;
      border-radius: 6px;
    }

    /* Animations */
    @keyframes rtl-slide-in {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes rtl-fade-out {
      to {
        opacity: 0;
        transform: translateY(6px) scale(0.96);
      }
    }

    .rtl-toast.exit {
      animation: rtl-fade-out 0.2s ease-in forwards;
    }

    /* Mobile */
    @media (max-width: 480px) {
      .rtl-toast-container {
        left: 12px !important;
        right: 12px !important;
        max-width: unset;
      }
    }
  `;
  document.head.appendChild(style);
};
