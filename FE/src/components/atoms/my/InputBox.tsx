import React from 'react';
import styled from '@emotion/styled';

interface InputBoxProps {
  title: string;
  type: string;
  placeholder: string;
}
function InputBox({ title, type, placeholder }: InputBoxProps) {
  return (
    <Atom>
      <h6 className="input_title">{title}</h6>
      <div className="input_item">
        <input type={type} className="input_text" placeholder={placeholder} />
      </div>
    </Atom>
  );
}

const Atom = styled.div`
  position: relative;
  padding: 10px 0 14px;
  .input_title {
    font-size: 13px;
    letter-spacing: -0.07px;
    line-height: 18px;
  }
  .input_item {
    position: relative;
  }
  .input_text {
    padding: 7px 0;
    font-size: 15px;
    letter-spacing: -0.15px;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
    line-height: 22px;
    border-bottom: 1px solid #ebebeb;
    width: 100%;
  }
`;

export default InputBox;
