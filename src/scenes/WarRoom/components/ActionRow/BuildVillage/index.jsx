import PropTypes from 'prop-types';
import { useContext } from 'react';
import RoundContext from 'contexts/Round';
import Action from 'components/Action';
import VillageImage from 'assets/images/buttons/village.png';
import Content from 'content';
import { takeTurn } from 'services/api';
import { ACTION_TYPE } from 'constant';
import { useSWRConfig } from 'swr';

const BuildVillage = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(RoundContext);
  const { mutate } = useSWRConfig();

  const buildAVillage = async () => {
    const buildOutcome = await takeTurn(gameId, ACTION_TYPE.BUILD_VILLAGE);
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
