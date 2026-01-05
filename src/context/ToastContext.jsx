import { createContext, useContext, useEffect, useState } from "react";
import Toast from "../components/Toast";
import { injectToastStyles } from "../styles/injectStyles";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        injectToastStyles();
    }, []);

    const show = (message, options = {}) => {
        const id = crypto.randomUUID();

        const toast = {
            id,
            message,
            type: options.type ?? "default",
            duration: options.duration ?? 3000
        };

        setToasts((prev) => [...prev, toast]);

        if (toast.duration !== Infinity) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, toast.duration);
        }

        return id;
    };

    const dismiss = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ show, dismiss }}>
            {children}

            <div className="rtl-toast-container">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        type={t.type}
                        onClose={() => dismiss(t.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return ctx;
};
