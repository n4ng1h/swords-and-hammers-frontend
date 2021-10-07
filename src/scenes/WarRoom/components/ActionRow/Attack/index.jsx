import Action from 'components/Action';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';

const AttackKingdom = () => {
  return <Action btnImg={AttackImage} btnCaption={Content.action.attack} />;
};

export default AttackKingdom;
