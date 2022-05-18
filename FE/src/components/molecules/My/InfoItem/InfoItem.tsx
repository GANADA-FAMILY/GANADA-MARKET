import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, ModifyBox } from 'components/atoms/My';
import convert from 'functions/convert';
import ModifyButtonBox from '../ModifyButtonBox';

interface InfoGroupItemProps {
  children?: React.ReactNode;
  title: string;
  type: keyof typeof descType;
  value: string;
  submit: React.MouseEventHandler<HTMLElement>;
  modify?: React.MouseEventHandler<HTMLElement>;
  hiddenModify?: boolean;
  validate?: boolean;
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
  hiddenModify,
  validate = false,
}: InfoGroupItemProps) {
  const [toggle, setToggle] = useState(false);
  const submitModify = (callback: any) => {
    setToggle(false);
    callback();
  };
  return (
    <>
      <UnitBox toggle={toggle}>
        <h5 className="title">{title}</h5>
        <p className={descType[type]}>{convert(type, value)}</p>
        {!hiddenModify && (
          <Button
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
          </Button>
        )}
      </UnitBox>
      {children !== undefined && (
        <ModifyBox toggle={toggle}>
          {children}
          <ModifyButtonBox
            validate={validate}
            cancel={() => setToggle(false)}
            submit={() => submitModify(submit)}
          />
        </ModifyBox>
      )}
    </>
  );
}
InfoItem.defaultProps = {
  modify: undefined,
  children: undefined,
  hiddenModify: false,
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
