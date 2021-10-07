/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import LumberImage from 'assets/images/resources/lumber.png';
import SteelImage from 'assets/images/resources/steel.png';
import GoldImage from 'assets/images/resources/gold.png';
import Content from 'content';
import styles from './styles';

const ActionResources = ({ resources }) => {
  const formatNumberDisplay = (num) => {
    if (num > 0) {
      return `+${num}`;
    }

    return num;
  };

  return (
    <Box sx={styles.container}>
      {resources ? (
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={styles.gridContainer}
        >
          {resources.lumber ? (
            <Grid item>
              <img
                alt={Content.images.altText.lumber}
                src={LumberImage}
                style={styles.imgLumber}
              />
              <p style={styles.text}>{formatNumberDisplay(resources.lumber)}</p>
            </Grid>
          ) : null}
          {resources.steel ? (
            <Grid item>
              <img
                alt={Content.images.altText.steel}
                src={SteelImage}
                style={styles.imgSteel}
              />
              <p style={styles.text}>{formatNumberDisplay(resources.steel)}</p>
            </Grid>
          ) : null}
          {resources.gold ? (
            <Grid item>
              <img
                alt={Content.images.altText.gold}
                src={GoldImage}
                style={styles.imgGold}
              />
              <p style={styles.text}>{formatNumberDisplay(resources.gold)}</p>
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <Typography sx={styles.noCostText}>{Content.noCostText}</Typography>
      )}
    </Box>
  );
};

ActionResources.defaultProps = {
  resources: null,
};

ActionResources.propTypes = {
  resources: PropTypes.shape({
    steel: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
};

export default ActionResources;
