import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styles from './styles';

const Title = ({ children }) => {
  return (
    <Typography variant="h2" sx={styles.text}>
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
