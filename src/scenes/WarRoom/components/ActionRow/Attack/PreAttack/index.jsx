import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InfoDialog from 'components/InfoDialog';
import CustomButton from 'components/CustomButton';
import Content from 'content';
import { BUTTON_TYPE } from 'constant';
import StatsTable from './StatsTable';

const PreAttack = ({ open, closeDialog, oppStats, performAttack }) => {
  const [title, setTitle] = useState('');
  const attackWrapper = () => {
    closeDialog();
    performAttack();
  };

  useEffect(() => {
    if (oppStats !== null) {
      setTitle(`${oppStats.kingdomName}${Content.kingdomConjugate}`);
    }
  }, [oppStats]);

  return (
    <InfoDialog
      open={open}
      closeDialog={closeDialog}
      title={title}
      content={<StatsTable oppStats={oppStats} />}
    >
      <CustomButton btnType={BUTTON_TYPE.ENTER} onClick={attackWrapper}>
        {Content.attackBtn}
      </CustomButton>
    </InfoDialog>
  );
};

PreAttack.defaultProps = {
  oppStats: null,
};

PreAttack.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  oppStats: PropTypes.shape({
    kingdomName: PropTypes.string.isRequired,
    village: PropTypes.number.isRequired,
    castle: PropTypes.number.isRequired,
    army: PropTypes.number.isRequired,
    winProb: PropTypes.number.isRequired,
  }),
  performAttack: PropTypes.func.isRequired,
};

export default PreAttack;
