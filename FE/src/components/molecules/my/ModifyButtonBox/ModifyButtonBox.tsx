import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled';

interface ModifyButtonBoxProps {
  cancel: MouseEventHandler<HTMLElement>;
  submit: MouseEventHandler<HTMLElement>;
}
function ModifyButtonBox({ cancel, submit }: ModifyButtonBoxProps) {
  return (
    <Molecules>
      <button type="button" className="button_cancel" onClick={cancel}>
        취소
      </button>
      <button type="button" className="button_submit" onClick={submit}>
        저장
      </button>
    </Molecules>
  );
}

const Molecules = styled.div`
  padding-top: 28px;
  text-align: center;
  font-size: 0;
  button {
    padding: 0 38px;
    height: 42px;
    line-height: 40px;
    border-radius: 12px;
    font-size: 14px;
    letter-spacing: -0.14px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    text-align: center;
    background-color: #fff;
  }
  button ~ button {
    margin-left: 8px;
  }
  .button_cancel {
    border: 1px solid #d3d3d3;
    color: rgba(34, 34, 34, 0.8);
  }
  .button_submit {
    background-color: #ebebeb;
    font-weight: 600;
    color: #fff;
    background-color: #222;
    cursor: default;
    border: 0;
    outline: none;
  }
`;

export default ModifyButtonBox;
