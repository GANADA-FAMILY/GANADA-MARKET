import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { newData } from './AuctionGraphData';
import { FetchedDataType, graphDataConverter } from '../../../functions';

Chart.register(...registerables);

interface AuctionGraphProps {
  timeZone: '1개월' | '3개월' | '6개월' | '1년';
  productHistory: FetchedDataType[];
}

function AuctionGraph({ timeZone, productHistory }: AuctionGraphProps) {
  const [entireHistory, setEntireHistory] = useState(
    graphDataConverter(productHistory),
  );
  const [shownHistory, setShownHistory] = useState(
    graphDataConverter(productHistory),
  );

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDiffInDays(a: Date, b: Date) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }

  useEffect(() => {
    const today = new Date();

    switch (timeZone) {
      case '1개월':
        setShownHistory(
          entireHistory.filter(
            (item) => dateDiffInDays(item.historyDate, today) < 30,
          ),
        );
        break;
      case '3개월':
        setShownHistory(
          entireHistory.filter(
            (item) => dateDiffInDays(item.historyDate, today) < 90,
          ),
        );
        break;
      case '6개월':
        setShownHistory(
          entireHistory.filter(
            (item) => dateDiffInDays(item.historyDate, today) < 180,
          ),
        );
        break;
      case '1년':
        setShownHistory(
          entireHistory.filter(
            (item) => dateDiffInDays(item.historyDate, today) < 365,
          ),
        );
        break;
      default:
    }
  }, [timeZone]);

  const data = {
    labels: shownHistory.map((item) => item.historyDate),
    datasets: [
      {
        label: '가격',
        data: shownHistory.map((item) => item.historyPrice),
        borderColor: 'rgba(225,116,103)',
        borderWidth: 1,
        color: '#000',
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255)',
        titleColor: 'rgba(225,116,103)',
        bodyColor: 'rgba(0,0,0)',
        caretSize: 0,
        displayColors: false,
        borderColor: 'rgba(225,116,103)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        grid: { drawBorder: false },
        position: 'right' as const,
        ticks: { color: `#a0a0a0` },
      },
    },
  };

  return (
    <Line data={data} options={options}>
      hello
    </Line>
  );
}

export { AuctionGraph };
