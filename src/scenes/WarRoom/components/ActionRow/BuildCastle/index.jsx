import PropTypes from 'prop-types';
import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import Action from 'components/Action';
import CastleImage from 'assets/images/buttons/castle.png';
import Content from 'content';
import { ACTION_TYPE } from 'constant';
import { takeTurn } from 'services/api';
import { useSWRConfig } from 'swr';

const BuildCastle = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(SocketContext);
  const { mutate } = useSWRConfig();

  const buildACastle = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_CASTLE);
    if (buildOutcome) {
      // Update the resource state
      mutate(`/api/v1/scorecard/${gameId}`);
      // Refresh the event log
      mutate(`/api/v1/games/${gameId}/feed`);
      // END THE TURN
      setEndTurn();
    }
  };

  return (
    <Action
      btnImg={CastleImage}
      btnCaption={Content.action.buildCastle}
      resourceCost={{ lumber: -12, iron: -10, gold: 25 }}
      numOwned={numOwned}
      onClick={buildACastle}
    />
  );
};

BuildCastle.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default BuildCastle;
