import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';
import styles from './styles';

const TitleBoard = ({ children }) => {
  return (
    <Container sx={styles.textContainer}>
      <Typography variant="h5">{children}</Typography>
    </Container>
  );
};

TitleBoard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleBoard;
