import PropTypes from 'prop-types';
import Action from 'components/Action';
import VillageImage from 'assets/images/buttons/village.png';
import Content from 'content';

// TODO: Add an onClick function to tell the backend to build a village
const BuildVillage = ({ numOwned }) => {
  return (
    <Action
      btnImg={VillageImage}
      btnCaption={Content.action.buildVillage}
      resourceCost={{ lumber: -3, iron: -2, gold: 5 }}
      numOwned={numOwned}
    />
  );
};

BuildVillage.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default BuildVillage;
