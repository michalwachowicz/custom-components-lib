import * as styles from "./Modal.module.scss";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode | string;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles["modal-container"]}>
      <div
        data-testid='modal-backdrop'
        className={styles["modal-backdrop"]}
        onClick={onClose}
      />
      <div className={styles["modal"]} role='dialog' aria-modal>
        {children}
      </div>
    </div>
  );
}
