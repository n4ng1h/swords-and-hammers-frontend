import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styles from './styles';

const KingdomTitle = ({ currKingdomName }) => {
  return (
    <Typography variant="h4" sx={styles.text}>
      {currKingdomName}
    </Typography>
  );
};

KingdomTitle.propTypes = {
  currKingdomName: PropTypes.string.isRequired,
};

export default KingdomTitle;
