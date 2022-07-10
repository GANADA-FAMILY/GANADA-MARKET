import styled from 'styled-components';
import { useState } from 'react';

interface ModalProps {
  children: React.ReactNode;
  inset: string;
  trigger: React.ReactNode;
}

interface ModalBodyStyle {
  inset: string;
}

const ModalTrigger = styled.button`
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;

const BackDrop = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div<ModalBodyStyle>`
  background-color: white;
  width: 100%;
`;

function Modal({ children, inset, trigger }: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ModalTrigger type="button" onClick={() => setShowModal(true)}>
        {trigger}
      </ModalTrigger>
      {showModal && (
        <BackDrop onClick={() => setShowModal(false)}>
          <ModalBody onClick={(e) => e.stopPropagation()} inset={inset}>
            {children}
          </ModalBody>
        </BackDrop>
      )}
    </>
  );
}

export { Modal };
