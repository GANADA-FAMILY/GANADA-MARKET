import styled from '@emotion/styled';
import { Title } from 'components/atoms/My';
import theme from 'styles/theme';

interface ModalProps {
  children: React.ReactNode;
  visible?: boolean;
  title?: string;
  className?: string;
  onClose?: () => void;
}

function Modal({ children, visible, title, className, onClose }: ModalProps) {
  return (
    <Molecule className={className} visible={visible} onClick={onClose}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {title !== '' && (
          <ModalHeader>
            <Title level={2} size={18} color="black">
              {title}
            </Title>
          </ModalHeader>
        )}
        {children}
      </ModalContainer>
    </Molecule>
  );
}

Modal.defaultProps = {
  visible: false,
  title: '',
  className: '',
};
const Molecule = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(34, 34, 34, 0.5);
  z-index: 1010;
  display: ${(props) => `${props.visible ? 'block' : 'none'}`};
`;

const ModalContainer = styled.div<ModalProps>`
  width: 520px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.color.white};
  border-radius: 16px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
`;

const ModalHeader = styled.div`
  line-height: 22px;
  padding: 18px 50px 20px;
  min-height: 60px;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.15px;
  text-align: center;
  background-color: ${theme.color.white};
`;
export default Modal;
