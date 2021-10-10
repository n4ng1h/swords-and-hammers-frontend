import PropTypes from 'prop-types';
import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import Action from 'components/Action';
import CastleImage from 'assets/images/buttons/castle.png';
import Content from 'content';
import { ACTION_TYPE } from 'constant';
import { takeTurn, refreshResourceState, fetchEventLogs } from 'services/api';

const BuildCastle = ({ numOwned }) => {
  const { gameId } = useContext(SocketContext);
  const { setResourceInfo, setEventLog } = useContext(ResourceContext);

  const buildACastle = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_CASTLE);
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
