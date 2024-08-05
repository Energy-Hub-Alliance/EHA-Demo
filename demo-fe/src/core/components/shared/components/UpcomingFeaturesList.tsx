import { Stack, Card, Grid, Typography } from '@mui/material';
import { HeighlightedSubtitle } from './HeighlightedSubtitle';
import { useTranslation } from 'react-i18next';
import {
  upcomingFeaturesToIcons,
  UpcomingFeatures,
} from '../mappers/upcomingFeaturesToIcons';

export const UpcomingFeaturesList = () => {
  const upcomingFeatures = Object.values(UpcomingFeatures);
  const isOdd = upcomingFeatures.length / 2 !== 0;
  const [t] = useTranslation();
  return (
    <Stack flexDirection="column" alignItems="center" width="100%">
      <HeighlightedSubtitle subtitleText={t('comingSoon')} />
      <Grid container spacing={4} rowSpacing={6}>
        {upcomingFeatures.map((upcomingFeature, i) => {
          const isLast = i === upcomingFeatures.length - 1;
          const Icon = upcomingFeaturesToIcons[upcomingFeature];

          return (
            <Grid
              key={upcomingFeature}
              item
              xs={isOdd && isLast ? 12 : 6}
              gridRow={'auto'}
            >
              <Card
                data-testid={`${upcomingFeature}Card`}
                sx={{
                  py: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Typography
                  data-testid={`${upcomingFeature}Title`}
                  sx={{ height: '4.8rem', textAlign: 'center' }}
                  variant="body2"
                  fontWeight={700}
                  lineHeight="22px"
                >
                  {t(`upcomingFeatures.${upcomingFeature}`)}
                </Typography>
                <Icon key={upcomingFeature} />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
