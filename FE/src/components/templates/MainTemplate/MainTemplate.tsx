import React from 'react';
import Footer from '../../Footer';
import Main from '../../organisms/Main/Main';
import Slick from '../../organisms/Main/Slick';

interface Props {
  id: string;
  name: string;
  brand: string;
  val: number;
}
function MainTemplate() {
  return (
    <>
      <Slick />
      <Main data={productInfo} />
    </>
  );
}

export default MainTemplate;

const productInfo: Props[] = [
  {
    id: '아이디1',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디2',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디3',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디4',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디5',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디6',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디7',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디8',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디9',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디10',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디11',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
  {
    id: '아이디12',
    name: '네임',
    brand: '나이키',
    val: 188000,
  },
];
