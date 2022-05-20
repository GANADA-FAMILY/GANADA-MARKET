export const DUMMY_DATA = {
  auction: {
    auctionId: 101,
    auctionImgs: [
      'https://ganada2.s3.ap-northeast-2.amazonaws.com/img/아이폰12 프로맥스 그래파이트.jpg',
    ],
    product: {
      productId: 36,
      productName: '아이폰12 프로 맥스',
      productBrand: 'apple',
      productModel: 'A2411',
      description: '2020년형,128GB,5G',
      releaseDate: '2020-11-20T00:00:00.000+09:00',
      releasePrice: 1490000,
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
    auctionTitle: '아이폰 12 프로 맥스 그래파이트 말파이트같은 단단함 128GB',
    auctionDesc: '말파이트보다 더 단단한 그래파이트',
    seller: '김민성',
    startTime: '2022-05-17T00:00:00.000+09:00',
    startPrice: 1200000,
    cycle: 20,
    depreciation: 2000,
    endTime: '2022-05-25T00:00:00.000+09:00',
    auctionStatus: true,
    isLiked: false,
    isMine: false,
    likeCnt: 0,
  },
};

export type DataType = typeof DUMMY_DATA;
