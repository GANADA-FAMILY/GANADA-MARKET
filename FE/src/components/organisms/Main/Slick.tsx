import React from 'react';
import Slider from 'react-slick';
import './slickStyle.css';
import './slick-theme.css';
import styled from '@emotion/styled';
import Image from '../../atoms/Main/Image/Image';

function Slick() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      <Item>
        <SlickImage src="./images/abcmart.png" alt="abcmart1" />
      </Item>
      <Item>
        <SlickImage src="./images/abcmart2.png" alt="abcmart2" />
      </Item>
      <Item>
        <SlickImage src="./images/comeon.png" alt="comeon" />
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
