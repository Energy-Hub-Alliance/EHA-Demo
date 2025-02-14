import { IconButton, Snackbar, useTheme } from '@mui/material';
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type EhaSnackbarProps = CustomContentProps;

type SnackbarVariant = 'success' | 'error';

export const DemoSnackbar = forwardRef<HTMLDivElement, EhaSnackbarProps>(
  (props, ref) => {
    const { id, style, message } = props;
    const { closeSnackbar } = useSnackbar();
    const { palette, ui_vars } = useTheme();

    return (
      <SnackbarContent key={id} ref={ref} style={style}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={true}
          action={
            <IconButton
              style={{ alignSelf: 'center' }}
              size="small"
              onClick={() => closeSnackbar(id)}
              color="inherit"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          message={message}
          sx={{
            '& > div': {
              backgroundColor: palette[props.variant as SnackbarVariant]?.main,
              color: palette[props.variant as SnackbarVariant]?.contrastText,
              fontSize: ui_vars.font_size.m,
              fontWeight: 500,
            },
          }}
        />
      </SnackbarContent>
    );
  }
);
