import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Container, Typography } from '@mui/material';
import styles from './styles';

const TitleBoard = ({ children }) => {
  const { isMobileView } = useContext(ViewContext);

  return (
    <Container
      sx={isMobileView ? styles.textContainerMobile : styles.textContainerWeb}
    >
      <Typography variant="h5">{children}</Typography>
    </Container>
  );
};

TitleBoard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleBoard;
