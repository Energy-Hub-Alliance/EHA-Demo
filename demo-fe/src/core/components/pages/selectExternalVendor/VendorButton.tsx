import { Typography, Button, useTheme } from '@mui/material';
interface VendorButtonProps {
  vendorName: string;
  startingIcon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
  displayName?: boolean;
}

export const VendorButton = ({
  vendorName,
  startingIcon,
  onClick,
  disabled,
  displayName,
}: VendorButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      disabled={disabled}
      fullWidth
      onClick={onClick}
      variant="outlined"
      size="large"
      startIcon={startingIcon}
      sx={{
        borderRadius: 3,
        color: theme.palette.text?.primary,
        '& .MuiButton-startIcon': {
          m: '0px',
        },
      }}
    >
      {displayName && vendorName ? (
        <Typography sx={{ pl: 2 }}>{vendorName}</Typography>
      ) : null}
    </Button>
  );
};
