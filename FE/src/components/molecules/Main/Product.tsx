import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AuctionList from 'types/Entity/AuctionList';
import auctionAPI from 'api/auctionAPI';
import Image from '../../atoms/Main/Image';
import Text from '../../atoms/Main/Text';
import FlexBox from '../../layouts/Main/FlexBox';
import Icon from '../../atoms/Main/Icon';
import Svg from './Svg';

interface Props {
  data: AuctionList;
}

function Product({ data }: Props) {
  const {
    auctionId,
    auctionTitle,
    titleImageUrl,
    product,
    seller,
    startTime,
    startPrice,
    cycle,
    depreciation,
  } = data;
  const [like, setLike] = useState<boolean>(true);
  const navigate = useNavigate();
  const onLink = () => {
    navigate(`/product/${auctionId}`);
  };

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (like) {
      auctionAPI
        .unlikeAuction(data.auctionId)
        .then(() => {
          setLike(!like);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      auctionAPI
        .likeAuction(data.auctionId)
        .then(() => {
          setLike(!like);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Molecule onClick={onLink}>
      <SVGWrap onClick={onClick}>
        <Svg fill={like ? 'black' : 'none'} />
      </SVGWrap>
      <Image src={titleImageUrl} alt={product.productName} />
      <FlexBox>
        <Title>{auctionTitle}</Title>
        <Text>{startPrice}원</Text>
        <Descript>즉시구매가</Descript>
      </FlexBox>
    </Molecule>
  );
}

export default Product;

const Molecule = styled.article`
  width: 100%;
  padding: 0 1.2rem;
  margin: 2rem 0;
  position: relative;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 1rem 0;
  text-align: left;
`;

const Descript = styled(Text)`
  font-size: 1.3rem;
  color: grey;
`;

const SVGWrap = styled.div`
  position: absolute;
  display: inline;
  top: 1rem;
  right: 2.2rem;
  z-index: 1;
`;
