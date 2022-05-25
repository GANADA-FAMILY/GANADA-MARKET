import axios from 'axios';
import { Item } from 'components/atoms/My';
import { useRef, useState } from 'react';
import styled from 'styled-components';

type DataType = {
  [key: string]: string;
};

function AuctionCreatePage() {
  const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
  `;

  const auctionTitle = useRef<HTMLInputElement>(null);
  const [auctionImages, setAuctionImages] = useState<File[]>([]);
  const productId = useRef<HTMLInputElement>(null);
  const startPrice = useRef<HTMLInputElement>(null);
  const cycle = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const depreciation = useRef<HTMLInputElement>(null);
  const endTime = useRef<HTMLInputElement>(null);

  const fileSelectedHandler = (e: any) => {
    const filesObject: FileList | null = e.target.files;
    const fileArray = Array.prototype.slice.call(filesObject);
    setAuctionImages(fileArray);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const now = new Date();

    const formData = new FormData();

    auctionImages.forEach((item) => formData.append('auctionImages', item));

    const otherDatas: DataType = {
      auctionTitle: auctionTitle.current?.value as string,
      productId: productId.current?.value as string,
      startPrice: startPrice.current?.value as string,
      cycle: cycle.current?.value as string,
      description: description.current?.value as string,
      depreciation: depreciation.current?.value as string,
      endTime: endTime.current?.value as string,
    };

    Object.keys(otherDatas).forEach((key) =>
      formData.append(key, otherDatas[key]),
    );

    axios.post('http://localhost:8080/api/auction', formData, {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwY2cwNTI3QG5hdmVyLmNvbSIsImlzcyI6ImdhbmFkYW1hcmtldC5jb20iLCJleHAiOjE2NTM1NTM2MzgsImlhdCI6MTY1MzQ2NzIzOH0.EPDnDLWD2men2F8IIy8gFf68o86IqBkawfEVolhJIGlAfGV7s-3hld3UEZvtdQH9uJUgd9JsEkjIMoa_q-_c3Q',
      },
    });
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <label htmlFor="제목">
        auctionTitle, 제목
        <input ref={auctionTitle} type="text" />
      </label>
      <label htmlFor="이미지">
        auctionImages, 이미지
        <input onChange={fileSelectedHandler} type="file" multiple />
      </label>
      <label htmlFor="produc">
        productId, 숫자로
        <input ref={productId} type="number" />
      </label>
      <label htmlFor="제목">
        startPrice, 숫자로
        <input ref={startPrice} type="text" />
      </label>
      <label htmlFor="제목">
        cycle, 숫자로
        <input ref={cycle} type="text" />
      </label>
      <label htmlFor="제목">
        description,아무거나 쓰셈
        <input ref={description} type="text" />
      </label>
      <label htmlFor="제목">
        depreciation, 숫자
        <input ref={depreciation} type="text" />
      </label>
      <label htmlFor="끝나는 날짜">
        endDate, yyyy.MM.dd HH:mm:ss
        <input ref={endTime} type="text" />
      </label>
      <button type="submit">데이터 넣기</button>
    </Wrapper>
  );
}

export default AuctionCreatePage;
