import { useEffect } from "react";

export default function useClosePopupOnEsc(isOpen, handleClose) {
    useEffect(() => {
        if (!isOpen) return;
        function handleEsc(e) {
            if (e.key === "Escape" || e.target.classList.contains("popup_opened")) {
                handleClose();
            };
        }
        
        document.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener("mousedown", handleEsc);
        };
    }, [isOpen, handleClose]);
}