import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChargingHardwareExternalModel } from '../../../../store/link/chargingHardwareExternalModel';
import { SelectableChargingHardwareCard } from './SelectableChargingHardwareCard';

interface LinkedChargersProps {
  chargers: ChargingHardwareExternalModel[];
}

export const LinkedChargingHardware = ({ chargers }: LinkedChargersProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`linkedHvacsTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('linkedHvacs')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4,
          width: '100%',
          p: 4,
          pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
        }}
      >
        {chargers.map((charger) => {
          return (
            <SelectableChargingHardwareCard
              key={charger.externalId}
              chargerId={charger.externalId}
              chargerName={charger.chargerName || charger.model || ''}
              manufacturer={charger.manufacturer}
              selected={true}
              disabled={true}
              onClick={() => {}}
            />
          );
        })}
      </Box>
      <FooterWrapper>
        <Button variant="contained" fullWidth onClick={() => navigate('/')}>
          {t('backToHomepage')}
        </Button>
      </FooterWrapper>
    </>
  );
};
