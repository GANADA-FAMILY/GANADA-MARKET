import ReactDOM from 'react-dom';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { closeModal } from 'state/reducers/ModalOpenSlice';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
}

const BackDrop = styled.div`
  position: fixed;
  /* Header의 z-index가 1이기 때문에 10으로 설정 */
  z-index: 10;
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

function TopModal({ children }: ModalProps) {
  const dispatch = useRootDispatch();
  const modalOpen = useRootSelector((state) => state.modalOpen);

  // getElementById의 반환 타입이 HTMLElement || null
  // CreatePortal은 null타입을 인자로 받지않으므로 타입캐스팅이 필요
  const modalRoot = document.getElementById('modal') as HTMLElement;
  const modalNode = (
    <BackDrop onClick={() => dispatch(closeModal())}>
      <ModalBody onClick={(e) => e.stopPropagation()}>{children}</ModalBody>
    </BackDrop>
  );

  return modalOpen ? ReactDOM.createPortal(modalNode, modalRoot) : null;
}

export { TopModal };
