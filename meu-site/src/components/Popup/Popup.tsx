import type { ReactNode } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  isOpen: boolean;
  onClose?: () => void;
  closable?: boolean;
  children: ReactNode;
}

function Popup({ isOpen, onClose, closable = true, children }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {closable && (<button className={styles.closeButton} onClick={onClose}>
          ×
        </button>)}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Popup