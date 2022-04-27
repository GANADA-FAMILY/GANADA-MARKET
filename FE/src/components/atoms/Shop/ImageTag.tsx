import React from 'react';
import styled from '@emotion/styled';
import LinkTag from './LinkTag';
import Router from '../../../hooks/Router';
import Container from '../../layouts/BlockContainer';

interface PropsType {
  url: string;
}

function ImageTag({ url }: PropsType) {
  const linkDetail = () => {
    const route = Router();
    route.push('');
  };

  return (
    <LinkTag onClick={linkDetail}>
      <Container {...style}>
        <StyledImage url={url} />
      </Container>
    </LinkTag>
  );
}

const style = {
  display: 'block',
  position: 'relative',
  width: '300px',
  height: '300px',
  backgroundColor: '#fff',
};

const StyledImage = styled.div<PropsType>`
  background-image: url(${(props: PropsType) => props.url});
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  background-size: 74.5342%;
  width: 100%;
  border-radius: 8px;
  transition: all ease-in-out 300ms;

  &:hover {
    transform: scale(1.2);
  }
`;

export default ImageTag;
