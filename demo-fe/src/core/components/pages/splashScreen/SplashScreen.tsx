import { Box, Typography } from '@mui/material';
import splashScreen from '../../shared/assets/splashscreen.png';
import Logo from '../../shared/assets/logosplash.svg';
import { useTranslation } from 'react-i18next';

export const SplashScreen = () => {
  const [t] = useTranslation();
  const backgroundImageStyle = {
    backgroundImage: `url(${splashScreen})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <Box style={backgroundImageStyle}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: '4rem',
          flexDirection: 'column',
          px: '1rem',
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            maxHeight: `9rem`,
            maxWidth: `18rem`,
          }}
        />
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize="24px"
          lineHeight="30px"
          fontFamily="Exo, Roboto, Arial, sans-serif"
          sx={{ color: '#FFFFFF', mt: '6rem', maxWidth: '335px' }}
        >
          {t('splashScreenTitle')}
        </Typography>
      </Box>
    </Box>
  );
};
