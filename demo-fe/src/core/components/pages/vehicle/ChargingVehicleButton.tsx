import { ChargingButton } from '../../shared/components/ChargingButton';
import PlayIcon from '../../shared/assets/vehicle/chargingButton/start.svg?react';
import StopIcon from '../../shared/assets/vehicle/chargingButton/stop.svg?react';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChargingButtonState } from './chargingButtonStateEnum';
import { ThreeDotsLoader } from '../../shared/loader/ThreeDotsLoader';

type ChargingButtonStyle = {
  icon?: React.ReactElement;
  backgroundColor: string;
  color: string;
  title: string | React.ReactElement;
  boxShadow?: string;
};

interface ChargingVehicleButtonProps {
  onClick: () => void;
  state: ChargingButtonState;
  disabled?: boolean;
}

export const ChargingVehicleButton = ({
  onClick,
  state,
  disabled,
}: ChargingVehicleButtonProps) => {
  const { palette } = useTheme();
  const { t } = useTranslation();

  const stateStyleMap: Record<ChargingButtonState, ChargingButtonStyle> = {
    START: {
      icon: <PlayIcon color={palette.common.white} />,
      color: palette.common.white,
      backgroundColor: palette.primary.main,
      title: t('chargingButton.START'),
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
    },
    PENDING: {
      color: palette.common.white,
      backgroundColor: palette.primary.main,
      title: <ThreeDotsLoader color={palette.common.white} />,
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
    },
    STOP: {
      icon: <StopIcon color={palette.primary.main} />,
      color: palette.primary.main,
      backgroundColor: palette.common.white,
      title: t('chargingButton.STOP'),
    },
  };

  return (
    <ChargingButton
      onClick={onClick}
      title={stateStyleMap[state].title}
      backgroundColor={stateStyleMap[state].backgroundColor}
      color={stateStyleMap[state].color}
      icon={stateStyleMap[state].icon}
      boxShadow={stateStyleMap[state].boxShadow}
      disabled={disabled}
    />
  );
};
