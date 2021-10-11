/* eslint-disable no-unused-vars */
import SkyImage from 'assets/images/background/sky.png';
import MountainImage from 'assets/images/background/mountain.png';
import CastleImage from 'assets/images/background/castle.png';

const styles = {
  root: {
    width: '100%',
  },
  background: {
    backgroundImage: `url(${SkyImage})`,
    backgroundSize: 'cover',
  },
  statsControls: {
    marginTop: 5,
  },
  actionControls: {
    marginTop: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    marginTop: 2,
  },
  resourceControls: {
    marginTop: 3,
    marginBottom: 3,
  },
};

export default styles;
