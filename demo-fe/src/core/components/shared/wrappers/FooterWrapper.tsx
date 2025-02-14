import { Box, useTheme } from '@mui/material';
interface FooterWrapperProps {
  children: React.ReactNode;
}

export const FooterWrapper = ({ children }: FooterWrapperProps) => {
  const { palette, ui_vars } = useTheme();
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        height: ui_vars.other.footer_height,
        pt: 2.5,
        px: 5,
        pb: 8,
        backgroundColor: palette.background?.default,
      }}
    >
      {children}
    </Box>
  );
};
