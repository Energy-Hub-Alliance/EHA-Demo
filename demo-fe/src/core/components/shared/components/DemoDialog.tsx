import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
} from '@mui/material';

interface DemoDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmButton: string;
  cancelButton: string;
  isLoading: boolean;
  testId?: string;
}

export const DemoDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmButton,
  cancelButton,
  isLoading,
  testId,
}: DemoDialogProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.secondary.contrastText,
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle
        mt={10}
        textAlign="center"
        data-testid={`${testId}DemoDialogTitle`}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          textAlign="center"
          data-testid={`${testId}DemoDialogContent`}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          py: 2.5,
          px: 5,
          rowGap: 4,
        }}
      >
        <LoadingButton
          data-testid={`${testId}DemoDialogConfirmButton`}
          loading={isLoading}
          variant="contained"
          fullWidth
          onClick={onConfirm}
          sx={{
            backgroundColor: (theme) => theme.palette.error.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.error.light,
            },
          }}
        >
          {confirmButton}
        </LoadingButton>
        <Button
          data-testid={`${testId}DemoDialogCancelButton`}
          variant="text"
          onClick={onClose}
          fullWidth
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          {cancelButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
