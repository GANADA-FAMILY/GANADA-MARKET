import styled from 'styled-components';
import { Input, Label } from 'components/atoms/changgun';

interface InputWithLabelProps {
  labelName: string;
  placeholder?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

InputWithLabel.defaultProps = {
  placeholder: '',
};

function InputWithLabel({ labelName, placeholder }: InputWithLabelProps) {
  return (
    <Wrapper>
      <Label>{labelName}</Label>
      <Input placeholder={placeholder} />
    </Wrapper>
  );
}

export { InputWithLabel };
