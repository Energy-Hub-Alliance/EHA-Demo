import { Button } from '@mui/material';

interface ChargingButtonProps {
  onClick: () => void;
  title: string | React.ReactElement;
  color: string;
  backgroundColor: string;
  boxShadow?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export const ChargingButton = ({
  onClick,
  title,
  color,
  backgroundColor,
  icon,
  boxShadow,
  disabled,
}: ChargingButtonProps) => {
  return (
    <Button
      startIcon={<span style={{ height: 24 }}>{icon}</span>}
      sx={{
        display: 'flex',
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        color: color,
        backgroundColor: backgroundColor,
        border: `1px solid ${backgroundColor}`,
        boxShadow: boxShadow ? boxShadow : 'none',
        '&:hover': {
          border: `1px solid ${backgroundColor}`,
        },
      }}
      variant="outlined"
      fullWidth
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};
