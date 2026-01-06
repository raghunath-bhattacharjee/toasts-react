import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import ReactDOM from "react-dom";
import Toast from "../components/Toast";
import { injectToastStyles } from "../styles/injectStyles";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") injectToastStyles();
    }, []);

    const safeUUID = () =>
        typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now() + Math.random());

    const show = (message, options = {}) => {
        const id = options.id ?? safeUUID();

        const toast = {
            id,
            message,
            type: options.type ?? "default",
            duration: options.duration ?? 3000,
            dismissible: options.dismissible ?? true,
            position: options.position ?? "top-right"
        };

        setToasts((prev) => [...prev, toast]);

        if (toast.duration !== Infinity) {
            setTimeout(() => dismiss(id), toast.duration);
        }

        return id;
    };

    const dismiss = (id) => {
        if (!id) {
            setToasts([]);
            return;
        }

        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const api = useMemo(() => ({ show, dismiss }), []);

    return (
        <ToastContext.Provider value={api}>
            {children}

            {typeof document !== "undefined" &&
                ReactDOM.createPortal(
                    <>
                        {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                            (pos) => (
                                <div key={pos} className={`rtl-toast-container ${pos}`}>
                                    {toasts
                                        .filter((t) => t.position === pos)
                                        .map((t) => (
                                            <Toast
                                                key={t.id}
                                                message={t.message}
                                                type={t.type}
                                                dismissible={t.dismissible}
                                                onClose={() => dismiss(t.id)}
                                            />
                                        ))}
                                </div>
                            )
                        )}
                    </>,
                    document.body
                )}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};
