import { useToastContext } from "../context/ToastContext";

export const useToast = () => {
    const { show, dismiss } = useToastContext();

    return {
        success: (msg, opts) => show(msg, { ...opts, type: "success" }),
        error: (msg, opts) => show(msg, { ...opts, type: "error" }),
        info: (msg, opts) => show(msg, { ...opts, type: "info" }),
        warning: (msg, opts) => show(msg, { ...opts, type: "warning" }),
        loading: (msg) => show(msg, { type: "loading", duration: Infinity }),
        dismiss
    };
};
