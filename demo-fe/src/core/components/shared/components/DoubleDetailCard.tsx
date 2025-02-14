import { Box, Card, Typography, useTheme } from '@mui/material';
import { isValueValid } from '../../../../store/util/isValueValid';

export const EMPTY_VALUE_PLACEHOLDER = '-';

export interface DetailInfoProp {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number | boolean | undefined;
  unit?: string;
  additionalInfo?: string;
}

interface DoubleDetailCardProp {
  firstElement: DetailInfoProp;
  secondElement: DetailInfoProp;
}

const HelperDetailInfoBox = ({
  icon,
  label,
  value,
  unit,
  additionalInfo,
}: DetailInfoProp) => {
  const { ui_vars } = useTheme();
  const DetailIcon = icon;
  const ValueExist = isValueValid(value);

  return (
    <Box width={'45%'}>
      <Typography
        textTransform={'uppercase'}
        fontSize={ui_vars.font_size.xs}
        fontWeight={500}
        lineHeight={'1.8rem'}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <DetailIcon />

          <Typography
            fontSize={ui_vars.font_size.l}
            fontWeight={700}
            lineHeight={'3.2rem'}
            pl={2}
          >
            {ValueExist ? value : EMPTY_VALUE_PLACEHOLDER}
          </Typography>

          {unit ? (
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
          ) : null}
        </Box>
        {additionalInfo ? (
          <Typography
            fontSize={ui_vars.font_size.xs}
            fontWeight={400}
            lineHeight={'1.8rem'}
            pl={8}
          >
            {additionalInfo}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export const DoubleDetailCard = ({
  firstElement,
  secondElement,
}: DoubleDetailCardProp) => {
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 4,
      }}
    >
      <HelperDetailInfoBox
        icon={firstElement.icon}
        label={firstElement.label}
        value={firstElement.value}
        unit={firstElement.unit}
        additionalInfo={firstElement.additionalInfo}
      />
      <Box
        sx={{
          width: '10%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '1px',
            height: '3.6rem',
            background: palette.common.vertical_separator,
          }}
        />
      </Box>
      <HelperDetailInfoBox
        icon={secondElement.icon}
        label={secondElement.label}
        value={secondElement.value}
        unit={secondElement.unit}
        additionalInfo={secondElement.additionalInfo}
      />
    </Card>
  );
};
