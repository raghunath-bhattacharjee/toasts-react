export default function Toast({
    message,
    type,
    dismissible = true,
    onClose
}) {
    return (
        <div className={`rtl-toast ${type}`}>
            {typeof message === "function" ? message() : message}

            {dismissible && (
                <button
                    className="rtl-toast-close"
                    onClick={onClose}
                >
                    ×
                </button>
            )}
        </div>
    );
}
