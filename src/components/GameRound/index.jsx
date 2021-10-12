import PropTypes from 'prop-types';
import GameRoundDisplay from 'components/GameRound/Display';

const GameRound = ({ currRound, totalRounds }) => {
  return <GameRoundDisplay currRound={currRound} maxRounds={totalRounds} />;
};

GameRound.propTypes = {
  currRound: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
};

export default GameRound;
