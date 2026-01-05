let injected = false;

export function injectToastStyles() {
  if (injected || typeof document === "undefined") return;

  const style = document.createElement("style");
  style.setAttribute("data-toasts-react", "");

  style.innerHTML = `
    .rtl-toast-container {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .rtl-toast {
      background: #0b1220;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      min-width: 200px;
      font-size: 14px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      cursor: pointer;
      animation: rtl-slide-in 0.25s ease-out;
    }

    .rtl-toast.success { background: #16a34a; }
    .rtl-toast.error { background: #dc2626; }
    .rtl-toast.info { background: #2563eb; }
    .rtl-toast.warning { background: #f59e0b; }
    .rtl-toast.loading { background: #0f172a; }

    @keyframes rtl-slide-in {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  document.head.appendChild(style);
  injected = true;
}
