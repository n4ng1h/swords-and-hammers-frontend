import { Grid } from '@mui/material';
import BuildVillage from 'scenes/WarRoom/components/ActionRow/BuildVillage';
import BuildCastle from 'scenes/WarRoom/components/ActionRow/BuildCastle';
import TrainArmy from 'scenes/WarRoom/components/ActionRow/TrainArmy';
import AttackKingdom from 'scenes/WarRoom/components/ActionRow/Attack';

const ActionRow = () => {
  const BUTTON_SPACING_COL = 6;
  const BUTTON_SPACING_ROW = 2;

  return (
    <Grid container direction="column" spacing={BUTTON_SPACING_COL}>
      <Grid container item direction="row" spacing={BUTTON_SPACING_ROW}>
        <Grid item>
          <BuildVillage />
        </Grid>
        <Grid item>
          <BuildCastle />
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing={BUTTON_SPACING_ROW}>
        <Grid item>
          <TrainArmy />
        </Grid>
        <Grid item>
          <AttackKingdom />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActionRow;
