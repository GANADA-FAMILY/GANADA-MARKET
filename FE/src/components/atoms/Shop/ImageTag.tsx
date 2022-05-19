import React from 'react';
import styled from '@emotion/styled';
import LinkTag from './LinkTag';
import Router from '../../../hooks/Router';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface PropsType {
  url: string;
  auctionId: number;
}

function ImageTag({ url, auctionId }: PropsType) {
  const route = Router();
  const linkDetail = () => {
    route.push(`/auction/${auctionId}`);
  };

  const StyledImage = styled.div`
    position: absolute;
    background-image: url('${url}');
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    background-size: 62.5342%;
    width: 100%;
    border-radius: 8px;
    transition: all ease-in-out 300ms;
    padding-top: 100%;
    &:hover {
      transform: scale(1.1);
    }
  `;
  return (
    <LinkTag onClick={linkDetail}>
      <BlockContainer {...imageWrapperStyle}>
        <StyledImage />
      </BlockContainer>
    </LinkTag>
  );
}

const imageWrapperStyle = {
  width: '333px',
  height: '333px',
  position: 'relative',
  backgroundColor: '#fff',
  border: '1px solid	#D3D3D3',
};

export default ImageTag;
