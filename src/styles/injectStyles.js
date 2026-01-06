export const injectToastStyles = () => {
  if (document.getElementById("__toast_styles__")) return;

  const style = document.createElement("style");
  style.id = "__toast_styles__";
  style.innerHTML = `
    .rtl-toast-container{
      position:fixed;
      z-index:9999;
      display:flex;
      flex-direction:column;
      gap:8px
    }
    .rtl-toast-container.top-right{top:12px;right:12px}
    .rtl-toast-container.top-left{top:12px;left:12px}
    .rtl-toast-container.bottom-right{bottom:12px;right:12px}
    .rtl-toast-container.bottom-left{bottom:12px;left:12px}

    .rtl-toast{
      background:#222;
      color:white;
      padding:12px 14px;
      border-radius:10px;
      display:flex;
      align-items:center;
      gap:8px
    }
    .rtl-toast.success{background:#16a34a}
    .rtl-toast.error{background:#dc2626}
    .rtl-toast.info{background:#2563eb}
    .rtl-toast.warning{background:#ca8a04}
    .rtl-toast.loading{background:#6b7280}

    .rtl-toast-close{
      background:none;
      border:none;
      color:white;
      font-size:16px;
      cursor:pointer
    }
  `;
  document.head.appendChild(style);
};
