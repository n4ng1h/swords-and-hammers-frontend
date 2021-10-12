import PropTypes from 'prop-types';
import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import Action from 'components/Action';
import ArmyImage from 'assets/images/buttons/army.png';
import Content from 'content';
import { ACTION_TYPE } from 'constant';
import { takeTurn } from 'services/api';
import { useSWRConfig } from 'swr';

const TrainArmy = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(SocketContext);
  const { mutate } = useSWRConfig();

  const buildAnArmy = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_ARMY);
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
      btnImg={ArmyImage}
      btnCaption={Content.action.trainArmy}
      resourceCost={{ lumber: -3, iron: -3, gold: 0 }}
      numOwned={numOwned}
      onClick={buildAnArmy}
    />
  );
};

TrainArmy.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default TrainArmy;
