import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import LinkTag from '../../atoms/Shop/LinkTag';
import { setNavFilter } from '../../../state/reducers/ShopNavFilter';
import { useRootSelector } from '../../../state/Hooks';

function ButtonFilter() {
  const [property, setProperty] = useState('time');

  // 리덕스로 값 바꾸자
  // 변수로 태그 하나 Depth가 길어지니 전역으로 관리하기

  const dispatch = useDispatch();

  const ClickEvent = (value: string) => {
    setProperty(value);
    dispatch(setNavFilter({ name: value }));
  };

  return (
    <FlexContainer {...style}>
      <LinkTag
        isClick={property === 'time'}
        onClick={() => {
          ClickEvent('time');
        }}
        virtualAfter
        hoverColor
      >
        남은 시간순
      </LinkTag>
      <LinkTag
        isClick={property === 'recommend'}
        onClick={() => {
          ClickEvent('recommend');
        }}
        virtualAfter
        hoverColor
      >
        추천
      </LinkTag>
      <LinkTag
        isClick={property === 'lowPrice'}
        onClick={() => {
          ClickEvent('lowPrice');
        }}
        virtualAfter
        hoverColor
      >
        낮은가격순
      </LinkTag>
      <LinkTag
        isClick={property === 'highPrice'}
        onClick={() => {
          ClickEvent('highPrice');
        }}
        hoverColor
      >
        높은가격순
      </LinkTag>
    </FlexContainer>
  );
}

const style = {
  justifyContent: 'space-between',
};

export default ButtonFilter;
