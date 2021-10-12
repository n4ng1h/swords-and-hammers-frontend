import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import TitleBoard from 'components/TitleBoard';
import GameRound from 'components/GameRound';
import Timer from 'components/Timer';
import Content from 'content';
import styles from './styles';

const HeaderRow = ({ currRound, totalRounds }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      sx={styles.root}
    >
      <Grid item>
        <GameRound currRound={currRound} totalRounds={totalRounds} />
      </Grid>
      <Grid item sx={styles.middleItem}>
        <TitleBoard>{Content.title}</TitleBoard>
      </Grid>
      <Grid item>
        <Timer />
      </Grid>
    </Grid>
  );
};

HeaderRow.propTypes = {
  currRound: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
};

export default HeaderRow;
