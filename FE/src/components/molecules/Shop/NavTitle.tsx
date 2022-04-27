import React from 'react';
import Text from '../../atoms/Shop/TextTag';

interface NavTitleProps {
  title: string;
  count: number;
}
function NavTitle({ title, count }: NavTitleProps): JSX.Element {
  return (
    <>
      <Text>{title}</Text>
      <Text>{count}</Text>
    </>
  );
}

export default NavTitle;
