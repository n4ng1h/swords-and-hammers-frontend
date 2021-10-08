import PropTypes from 'prop-types';
import { Backdrop, Grid, Skeleton, Typography } from '@mui/material';
import styles from './styles';

const Loading = ({ open, msg }) => {
  return (
    <Backdrop open={open} sx={styles.backdrop}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        <Grid item>
          <Skeleton variant="circular" sx={styles.blinkDot} />
          <Skeleton variant="circular" sx={styles.blinkDot} />
          <Skeleton variant="circular" sx={styles.blinkDot} />
        </Grid>
        <Grid item sx={styles.gridItem}>
          <Typography sx={styles.text}>{msg}</Typography>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

Loading.defaultProps = {
  msg: null,
};

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
  msg: PropTypes.string,
};

export default Loading;
