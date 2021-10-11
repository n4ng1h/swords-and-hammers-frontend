import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles';

const OwnedResource = ({ resourceImg, numResource, resourceAlt }) => {
  const { isMobileView } = useContext(ViewContext);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Box
          sx={isMobileView ? styles.imgContainerMobile : styles.imgContainer}
        >
          <Box sx={styles.innerCircle} />
          <img src={resourceImg} alt={resourceAlt} style={styles.img} />
        </Box>
      </Grid>
      <Grid item>
        <Box sx={isMobileView ? styles.resrcTextMobile : styles.resrcText}>
          <Typography sx={styles.text} variant={isMobileView ? 'h5' : 'h4'}>
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
