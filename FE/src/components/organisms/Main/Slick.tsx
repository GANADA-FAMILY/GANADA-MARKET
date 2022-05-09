import React from 'react';
import Slider from 'react-slick';
import './slickStyle.css';
import './slick-theme.css';
import styled from '@emotion/styled';
import Image from '../../atoms/Main/Image';

function Slick() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <Item>
        <SlickImage src="./image/abcmart.png" alt="abcmart1" />
      </Item>
      <Item>
        <SlickImage src="./image/abcmart2.png" alt="abcmart2" />
      </Item>
      <Item>
        <SlickImage src="./image/comeon.png" alt="comeon" />
      </Item>
    </Slider>
  );
}

export default Slick;

const SlickImage = styled(Image)`
  max-height: 48rem;
  max-width: 60rem;
  border-radius: 0;
  margin: auto;
  height: 40vw;
`;

const Item = styled.div`
  background-color: #f9f9f9;
  cursor: pointer;
`;
