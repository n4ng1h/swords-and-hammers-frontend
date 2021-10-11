import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Grid } from '@mui/material';
import BuildVillage from 'scenes/WarRoom/components/ActionRow/BuildVillage';
import BuildCastle from 'scenes/WarRoom/components/ActionRow/BuildCastle';
import TrainArmy from 'scenes/WarRoom/components/ActionRow/TrainArmy';
import AttackKingdom from 'scenes/WarRoom/components/ActionRow/Attack';
import styles from './styles';

const ActionRow = ({ resources }) => {
  const { isMobileView } = useContext(ViewContext);

  return isMobileView ? (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={styles.mobileContainer}
    >
      <Grid container item direction="row">
        <Grid item>
          <BuildVillage numOwned={resources.village} />
        </Grid>
        <Grid item>
          <BuildCastle numOwned={resources.castle} />
        </Grid>
      </Grid>
      <Grid container item direction="row" sx={styles.col}>
        <Grid item>
          <TrainArmy numOwned={resources.army} />
        </Grid>
        <Grid item>
          <AttackKingdom numOwned={resources.army} />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={styles.webContainer}
    >
      <Grid item sx={isMobileView ? null : styles.webRow}>
        <BuildVillage numOwned={resources.village} />
      </Grid>
      <Grid item sx={isMobileView ? null : styles.webRow}>
        <BuildCastle numOwned={resources.castle} />
      </Grid>

      <Grid item sx={isMobileView ? null : styles.webRow}>
        <TrainArmy numOwned={resources.army} />
      </Grid>
      <Grid item sx={isMobileView ? null : styles.webRow}>
        <AttackKingdom numOwned={resources.army} />
      </Grid>
    </Grid>
  );
};

ActionRow.propTypes = {
  resources: PropTypes.shape({
    village: PropTypes.number.isRequired,
    castle: PropTypes.number.isRequired,
    army: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActionRow;
