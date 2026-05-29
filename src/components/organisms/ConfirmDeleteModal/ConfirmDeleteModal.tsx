import type { MouseEvent } from 'react';
import styles from './ConfirmDeleteModal.module.css';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteModal({ isOpen, name, onConfirm, onClose }: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHead}>Excluir emissor</div>
        <div className={styles.modalBody}>
          <p>
            Tem certeza que deseja excluir o emissor <b>{name}</b>? Esta ação não poderá ser desfeita.
          </p>
          <div className={styles.modalActions}>
            <button className={styles.btnCancelModal} type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className={styles.btnConfirm} type="button" onClick={onConfirm}>
              Sim, excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
