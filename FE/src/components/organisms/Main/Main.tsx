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
}
function Main({ data }: Props) {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [noMore, setNoMore] = useState<boolean>(true);
  const moreGoods = () => {
    if (data.length < 4) {
      setGoods([...goods, ...data]);
    } else {
      setGoods([...goods, ...data.splice(0, 4)]);
    }
    if (data.length < 4) {
      setNoMore(!noMore);
    }
  };
  useEffect(() => {
    if (goods.length === 0) {
      const temp = data.splice(0, 4);
      console.log(temp);
      setGoods([...goods, ...temp]);
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
