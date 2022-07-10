import { useRootDispatch } from 'state/Hooks';
import { closeModal } from 'state/reducers/ModalOpenSlice';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  shouldShow: boolean;
}

const BackDrop = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

function TopModal({ children, shouldShow }: ModalProps) {
  const dispatch = useRootDispatch();

  return shouldShow ? (
    <BackDrop onClick={() => dispatch(closeModal())}>
      <ModalBody onClick={(e) => e.stopPropagation()}>{children}</ModalBody>
    </BackDrop>
  ) : null;
}

export { TopModal };
