export default function Toast({ message, type, onClose }) {
    return (
        <div className={`rtl-toast ${type}`} onClick={onClose}>
            {message}
        </div>
    );
}
