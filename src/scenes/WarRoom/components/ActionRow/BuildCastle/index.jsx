import Action from 'components/Action';
import CastleImage from 'assets/images/buttons/castle.png';
import Content from 'content';

// TODO: Add an onClick function to tell the backend to build a castle
const BuildCastle = () => {
  return (
    <Action
      btnImg={CastleImage}
      btnCaption={Content.action.buildCastle}
      resources={{ lumber: -12, steel: -10, gold: 25 }}
    />
  );
};

export default BuildCastle;
