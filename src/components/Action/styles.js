import BigBoardImage from 'assets/images/display/large-board.png';

const styles = {
  btn: {
    position: 'relative',
    height: '100%',
    width: '200px',
    borderRadius: '50%',
  },
  innerImg: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  innerText: {
    color: 'white',
  },
  btnContent: {
    marginTop: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  board: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${BigBoardImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  btnMobile: {
    position: 'relative',
    height: '100%',
    width: 170,
    borderRadius: '50%',
  },
};

export default styles;
