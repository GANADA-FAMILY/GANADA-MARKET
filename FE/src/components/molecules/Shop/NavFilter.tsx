import React, { useState } from 'react';
import FlexContainer from '../../layouts/FlexContainer';
import LinkTag from '../../atoms/Shop/LinkTag';

interface ButtonFilterT {
  setState: (state: string) => void;
}

function ButtonFilter({ setState }: ButtonFilterT) {
  const [property, setProperty] = useState('time');

  return (
    <FlexContainer>
      <LinkTag
        isClick={property === 'time'}
        onClick={() => {
          setState('time');
          setProperty('time');
        }}
      >
        남은 시간순
      </LinkTag>
      <LinkTag
        isClick={property === 'recommend'}
        onClick={() => {
          setState('recommend');
          setProperty('recommend');
        }}
      >
        추천
      </LinkTag>
      <LinkTag
        isClick={property === 'lowPrice'}
        onClick={() => {
          setState('lowPrice');
          setProperty('lowPrice');
        }}
      >
        낮은가격순
      </LinkTag>
      <LinkTag
        isClick={property === 'highPrice'}
        onClick={() => {
          setState('highPrice');
          setProperty('highPrice');
        }}
      >
        높은가격순
      </LinkTag>
    </FlexContainer>
  );
}

export default ButtonFilter;
