import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SelectableHomePowerCard } from './SelectableHomePowerCard';
import { HomePowerExternalModelExtended } from '../../../../store/home-power/useVendorAccountHomePowerMerged';

interface LinkedHomePowerProps {
  homePower: HomePowerExternalModelExtended[];
}

export const LinkedHomePower = ({ homePower }: LinkedHomePowerProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`linkedHomePowerTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('linkedHomePower')}
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
        {homePower.map((homePowerDevice) => {
          return (
            <SelectableHomePowerCard
              key={homePowerDevice.externalId + homePowerDevice.type}
              type={homePowerDevice.type}
              homePowerId={homePowerDevice.externalId}
              homePowerName={
                homePowerDevice.homePowerName || homePowerDevice.model || ''
              }
              manufacturer={homePowerDevice.manufacturer}
              siteName={homePowerDevice.siteName}
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
