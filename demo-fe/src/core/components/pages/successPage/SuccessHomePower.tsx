import { SuccessPage } from './SuccessPage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const SuccessHomePower = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  return (
    <SuccessPage
      title={t('successTitle')}
      subtitle={t('successHomePowerSubtitle')}
      onContinue={() => navigate('/home-power')}
    />
  );
};
