/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import LumberImage from 'assets/images/resources/lumber.png';
import IronImage from 'assets/images/resources/iron.png';
import GoldImage from 'assets/images/resources/gold.png';
import Content from 'content';
import styles from './styles';

const ActionResources = ({ resourceCost }) => {
  const formatNumberDisplay = (num) => {
    if (num > 0) {
      return `+${num}`;
    }

    return num;
  };

  return (
    <Box sx={styles.container}>
      {resourceCost ? (
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={styles.gridContainer}
        >
          {resourceCost.lumber ? (
            <Grid item>
              <img
                alt={Content.images.altText.lumber}
                src={LumberImage}
                style={styles.imgLumber}
              />
              <p style={styles.text}>
                {formatNumberDisplay(resourceCost.lumber)}
              </p>
            </Grid>
          ) : null}
          {resourceCost.iron ? (
            <Grid item>
              <img
                alt={Content.images.altText.iron}
                src={IronImage}
                style={styles.imgIron}
              />
              <p style={styles.text}>
                {formatNumberDisplay(resourceCost.iron)}
              </p>
            </Grid>
          ) : null}
          {resourceCost.gold ? (
            <Grid item>
              <img
                alt={Content.images.altText.gold}
                src={GoldImage}
                style={styles.imgGold}
              />
              <p style={styles.text}>
                {formatNumberDisplay(resourceCost.gold)}
              </p>
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
  resourceCost: null,
};

ActionResources.propTypes = {
  resourceCost: PropTypes.shape({
    iron: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
};

export default ActionResources;
