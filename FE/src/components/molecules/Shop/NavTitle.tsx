import React from 'react';
import Text from '../../atoms/Shop/Text';

interface NavTitleProps {
  title: string;
  count: number;
}
function NavTitle({ title, count }: NavTitleProps) {
  return (
    <>
      <Text>{title}</Text>
      <Text>{count}</Text>
    </>
  );
}

export default NavTitle;
