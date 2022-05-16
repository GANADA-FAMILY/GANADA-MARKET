import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ModifyBox } from 'components/atoms/My';
import ModifyButtonBox from '../ModifyButtonBox';

interface InfoGroupItemProps {
  children?: React.ReactNode;
  title: string;
  type: keyof typeof descType;
  value: string;
  submit: React.MouseEventHandler<HTMLElement>;
  modify?: React.MouseEventHandler<HTMLElement>;
}
const descType = {
  text: 'desc',
  email: 'desc email',
  password: 'desc password',
  phone: 'desc',
};

function InfoItem({
  children,
  title,
  type,
  value,
  submit,
  modify,
}: InfoGroupItemProps) {
  const [toggle, setToggle] = useState(false);

  function convert(_type: string, msg: string) {
    if (_type === 'email') {
      const regEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (!regEmail.test(msg)) return msg;
      const splited = msg.split('@');
      const size = splited[0].length;
      return `${
        splited[0].slice(0, 2) + '*'.repeat(size - 3) + splited[0].slice(-1)
      }@${splited[1]}`;
    }
    if (_type === 'phone') {
      const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (!regPhone.test(msg)) return msg;
      const splited = msg.split('-');
      return `${splited[0]}-
      ${splited[1][0]}${'*'.repeat(3)}-
      *${splited[2].slice(1, 4)}`;
    }
    if (_type === 'password') {
      if (msg.length === 0) return msg;
      return '●'.repeat(msg.length);
    }
    return msg;
  }
  return (
    <>
      <UnitBox toggle={toggle}>
        <h5 className="title">{title}</h5>
        <p className={descType[type]}>{convert(type, value)}</p>
        {type !== 'email' ? (
          <button
            type="button"
            className="btn_modify"
            onClick={
              modify === undefined
                ? () => {
                    setToggle(true);
                  }
                : modify
            }
          >
            변경
          </button>
        ) : (
          ''
        )}
      </UnitBox>
      {children !== undefined ? (
        <ModifyBox toggle={toggle}>
          {children}
          <ModifyButtonBox cancel={() => setToggle(false)} submit={submit} />
        </ModifyBox>
      ) : (
        ''
      )}
    </>
  );
}
InfoItem.defaultProps = {
  modify: undefined,
  children: undefined,
};
interface ToggleProps {
  toggle: boolean;
}

const UnitBox = styled.div<ToggleProps>`
  padding: 25px 60px 18px 0;
  position: relative;
  border-bottom: 1px solid #ebebeb;
  display: ${(props) => (props.toggle ? 'none' : '')};
  .title {
    font-size: 13px;
    letter-spacing: -0.07px;
    color: rgba(34, 34, 34, 0.5);
  }
  .desc {
    padding-top: 6px;
    font-size: 16px;
    letter-spacing: -0.16px;
  }
  .desc.email {
    color: rgba(34, 34, 34, 0.5);
  }
  .desc.password {
    font-size: 14px;
    letter-spacing: 0.6px;
  }
  .btn_modify {
    position: absolute;
    right: 0;
    bottom: 15px;
    padding-top: 1px;
    padding-left: 11px;
    padding-right: 12px;
    border: 1px solid #d3d3d3;
    color: rgba(34, 34, 34, 0.8);
    font-size: 12px;
    letter-spacing: -0.06px;
    padding: 0 14px;
    height: 34px;
    line-height: 32px;
    border-radius: 10px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    text-align: center;
    color: rgba(34, 34, 34, 0.8);
    background-color: #fff;
  }
`;

export default InfoItem;
