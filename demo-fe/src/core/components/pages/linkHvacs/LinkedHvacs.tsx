import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HvacExternalModel } from '../../../../store/link/hvacExternalModel';
import { SelectableHvacsCard } from './SelectableHvacsCard';

interface LinkedHvacsProps {
  hvacs: HvacExternalModel[];
}

export const LinkedHvacs = ({ hvacs }: LinkedHvacsProps) => {
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
        {hvacs.map((hvac) => {
          return (
            <SelectableHvacsCard
              key={hvac.externalId}
              hvacId={hvac.externalId}
              hvacName={hvac.hvacName || hvac.model || ''}
              hvacType={hvac.hvacType}
              manufacturer={hvac.manufacturer}
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
