import React from 'react';
import Text from '../../atoms/Shop/TextTag';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface NavTitleProps {
  title: string;
  count: number;
}
function NavTitle({ title, count }: NavTitleProps): JSX.Element {
  return (
    <>
      <Text {...titleStyle}>{title}(자급제)</Text>
      <BlockContainer {...blockStyle}>
        <Text {...countStyle}>{count}</Text>
        <Text {...fontStyle}> 개의 상품</Text>
      </BlockContainer>
    </>
  );
}

const titleStyle = {
  fontSize: '3.2rem',
  fontWeight: 'bold',
};

const countStyle = {
  fontSize: '2.4rem',
  fontWeight: 'bold',
};

const fontStyle = {
  fontSize: '2.4rem',
};
const blockStyle = {
  display: 'inline-block',
  height: '100%',
  flex: 'auto',
  marginLeft: '1.6rem',
  marginBottom: '0.2rem',
};

export default NavTitle;
