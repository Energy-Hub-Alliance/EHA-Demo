import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDeleteTariffMutation } from '../../../../store/tariff/tariffApi';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteSmartTariffDialogProps {
  open: boolean;
  onClose: () => void;
  tariffId: string;
}

export const DeleteSmartTariffDialog = ({
  open,
  onClose,
  tariffId,
}: DeleteSmartTariffDialogProps) => {
  const { t } = useTranslation();
  const [deleteTariff, { isLoading }] = useDeleteTariffMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!tariffId) {
      return;
    }
    return deleteTariff({ tariffId: tariffId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteTariffSuccessMessage'));
        onClose();
        navigate('/smart-tariffs');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [tariffId, deleteTariff, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.tariff')}
      content={t('deleteContent.tariff')}
      isLoading={isLoading}
      testId={`${tariffId}Tariff`}
    />
  );
};
