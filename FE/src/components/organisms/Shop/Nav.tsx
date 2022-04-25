import React from 'react';
import NavFilter from '../../molecules/Shop/NavFilter';
import NavTitle from '../../molecules/Shop/NavTitle';
import FlexContainer from '../../templates/Shop/FlexContainer';

interface NavProps {
  initialData: string;
  count: number;
  setState: (state: string) => void;
}

function Nav({ initialData, count, setState }: NavProps): JSX.Element {
  return (
    <FlexContainer>
      <NavTitle title={initialData} count={count} />
      <NavFilter setState={setState} />
    </FlexContainer>
  );
}

export default Nav;
