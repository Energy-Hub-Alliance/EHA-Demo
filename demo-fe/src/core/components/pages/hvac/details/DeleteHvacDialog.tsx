import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDeleteHvacMutation } from '../../../../../store/hvac/hvacApi';
import { showSnackbar } from '../../../shared/snackbar/snackbarUtils';
import { DemoDialog } from '../../../shared/components/DemoDialog';
import { getApiErrorMessage } from '../../../../../store/util/getApiErrorMessage';

interface DeleteHvacDialogProps {
  open: boolean;
  onClose: () => void;
  hvacId: string;
}

export const DeleteHvacDialog = ({
  open,
  onClose,
  hvacId,
}: DeleteHvacDialogProps) => {
  const { t } = useTranslation();
  const [deleteHvac, { isLoading }] = useDeleteHvacMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!hvacId) {
      return;
    }
    return deleteHvac({ hvacId: hvacId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteDeviceSuccessMessage'));
        onClose();
        navigate('/hvacs');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [hvacId, deleteHvac, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.hvac')}
      content={t('deleteContent.hvac')}
      isLoading={isLoading}
      testId={`${hvacId}Hvac`}
    />
  );
};
