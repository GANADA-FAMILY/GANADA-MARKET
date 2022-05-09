import React from 'react';
import NavFilter from '../../molecules/Shop/NavFilter';
import NavTitle from '../../molecules/Shop/NavTitle';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface NavProps {
  initialData: string;
  count: number;
}

function Nav({ initialData, count }: NavProps): JSX.Element {
  return (
    <BlockContainer {...outerStyle}>
      <FlexContainer {...innerStyle}>
        <NavTitle title={initialData} count={count} />
        <NavFilter />
      </FlexContainer>
    </BlockContainer>
  );
}

const innerStyle = {
  alignItems: 'flex-end',
  margin: '0 auto',
};

const outerStyle = {
  paddingTop: '6.4rem',
  paddingBottom: '3.2rem',
  verticalAllign: 'text-top',
  width: '100%',
};

export default Nav;
