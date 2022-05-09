import styled from '@emotion/styled';
import React from 'react';

interface ImageInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  forwardedRef: React.RefObject<HTMLInputElement>;
}
function ImageInput({ onChange, value, forwardedRef }: ImageInputProps) {
  return (
    <Atom
      type="file"
      accept="image/jpeg,image/png"
      value={value}
      onChange={onChange}
      hidden
      ref={forwardedRef}
    />
  );
}
const Atom = styled.input``;
export default ImageInput;
