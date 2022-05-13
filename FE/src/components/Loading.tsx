import React, { memo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  min-width: 4rem;
  min-height: 4rem;
  border: 5px solid black;
  border-right: 5px solid yellowgreen;
  border-radius: 50%;
  animation: ${spinner} 1s linear infinite;
`;
function Loader() {
  return (
    <LoaderWrap>
      <Spinner />
    </LoaderWrap>
  );
}

export default memo(Loader);
