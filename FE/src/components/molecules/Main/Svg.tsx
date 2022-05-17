import React from 'react';
import styled from '@emotion/styled';
import { Icon } from 'components/atoms/Main';

interface Props {
  fill: string;
}

function SVG({ fill }: Props) {
  const options = {
    width: '17px',
    height: '18px',
    stroke: 'black',
    strokeWidth: '1',
    fill,
  };
  return (
    <Icon option={options}>
      <path d="M1,1 L1,17 L7.5,11 L14,17 L14,1 Z" />
    </Icon>
  );
}

export default SVG;
