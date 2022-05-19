import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BlockContainer from 'components/layouts/Shop/BlockContainer';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import LinkTag from '../../atoms/Shop/LinkTag';
import { setNavFilter } from '../../../state/reducers/ShopNavFilter';

function ButtonFilter() {
  const [property, setProperty] = useState('endTime,asc');

  // 리덕스로 값 바꾸자
  // 변수로 태그 하나 Depth가 길어지니 전역으로 관리하기

  const dispatch = useDispatch();

  const ClickEvent = (value: string) => {
    setProperty(value);
    dispatch(setNavFilter({ name: value }));
  };

  return (
    <FlexContainer {...style}>
      <BlockLink>
        <LinkTag
          isClick={property === 'endTime,asc'}
          onClick={() => {
            ClickEvent('endTime,asc');
          }}
          hoverColor
          {...linkStyle}
        >
          남은 시간순
        </LinkTag>
      </BlockLink>
      <BlockLink>
        <LinkTag
          isClick={property === 'likeCnt,desc'}
          onClick={() => {
            ClickEvent('likeCnt,desc');
          }}
          {...linkStyle}
          hoverColor
        >
          추천
        </LinkTag>
      </BlockLink>

      <BlockLink>
        <LinkTag
          isClick={property === 'startPrice,asc'}
          onClick={() => {
            ClickEvent('startPrice,asc');
          }}
          hoverColor
          {...linkStyle}
        >
          낮은가격순
        </LinkTag>
      </BlockLink>
      <BlockContainer>
        <LinkTag
          isClick={property === 'startPrice,desc'}
          onClick={() => {
            ClickEvent('startPrice,desc');
          }}
          hoverColor
          {...linkStyle}
        >
          높은가격순
        </LinkTag>
      </BlockContainer>
    </FlexContainer>
  );
}
const linkStyle = {
  padding: '0.5rem',
};

const BlockLink = styled.div`
  &::after {
    content: '|';
    display: inline-block;
    cursor: none;
    height: 1.6rem;
    width: 1rem;
    color: #dfe0e5;
    margin-right: 1.6rem;
    margin-left: 1.6rem;
  }
`;

const blockEnd = {};

const style = {
  justifyContent: 'space-between',
};

export default ButtonFilter;
