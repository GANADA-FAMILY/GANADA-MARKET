import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { Button } from 'components/atoms/My';
import theme from 'styles/theme';

interface ModifyButtonBoxProps {
  cancel: MouseEventHandler<HTMLElement>;
  submit: MouseEventHandler<HTMLElement>;
  validate?: boolean;
}
function ModifyButtonBox({
  cancel,
  submit,
  validate = false,
}: ModifyButtonBoxProps) {
  return (
    <Molecules>
      <Button type="button" className="button_cancel" onClick={cancel}>
        취소
      </Button>
      <Button
        type="submit"
        className="button_submit"
        disabled={!validate}
        onClick={submit}
      >
        저장
      </Button>
    </Molecules>
  );
}

const Molecules = styled.div`
  padding-top: 28px;
  text-align: center;
  button ~ button {
    margin-left: 8px;
  }
  .button_cancel {
    border: 1px solid #d3d3d3;
    background-color: ${theme.color.white};
    color: rgba(34, 34, 34, 0.8);
  }
`;

export default ModifyButtonBox;
