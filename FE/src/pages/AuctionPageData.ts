export const DUMMY_DATA = {
  auction: {
    auctionId: 140,
    auctionImgs: [
      'http://ccimg.hellomarket.com/images/2021/item/12/12/22/0954574_5433529_1.jpg?size=s6',
    ],
    product: {
      productName: 'Airpods 3세대',
      productBrand: 'apple',
      productModel: 'A2566',
      releaseDate: '2021-10-19T00:00:00.000+09:00',
      releasePrice: 450000,
    },
    productHistory: [
      {
        historyDate: '2022-05-18T01:04:33.000+00:00',
        historyPrice: 100,
      },
      {
        historyDate: '2022-05-18T01:04:33.000+00:00',
        historyPrice: 200,
      },
      {
        historyDate: '2022-05-17T01:04:33.000+00:00',
        historyPrice: 300,
      },
      {
        historyDate: '2021-07-01T01:04:33.000+00:00',
        historyPrice: 200,
      },
      {
        historyDate: '2022-04-18T01:04:33.000+00:00',
        historyPrice: 1200,
      },
      {
        historyDate: '2022-03-01T01:04:33.000+00:00',
        historyPrice: 100,
      },
      {
        historyDate: '2022-05-10T01:04:33.000+00:00',
        historyPrice: 600,
      },
      {
        historyDate: '2021-12-22T01:04:33.000+00:00',
        historyPrice: 700,
      },
      {
        historyDate: '2021-06-20T01:04:33.000+00:00',
        historyPrice: 800,
      },
      {
        historyDate: '2021-06-20T01:04:33.000+00:00',
        historyPrice: 1000,
      },
      {
        historyDate: '2021-06-18T01:04:33.000+00:00',
        historyPrice: 600,
      },
      {
        historyDate: '2022-01-20T01:04:33.000+00:00',
        historyPrice: 3000,
      },
      {
        historyDate: '2022-04-05T01:04:33.000+00:00',
        historyPrice: 400,
      },
      {
        historyDate: '2022-03-18T01:04:33.000+00:00',
        historyPrice: 700,
      },
      {
        historyDate: '2022-02-22T01:04:33.000+00:00',
        historyPrice: 900,
      },
      {
        historyDate: '2022-01-01T01:04:33.000+00:00',
        historyPrice: 1000,
      },
      {
        historyDate: '2022-05-18T01:04:33.000+00:00',
        historyPrice: 200,
      },
    ],
    auctionTitle: '에어팟 3세대. 우리아파트 456세대.',
    auctionDesc:
      '에어팟 3세대 팝니다. 미개봉 마켓이니 당연히 사용 안했고요, 작년 10월 생산분입니다. 시세 보다 내려서 파니 빨리 겟하세요',
    seller: '김상희',
    startTime: '2022-05-18T01:39:30.000+09:00',
    startPrice: 200000,
    cycle: 1,
    depreciation: 500,
    endTime: '2022-05-23T00:00:00.000+09:00',
    auctionStatus: true,
    isLiked: false,
    isMine: false,
    likeCnt: 0,
  },
};

export type DataType = typeof DUMMY_DATA;
