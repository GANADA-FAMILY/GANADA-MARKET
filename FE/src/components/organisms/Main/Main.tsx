import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import GridBox from '../../layouts/Main/GridBox';
import Text from '../../atoms/Main/Text';
import Button from '../../atoms/Main/Button';
import Product from '../../molecules/Main/Product';

interface Props {
  data: Goods[];
}

interface Goods {
  id: string;
  name: string;
  brand: string;
  val: number;
  isLike: boolean;
}
function Main({ data }: Props) {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [noMore, setNoMore] = useState<boolean>(true);
  const moreGoods = () => {
    const dataLen = data.length;
    const goodsLen = goods.length;
    if (dataLen - goodsLen < 4) {
      setGoods([...goods, ...data.slice(goodsLen, dataLen)]);
    } else {
      setGoods([...goods, ...data.slice(goodsLen, goodsLen + 4)]);
      if (dataLen - goodsLen <= 4) {
        setNoMore(!noMore);
      }
    }
  };
  useEffect(() => {
    if (goods.length === 0) {
      setGoods(data.slice(0, 4));
    }
  }, []);
  return (
    <Container>
      <ProWrap>
        <Title>Just Dropped</Title>
        <Text>발매 상품</Text>
        <GridBox columns="repeat(4, 1fr)">
          {goods.map((item) => {
            return <Product key={item.id} info={item} />;
          })}
        </GridBox>
        <Button onClick={moreGoods} visible={noMore}>
          더보기
        </Button>
      </ProWrap>
    </Container>
  );
}

export default Main;

const Container = styled.main`
  width: 100%;
`;
const ProWrap = styled.section`
  max-width: 128rem;
  margin: 5rem auto 0;
  padding: 0 28px;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: left;
`;
