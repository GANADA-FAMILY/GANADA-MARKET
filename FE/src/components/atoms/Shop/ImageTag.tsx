import React from 'react';
import styled from '@emotion/styled';
import LinkTag from './LinkTag';
import Router from '../../../hooks/Router';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface PropsType {
  url: string;
}

function ImageTag({ url }: PropsType) {
  const route = Router();
  const linkDetail = () => {
    route.push('/');
  };

  return (
    <LinkTag onClick={linkDetail}>
      <BlockContainer {...imageWrapperStyle}>
        <StyledImage url={url} />
      </BlockContainer>
    </LinkTag>
  );
}

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
  padding-top: 100%;
  &:hover {
    transform: scale(1.2);
  }
`;

const imageWrapperStyle = {
  width: '333px',
  height: '333px',
  position: 'relative',
  backgroundColor: '#fff',
};

export default ImageTag;
