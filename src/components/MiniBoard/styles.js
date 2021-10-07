import SmallBoardImage from 'assets/images/display/small-board.png';

const styles = {
  board: {
    width: '108px',
    height: '88px',
    backgroundImage: `url(${SmallBoardImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  content: {
    height: '88px',
    paddingLeft: '5px',
    textAlign: 'center',
  },
  contentElement: {
    width: '100px',
  },
  text: {
    color: 'white',
  },
};

export default styles;
