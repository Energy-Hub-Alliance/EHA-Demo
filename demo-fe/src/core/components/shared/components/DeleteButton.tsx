import { Button } from '@mui/material';

interface DeleteButtonProps {
  onClick: () => void;
  title: string;
}

export const DeleteButton = ({ onClick, title }: DeleteButtonProps) => {
  return (
    <Button
      sx={{
        color: (theme) => theme.palette.common.white,
        borderColor: (theme) => theme.palette.common.white,
      }}
      variant="outlined"
      fullWidth
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
