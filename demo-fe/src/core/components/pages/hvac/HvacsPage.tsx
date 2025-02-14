import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Header } from '../../shared/header/Header';
import { Loader } from '../../shared/loader/Loader';
import { useGetHvacsQuery } from '../../../../store/hvac/hvacApi';
import { SingleHvacCard } from './SingleHvacCard';
import { useMemo } from 'react';

export const HvacsPage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { data: hvacs, isLoading } = useGetHvacsQuery();

  const receivedHvacs = useMemo(() => {
    return hvacs?.hvacs.map((hvac) => {
      return {
        id: hvac.hvacId,
        model: hvac.hvacName || hvac.model || '',
        manufacturer: hvac.vendor,
        type: hvac.hvacType,
      };
    });
  }, [hvacs?.hvacs]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Typography
        data-testid={`hvacsTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('hvacsTitle')}
      </Typography>

      {receivedHvacs && receivedHvacs.length > 0 ? (
        <Box
          sx={{
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 5,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {receivedHvacs.map((hvac) => (
            <SingleHvacCard
              key={hvac.id}
              hvacId={hvac.id}
              hvacModel={hvac.model}
              manufacturer={hvac.manufacturer}
              type={hvac.type}
            />
          ))}
        </Box>
      ) : (
        <Typography
          data-testid={`hvacSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('noConnectedHvacs')}
        </Typography>
      )}

      <FooterWrapper>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('connect')}
        >
          {t('connectHvac')}
        </Button>
      </FooterWrapper>
    </>
  );
};
