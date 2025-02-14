import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { useNavigate } from 'react-router-dom';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { useDeleteBatteryMutation } from '../../../../store/home-power/battery/batteryApi';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteBatteryDialogProps {
  open: boolean;
  onClose: () => void;
  batteryId: string;
}

export const DeleteBatteryDialog = ({
  open,
  onClose,
  batteryId,
}: DeleteBatteryDialogProps) => {
  const { t } = useTranslation();
  const [deleteBattery, { isLoading }] = useDeleteBatteryMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!batteryId) {
      return;
    }
    return deleteBattery({ batteryId: batteryId })
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
  }, [batteryId, deleteBattery, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.battery')}
      content={t('deleteContent.battery')}
      isLoading={isLoading}
      testId={`${batteryId}Battery`}
    />
  );
};
