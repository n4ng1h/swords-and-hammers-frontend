import PropTypes from 'prop-types';
import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import Action from 'components/Action';
import ArmyImage from 'assets/images/buttons/army.png';
import Content from 'content';
import { ACTION_TYPE } from 'constant';
import { takeTurn, refreshResourceState, fetchEventLogs } from 'services/api';

const TrainArmy = ({ numOwned }) => {
  const { gameId } = useContext(SocketContext);
  const { setResourceInfo, setEventLog } = useContext(ResourceContext);

  const buildAnArmy = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_ARMY);
    if (buildOutcome) {
      // Update the resource state
      const currResourceState = await refreshResourceState(gameId);
      setResourceInfo(currResourceState);
      // Refresh the event log
      setEventLog(await fetchEventLogs(gameId));
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
