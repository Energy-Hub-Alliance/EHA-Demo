import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SuccessPage } from './SuccessPage';

export const SuccessVehicles = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  return (
    <SuccessPage
      title={t('successTitle')}
      subtitle={t('successVehicleSubtitle')}
      onContinue={() => navigate('/vehicles')}
    />
  );
};
