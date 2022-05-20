import styled from 'styled-components';
import { Input, Label } from 'components/atoms/changgun';

interface InputWithLabelProps {
  labelName: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

InputWithLabel.defaultProps = {
  placeholder: '',
  type: 'text',
};

function InputWithLabel({
  labelName,
  placeholder,
  onChange,
  value,
  type,
}: InputWithLabelProps) {
  return (
    <Wrapper>
      <Label>{labelName}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Wrapper>
  );
}

export { InputWithLabel };
