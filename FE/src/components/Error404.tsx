import React from 'react';
import styled from '@emotion/styled';

function Error404() {
  return (
    <Container>
      <Error>404 에러 페이지를 찾을 수 없습니다</Error>;
    </Container>
  );
}

const Container = styled.div`
  display: table;
  height: calc(100vh - 25rem);
  width: 100%;
`;

const Error = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 5rem;
  white-space: nowrap;
  font-weight: 1000;
`;

export default Error404;
