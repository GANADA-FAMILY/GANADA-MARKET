import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from '../../organisms/Main/Main';
import Slick from '../../organisms/Main/Slick';

interface Goods {
  id: string;
  name: string;
  brand: string;
  val: number;
  isLike: boolean;
}
function MainTemplate() {
  const [product, setProduct] = useState<Goods | null>(null);
  useEffect(() => {
    setProduct(null);
    axios
      .get('/pro', {
        headers: {
          Authorization: `${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Slick />
      <Main data={productInfo} />
    </>
  );
}

export default MainTemplate;

const productInfo = [
  {
    id: '아이디1',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디2',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
  {
    id: '아이디3',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디4',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
  {
    id: '아이디5',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디6',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
  {
    id: '아이디7',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디8',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
  {
    id: '아이디9',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디10',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
  {
    id: '아이디11',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: false,
  },
  {
    id: '아이디12',
    name: '네임',
    brand: '나이키',
    val: 188000,
    isLike: true,
  },
];
