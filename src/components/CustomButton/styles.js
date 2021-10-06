import { makeStyles } from '@material-ui/core/styles';
import NextButtonImage from 'assets/images/buttons/next-btn.png';

const useStyles = makeStyles(() => ({
  nextBtn: {
    color: 'white',
    width: '145px',
    height: '74px',
    backgroundImage: `url(${NextButtonImage})`,
  },
}));

export default useStyles;
