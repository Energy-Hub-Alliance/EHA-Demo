import { alpha, Box, Card, Typography, useTheme } from '@mui/material';
import React from 'react';
import { EMPTY_VALUE_PLACEHOLDER } from './DoubleDetailCard';
import { isValueValid } from '../../../../store/util/isValueValid';

interface DetailCardProp {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number | boolean | undefined;
  unit?: string;
}

export const DetailCard = ({
  icon,
  label,
  value,
  unit,
  ...rest
}: DetailCardProp) => {
  const { palette, ui_vars } = useTheme();
  const DetailIcon = icon;
  const ValueExist = isValueValid(value);

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 4,
      }}
      {...rest}
    >
      <Box
        sx={{
          height: 48,
          width: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          backgroundColor: alpha(palette.primary.main, 0.2),
          flexShrink: 0,
        }}
      >
        {DetailIcon && <DetailIcon />}
      </Box>

      <Box
        sx={{
          // 48px - icon
          // 1.6rem - paddingRight
          width: 'calc(100% - 48px - 1.6rem)',
        }}
      >
        <Typography
          textTransform={'uppercase'}
          fontSize={ui_vars.font_size.xs}
          fontWeight={400}
          lineHeight={'1.8rem'}
        >
          {label}
        </Typography>
        {unit ? (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              fontSize={ui_vars.font_size.l}
              fontWeight={700}
              lineHeight={'3.2rem'}
              sx={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '1',
              }}
            >
              {ValueExist ? value : EMPTY_VALUE_PLACEHOLDER}
            </Typography>
            <Typography
              component={'span'}
              fontSize={ui_vars.font_size.xs}
              fontWeight={400}
              lineHeight={'1.8rem'}
              marginTop={'0.6rem'}
              pl={1}
            >
              {ValueExist ? unit : null}
            </Typography>
          </Box>
        ) : (
          <Typography
            fontSize={ui_vars.font_size.m}
            fontWeight={700}
            lineHeight={'3.2rem'}
            sx={{
              wordBreak: 'break-word',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3',
            }}
          >
            {ValueExist ? value : EMPTY_VALUE_PLACEHOLDER}
          </Typography>
        )}
      </Box>
    </Card>
  );
};
