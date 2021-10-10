import PropTypes from 'prop-types';
import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import Action from 'components/Action';
import VillageImage from 'assets/images/buttons/village.png';
import Content from 'content';
import { takeTurn, refreshResourceState, fetchEventLogs } from 'services/api';
import { ACTION_TYPE } from 'constant';

const BuildVillage = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(SocketContext);
  const { setResourceInfo, setEventLog } = useContext(ResourceContext);

  const buildAVillage = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_VILLAGE);
    if (buildOutcome) {
      // Update the resource state
      const currResourceState = await refreshResourceState(gameId);
      setResourceInfo(currResourceState);
      // Refresh the event log
      setEventLog(await fetchEventLogs(gameId));
      // END THE TURN
      setEndTurn();
    }
  };

  return (
    <Action
      btnImg={VillageImage}
      btnCaption={Content.action.buildVillage}
      resourceCost={{ lumber: -3, iron: -2, gold: 5 }}
      numOwned={numOwned}
      onClick={buildAVillage}
    />
  );
};

BuildVillage.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default BuildVillage;
