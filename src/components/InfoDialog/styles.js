import BigBoardImage from 'assets/images/display/large-board.png';

const styles = {
  backdrop: {
    zIndex: 999,
  },
  board: {
    width: '365px',
    height: '277px',
    backgroundImage: `url(${BigBoardImage})`,
    backgroundSize: 'cover',
  },
  closeBtn: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 320,
  },
  closeIcon: {
    transform: 'scale(2)',
  },
  boardTextContainer: {
    paddingTop: 5,
    maxWidth: '100%',
  },
  title: {
    color: 'white',
    overflowWrap: 'break-word',
  },
  boardTitle: {
    width: '280px',
  },
  boardContent: {
    marginTop: 2,
    width: '260px',
  },
};

export default styles;
