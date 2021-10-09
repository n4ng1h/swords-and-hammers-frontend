import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Content from 'content';
import LumberImage from 'assets/images/resources/lumber.png';
import SteelImage from 'assets/images/resources/steel.png';
import GoldImage from 'assets/images/resources/gold.png';
import styles from './styles';

const RawMaterial = ({ resources }) => {
  const formatNumberDisplay = (num) => {
    if (num > 0) {
      return `+${num}`;
    }

    return num;
  };

  if (!resources) {
    return null;
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      sx={styles.gridContainer}
    >
      {Number.isInteger(resources.lumber) ? (
        <Grid item>
          <img
            alt={Content.images.altText.lumber}
            src={LumberImage}
            style={styles.imgLumber}
          />
          <Typography style={styles.text} variant="h6">
            {formatNumberDisplay(resources.lumber)}
          </Typography>
        </Grid>
      ) : null}
      {Number.isInteger(resources.steel) ? (
        <Grid item>
          <img
            alt={Content.images.altText.steel}
            src={SteelImage}
            style={styles.imgSteel}
          />
          <Typography style={styles.text} variant="h6">
            {formatNumberDisplay(resources.steel)}
          </Typography>
        </Grid>
      ) : null}
      {Number.isInteger(resources.gold) ? (
        <Grid item>
          <img
            alt={Content.images.altText.gold}
            src={GoldImage}
            style={styles.imgGold}
          />
          <Typography style={styles.text} variant="h6">
            {formatNumberDisplay(resources.gold)}
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

RawMaterial.defaultProps = {
  resources: null,
};

RawMaterial.propTypes = {
  resources: PropTypes.shape({
    steel: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
};

export default RawMaterial;
