import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1.5px solid #efefef;
  outline: none;
  padding: 0.8rem 0rem;

  &:focus {
    border-bottom: 1.5px solid black;
  }
`;

export { Input };
