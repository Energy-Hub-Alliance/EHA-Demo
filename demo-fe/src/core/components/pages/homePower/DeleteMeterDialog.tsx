import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { useNavigate } from 'react-router-dom';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { useDeleteMeterMutation } from '../../../../store/home-power/meters/meterApi';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteMeterDialogProps {
  open: boolean;
  onClose: () => void;
  meterId: string;
}

export const DeleteMeterDialog = ({
  open,
  onClose,
  meterId,
}: DeleteMeterDialogProps) => {
  const { t } = useTranslation();
  const [deleteMeter, { isLoading }] = useDeleteMeterMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!meterId) {
      return;
    }
    return deleteMeter({ meterId: meterId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteDeviceSuccessMessage'));
        onClose();
        navigate('/home-power');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [meterId, deleteMeter, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.meter')}
      content={t('deleteContent.meter')}
      isLoading={isLoading}
      testId={`${meterId}Meter`}
    />
  );
};
