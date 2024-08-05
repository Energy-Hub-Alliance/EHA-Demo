import { useTheme, Box } from '@mui/material';
interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: `calc(100% - ${theme.ui_vars.other.header_height})` }}>
      {children}
    </Box>
  );
};
