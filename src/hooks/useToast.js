import { useToastContext } from "../context/ToastContext";

export const useToast = () => {
    const { show, dismiss } = useToastContext();

    return {
        success: (msg, opts = {}) =>
            show(msg, { ...opts, type: "success" }),

        error: (msg, opts = {}) =>
            show(msg, { ...opts, type: "error" }),

        info: (msg, opts = {}) =>
            show(msg, { ...opts, type: "info" }),

        warning: (msg, opts = {}) =>
            show(msg, { ...opts, type: "warning" }),

        loading: (msg, opts = {}) =>
            show(msg, {
                ...opts,
                type: "loading",
                duration: Infinity
            }),

        custom: (renderFn, opts = {}) =>
            show(renderFn, { ...opts, type: "custom" }),

        dismiss
    };
};
