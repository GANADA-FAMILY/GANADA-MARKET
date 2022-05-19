interface Transaction {
  historyDate: Date;
  historyPrice: number;
}

const DUMMY_DATA = [
  {
    historyDate: '2022-05-18T01:04:33.000+00:00',
    historyPrice: '100',
  },
  {
    historyDate: '2022-05-18T01:04:33.000+00:00',
    historyPrice: '200',
  },
  {
    historyDate: '2022-05-17T01:04:33.000+00:00',
    historyPrice: '300',
  },
  {
    historyDate: '2021-07-01T01:04:33.000+00:00',
    historyPrice: '200',
  },
  {
    historyDate: '2022-04-18T01:04:33.000+00:00',
    historyPrice: '1200',
  },
  {
    historyDate: '2022-03-01T01:04:33.000+00:00',
    historyPrice: '100',
  },
  {
    historyDate: '2022-05-10T01:04:33.000+00:00',
    historyPrice: '600',
  },
  {
    historyDate: '2021-12-22T01:04:33.000+00:00',
    historyPrice: '700',
  },
  {
    historyDate: '2021-06-20T01:04:33.000+00:00',
    historyPrice: '800',
  },
  {
    historyDate: '2021-06-20T01:04:33.000+00:00',
    historyPrice: '1000',
  },
  {
    historyDate: '2021-06-18T01:04:33.000+00:00',
    historyPrice: '600',
  },
  {
    historyDate: '2022-01-20T01:04:33.000+00:00',
    historyPrice: '3000',
  },
  {
    historyDate: '2022-04-05T01:04:33.000+00:00',
    historyPrice: '100',
  },
  {
    historyDate: '2022-03-18T01:04:33.000+00:00',
    historyPrice: '1000',
  },
  {
    historyDate: '2022-02-22T01:04:33.000+00:00',
    historyPrice: '100',
  },
  {
    historyDate: '2022-01-01T01:04:33.000+00:00',
    historyPrice: '400',
  },
  {
    historyDate: '2022-05-18T01:04:33.000+00:00',
    historyPrice: '100',
  },
];

Date.prototype.addDays = function addDays(days) {
  this.setDate(this.getDate() + days);
};

// 두 날짜 사이의 날짜들을 배열로 반환
const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray = [];
  const currentDate = new Date(startDate.getTime());
  currentDate.addDays(1);
  while (
    currentDate < stopDate &&
    currentDate.toDateString() !== stopDate.toDateString()
  ) {
    dateArray.push(new Date(currentDate));
    currentDate.addDays(1);
  }
  return dateArray;
};

// 날짜별로 하나식만 남기는 함수
const setFinalPrice = (result: Transaction[], item: Transaction) => {
  if (result.length === 0) {
    return [item];
  }
  if (
    result[result.length - 1].historyDate.toDateString() ===
    item.historyDate.toDateString()
  ) {
    result.pop();
  }
  return [...result, item];
};

// 날짜사이에 값을 넣어주는 함수
const insertHistory = (result: Transaction[], item: Transaction) => {
  if (result.length === 0) {
    return [item];
  }

  const latestTransaction = result[result.length - 1];
  const betweenData = getDates(
    latestTransaction.historyDate,
    item.historyDate,
  ).map((historyDate) => ({
    historyDate,
    historyPrice: latestTransaction.historyPrice,
  }));

  return [...result, ...betweenData, item];
};

// 데이터 정제
// 날짜별로 정렬 -> 날짜별로 하나식만 남김 -> 날짜 사이값 넣기
const newData = DUMMY_DATA.map((data) => ({
  historyDate: new Date(data.historyDate),
  historyPrice: Number(data.historyPrice),
}))
  .sort((a, b) => Number(a.historyDate) - Number(b.historyDate))
  .reduce(setFinalPrice, [])
  .reduce(insertHistory, []);

// 최초거래일이 1년 미만인 경우, 1년전까지 가격 0 삽입하기

const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
const beforeTrade = getDates(oneYearAgo, newData[0].historyDate).map(
  (historyDate) => ({
    historyDate,
    historyPrice: newData[0].historyPrice,
  }),
);
newData.unshift(...beforeTrade);

const tomorrow = new Date();
tomorrow.addDays(1);

const afterTrade = getDates(
  newData[newData.length - 1].historyDate,
  tomorrow,
).map((historyDate) => ({
  historyDate,
  historyPrice: newData[newData.length - 1].historyPrice,
}));

newData.push(...afterTrade);

export { newData };
