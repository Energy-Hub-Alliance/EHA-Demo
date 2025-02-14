import { useTranslation } from 'react-i18next';
import HomePowerIcon from '../../shared/assets/homePower/solarAndbattery.svg';
import { NoItemsPage } from '../../shared/components/NoItemsPage';

export const NoHomePower = () => {
  const [t] = useTranslation();

  return (
    <NoItemsPage
      Icon={HomePowerIcon}
      title={t('noHomePower')}
      testId="home-power"
    />
  );
};
