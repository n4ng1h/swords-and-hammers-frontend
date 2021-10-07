import PropTypes from 'prop-types';
import { Container, Grid, Typography } from '@mui/material';
import styles from './styles';

const MiniBoard = ({ title, content }) => {
  return (
    <Container sx={styles.board}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={0}
        sx={styles.content}
      >
        <Grid item sx={styles.contentElement}>
          <Typography sx={styles.text} variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item sx={styles.contentElement}>
          <Typography sx={styles.text}>{content}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

MiniBoard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default MiniBoard;
