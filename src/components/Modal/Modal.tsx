import React, { useRef, useEffect, ReactNode } from "react";
import clickOutside from "@/utils/clickOutside";
import "./style.scss";

type ModalProps = {
  show: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ show, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      if (show) {
        document.body.style.overflow = "hidden";
        modalRef.current.showModal();
      } else {
        document.body.style.overflow = "auto";
        modalRef.current.close();
      }
    }
  }, [show]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onClick={(e) => clickOutside(e, modalRef.current) && onClose()}
    >
      {children}
    </dialog>
  );
};

export default Modal;
