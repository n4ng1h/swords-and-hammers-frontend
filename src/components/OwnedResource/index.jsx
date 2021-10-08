import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles';

const OwnedResource = ({ resourceImg, numResource, resourceAlt }) => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Box sx={styles.imgContainer}>
          <Box sx={styles.innerCircle} />
          <img src={resourceImg} alt={resourceAlt} style={styles.img} />
        </Box>
      </Grid>
      <Grid item>
        <Box sx={styles.resrcText}>
          <Typography sx={styles.text} variant="h4">
            {numResource}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

OwnedResource.propTypes = {
  resourceImg: PropTypes.string.isRequired,
  numResource: PropTypes.number.isRequired,
  resourceAlt: PropTypes.string.isRequired,
};

export default OwnedResource;
