import React, { useState } from 'react';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import LinkTag from '../../atoms/Shop/LinkTag';

interface ButtonFilterT {
  setState: (state: string) => void;
}

function ButtonFilter({ setState }: ButtonFilterT) {
  const [property, setProperty] = useState('time');

  // 리덕스로 값 바꾸자
  // 변수로 태그 하나 Depth가 길어지니 전역으로 관리하기

  return (
    <FlexContainer>
      <LinkTag
        isClick={property === 'time'}
        onClick={() => {
          setProperty('time');
        }}
      >
        남은 시간순
      </LinkTag>
      <LinkTag
        isClick={property === 'recommend'}
        onClick={() => {
          setProperty('recommend');
        }}
      >
        추천
      </LinkTag>
      <LinkTag
        isClick={property === 'lowPrice'}
        onClick={() => {
          setProperty('lowPrice');
        }}
      >
        낮은가격순
      </LinkTag>
      <LinkTag
        isClick={property === 'highPrice'}
        onClick={() => {
          setProperty('highPrice');
        }}
      >
        높은가격순
      </LinkTag>
    </FlexContainer>
  );
}

export default ButtonFilter;
