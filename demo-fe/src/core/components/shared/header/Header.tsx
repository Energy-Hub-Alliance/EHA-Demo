import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import Logo from '../assets/logo.svg';
import { BurgerMenu } from './BurgerMenu';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        height: theme.ui_vars.other.header_height,
        backgroundColor: theme.palette.background?.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: theme.ui_vars.other.page_spacing,
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{
          maxHeight: `calc(${theme.ui_vars.other.header_height} / 2)`,
          maxWidth: `calc(100dvw - 10rem)`,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      />
      <BurgerMenu />
    </Box>
  );
};
