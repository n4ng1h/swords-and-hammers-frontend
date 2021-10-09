import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InfoDialog from 'components/InfoDialog';
import Content from 'content';
import StatsTable from './StatsTable';

const PreAttack = ({ open, closeDialog, oppStats }) => {
  const [title, setTitle] = useState('');

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
    />
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
};

export default PreAttack;
