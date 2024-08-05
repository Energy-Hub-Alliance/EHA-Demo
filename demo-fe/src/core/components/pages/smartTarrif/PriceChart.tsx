import Chart, { Props } from 'react-apexcharts';
import { useTheme } from '@mui/material';

interface PriceChartProps {
  priceData: number[];
  priceCurrency: string;
}

export const PriceChart = ({ priceData, priceCurrency }: PriceChartProps) => {
  const { palette } = useTheme();

  const chartData: Props = {
    type: 'line',
    height: 330,

    options: {
      chart: {
        toolbar: { show: false },
      },
      stroke: { curve: 'smooth' },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        strokeDashArray: 0.1,
      },
      colors: [palette.secondary.dark],
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: { colors: '#fff' },
          formatter: function (val) {
            return val.toFixed(1) + ` ${priceCurrency.toLocaleLowerCase()}`;
          },
        },
        min: 0,
        max: Math.max(...priceData) + 1 ?? 100,
      },
      xaxis: {
        tickAmount: 12,
        min: 1,
        labels: {
          show: true,
          style: { colors: '#fff' },
          formatter: function (val) {
            return Number(val).toFixed(0);
          },
        },
      },

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: { show: false },
        y: {
          formatter: function (val) {
            return val.toFixed(4) + ` ${priceCurrency.toLocaleLowerCase()}`;
          },
        },
      },
    },
    series: [
      {
        name: 'Price',
        data: priceData,
      },
    ],
  };

  return <Chart {...chartData} />;
};
