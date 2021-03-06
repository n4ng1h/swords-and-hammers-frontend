import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import InfoDialog from 'components/InfoDialog';
import RawMaterial from 'components/RawMaterials';
import Content from 'content';
import styles from './styles';

const ResourceGainDialog = ({ open, closeDialog, endTurnGain }) => {
  return (
    <InfoDialog
      open={open}
      closeDialog={closeDialog}
      title={Content.turnEnd.title}
      content={
        <>
          <Typography sx={styles.infoDialogDescText}>
            {Content.turnEnd.desc}
          </Typography>
          <RawMaterial resources={endTurnGain} />
        </>
      }
    />
  );
};

ResourceGainDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  endTurnGain: PropTypes.shape({
    lumber: PropTypes.number.isRequired,
    iron: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }).isRequired,
};

export default ResourceGainDialog;
