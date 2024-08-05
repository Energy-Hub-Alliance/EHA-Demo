import { useTheme } from '@mui/material';
import { ConsumptionPeriod, TIMEZONE } from './smartTariffUtils';
import Chart, { Props } from 'react-apexcharts';
import { useGetConsumptionDataQuery } from '../../../../store/tariff/tariffApi';
import { useMemo } from 'react';

interface ConsumtiionChartProps {
  smartTariffId: string;
  consumptionPeriodOption: ConsumptionPeriod;
}

export const ConsumptionChart = ({
  smartTariffId,
  consumptionPeriodOption,
}: ConsumtiionChartProps) => {
  const { palette } = useTheme();

  const { data: consumptionData } = useGetConsumptionDataQuery({
    tariffId: smartTariffId,
    period: consumptionPeriodOption,
    timezone: TIMEZONE,
  });

  const recievedConsumption = useMemo(() => {
    return consumptionData?.map((cons) => cons.consumption) ?? [];
  }, [consumptionData]);

  // Creating custom xaxis labels (week, day, month) based on Period selection
  const xaxisCategories = useMemo(() => {
    if (consumptionData?.length === 7) {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else {
      return Array.from(
        { length: consumptionData?.length ?? 1 },
        (_, index) => index + 1
      );
    }
  }, [consumptionData]);

  const chartData: Props = {
    type: 'bar',
    height: 330,
    options: {
      chart: {
        toolbar: { show: false },
        // hack: yaxis title is visible but moved up per design (used offset so it was needed to place whole chart also)
        offsetX: -30,
        animations: {
          enabled: false,
        },
      },
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
            return val.toFixed(1);
          },
        },
        min: 0,
        title: {
          text: 'kWh',
          rotate: 360,
          offsetX: 25,
          offsetY: -146,
          style: { color: '#fff', fontWeight: 400 },
        },
      },
      xaxis: {
        categories: xaxisCategories,
        tickAmount: 12,
        labels: {
          show: true,
          style: { colors: '#fff' },
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
            return val.toFixed(3) + ' kWh';
          },
        },
      },
    },
    series: [
      {
        name: 'Consumption',
        data: recievedConsumption,
      },
    ],
  };

  return consumptionData && consumptionData?.length > 0 ? (
    <Chart {...chartData} />
  ) : null;
};
