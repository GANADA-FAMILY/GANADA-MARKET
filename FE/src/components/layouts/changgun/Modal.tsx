import styled from 'styled-components';
import { useState } from 'react';

const ModalTrigger = styled.button`
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;

interface ModalProps {
  children: React.ReactNode;
  inset: string;
  trigger: React.ReactNode;
}

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface ModalBodyStyle {
  inset: string;
}

const ModalBody = styled.div<ModalBodyStyle>`
  position: fixed;
  background-color: white;
  inset: ${(p) => p.inset};
`;

function Modal({ children, inset, trigger }: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ModalTrigger type="button" onClick={() => setShowModal(true)}>
        {trigger}
      </ModalTrigger>
      {showModal && (
        <ModalBackground onClick={() => setShowModal(false)}>
          <ModalBody inset={inset}>{children}</ModalBody>
        </ModalBackground>
      )}
    </>
  );
}

export { Modal };
