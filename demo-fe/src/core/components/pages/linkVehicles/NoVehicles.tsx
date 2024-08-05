import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import VehicleHighlightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';

export const NoVehicles = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`noVehiclesTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('noVehicles')}
      </Typography>
      <img
        style={{
          maxHeight: '100%',
          opacity: 0.4,
          margin: 'auto',
          display: 'block',
        }}
        src={VehicleHighlightedImage}
      />
      <FooterWrapper>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            px: 10,
          }}
        >
          <Button variant="contained" fullWidth onClick={() => navigate('/')}>
            {t('backToHomepage')}
          </Button>
        </Box>
      </FooterWrapper>
    </>
  );
};
