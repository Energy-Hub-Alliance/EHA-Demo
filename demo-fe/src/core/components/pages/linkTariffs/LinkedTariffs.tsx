import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SelectableTariffsCard } from './SelectableTariffsCard';
import { TariffExternalModel } from '../../../../store/link/tariffExternalModel';

interface LinkedTariffsProps {
  tariffs: TariffExternalModel[];
}

export const LinkedTariffs = ({ tariffs }: LinkedTariffsProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`linkedTariffsTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('linkedTariffs')}
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
        {tariffs.map((tariff) => {
          return (
            <SelectableTariffsCard
              key={tariff.externalId}
              tariffId={tariff.externalId}
              tariffName={tariff.tariffName}
              manufacturer={tariff.manufacturer}
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
