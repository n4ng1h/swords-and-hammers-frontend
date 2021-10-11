import TitleBoardImage from 'assets/images/display/title-board.png';

const styles = {
  textContainerWeb: {
    display: 'flex',
    color: 'white',
    width: '218px',
    height: '61px',
    backgroundImage: `url(${TitleBoardImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainerMobile: {
    display: 'flex',
    color: 'white',
    width: 160,
    height: 45,
    backgroundImage: `url(${TitleBoardImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default styles;
