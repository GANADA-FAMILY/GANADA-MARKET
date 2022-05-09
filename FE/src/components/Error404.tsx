import React from 'react';
import styled from '@emotion/styled';

function Error404() {
  return <Error>404 에러 페이지를 찾을 수 없습니다</Error>;
}

const Error = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  white-space: nowrap;
  font-weight: 1000;
`;

export default Error404;
