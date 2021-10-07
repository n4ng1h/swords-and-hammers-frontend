import { Grid } from '@mui/material';
import TitleBoard from 'components/TitleBoard';
import GameRound from 'components/GameRound';
import Timer from 'components/Timer';
import Content from 'content';

const HeaderRow = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <GameRound />
      </Grid>
      <Grid item>
        <TitleBoard>{Content.title}</TitleBoard>
      </Grid>
      <Grid item>
        <Timer />
      </Grid>
    </Grid>
  );
};

export default HeaderRow;
