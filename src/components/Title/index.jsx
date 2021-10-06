import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title = ({ children }) => {
  return <Typography variant="h2">{children}</Typography>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
