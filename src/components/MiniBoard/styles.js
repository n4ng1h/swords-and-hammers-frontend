import SmallBoardImage from 'assets/images/display/small-board.png';

const styles = {
  boardWeb: {
    width: 108,
    height: 88,
    backgroundImage: `url(${SmallBoardImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  contentWeb: {
    height: '100%',
    paddingLeft: '5px',
    textAlign: 'center',
  },
  contentElementWeb: {
    width: '100px',
  },
  contentMobile: {
    height: '100%',
    textAlign: 'center',
  },
  boardMobile: {
    width: 80,
    height: 60,
    backgroundImage: `url(${SmallBoardImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  contentElementMobile: {
    width: 70,
  },
  text: {
    color: 'white',
  },
};

export default styles;
