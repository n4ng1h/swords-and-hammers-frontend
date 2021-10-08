import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './styles';

const CustomResourceDisplay = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'disableNumOwned',
})(({ disableNumOwned }) => ({
  ...styles.ownedContainer,
  backgroundColor: disableNumOwned ? `rgba(0,0,0,0)` : 'white',
}));

const CurrentOwned = ({ disableNumOwned, numOwned }) => {
  return (
    <CustomResourceDisplay disableNumOwned={disableNumOwned} elevation={0}>
      {disableNumOwned ? null : (
        <Typography sx={styles.text}>{`You have: ${numOwned}`}</Typography>
      )}
    </CustomResourceDisplay>
  );
};

CurrentOwned.defaultProps = {
  numOwned: null,
};

CurrentOwned.propTypes = {
  disableNumOwned: PropTypes.bool.isRequired,
  numOwned: PropTypes.number,
};

export default CurrentOwned;
