import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title = ({ text }) => {
  return <Typography variant="h2">{text}</Typography>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
