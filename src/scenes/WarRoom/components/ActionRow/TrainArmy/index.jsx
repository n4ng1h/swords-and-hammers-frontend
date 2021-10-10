import PropTypes from 'prop-types';
import Action from 'components/Action';
import ArmyImage from 'assets/images/buttons/army.png';
import Content from 'content';

// TODO: Add an onClick function to tell the backend to build a army
const TrainArmy = ({ numOwned }) => {
  return (
    <Action
      btnImg={ArmyImage}
      btnCaption={Content.action.trainArmy}
      resourceCost={{ lumber: -3, iron: -3, gold: 0 }}
      numOwned={numOwned}
    />
  );
};

TrainArmy.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default TrainArmy;
