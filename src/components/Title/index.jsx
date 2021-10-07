import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Title = ({ children }) => {
  return <Typography variant="h2">{children}</Typography>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
