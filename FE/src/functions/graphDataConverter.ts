export interface Transaction {
  historyDate: Date;
  historyPrice: number;
}

export interface FetchedDataType {
  historyDate: string;
  historyPrice: number;
}

function graphDataConverter(data: FetchedDataType[]) {
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

  const newData = data
    .map((item) => ({
      historyDate: new Date(item.historyDate),
      historyPrice: item.historyPrice,
    }))
    .sort((a, b) => Number(a.historyDate) - Number(b.historyDate))
    .reduce(setFinalPrice, [])
    .reduce(insertHistory, []);

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

  return newData;
}

export { graphDataConverter };
