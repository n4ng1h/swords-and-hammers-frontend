import Action from 'components/Action';
import ArmyImage from 'assets/images/buttons/army.png';
import Content from 'content';

// TODO: Add an onClick function to tell the backend to build a army
const TrainArmy = () => {
  return (
    <Action
      btnImg={ArmyImage}
      btnCaption={Content.action.trainArmy}
      resources={{ lumber: -3, steel: -3, gold: 0 }}
    />
  );
};

export default TrainArmy;
