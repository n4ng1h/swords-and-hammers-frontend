import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import OwnedResource from 'components/OwnedResource';
import LumberImage from 'assets/images/resources/lumber.png';
import SteelImage from 'assets/images/resources/steel.png';
import GoldImage from 'assets/images/resources/gold.png';
import Content from 'content';

const ResourceRow = ({ resourceOwned }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="baseline"
      spacing={4}
    >
      <Grid item>
        <OwnedResource
          resourceImg={LumberImage}
          numResource={resourceOwned.lumber}
          resourceAlt={Content.images.altText.lumber}
        />
      </Grid>
      <Grid item>
        <OwnedResource
          resourceImg={SteelImage}
          numResource={resourceOwned.steel}
          resourceAlt={Content.images.altText.steel}
        />
      </Grid>
      <Grid item>
        <OwnedResource
          resourceImg={GoldImage}
          numResource={resourceOwned.gold}
          resourceAlt={Content.images.altText.gold}
        />
      </Grid>
    </Grid>
  );
};

ResourceRow.defaultProps = {
  resourceOwned: {
    lumber: -1,
    steel: -1,
    gold: -1,
  },
};

ResourceRow.propTypes = {
  resourceOwned: PropTypes.shape({
    lumber: PropTypes.number.isRequired,
    steel: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
};

export default ResourceRow;
