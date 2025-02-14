import { Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';

interface NoItemsPageProps {
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  testId?: string;
}

export const NoItemsPage = ({ title, Icon, testId }: NoItemsPageProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`${testId}Title`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      {typeof Icon === 'string' ? (
        <img
          style={{
            maxHeight: '100%',
            opacity: 0.4,
            margin: 'auto',
            display: 'block',
          }}
          src={Icon}
        />
      ) : (
        <Icon />
      )}
      <FooterWrapper>
        <Button variant="contained" fullWidth onClick={() => navigate('/')}>
          {t('backToHomepage')}
        </Button>
      </FooterWrapper>
    </>
  );
};
