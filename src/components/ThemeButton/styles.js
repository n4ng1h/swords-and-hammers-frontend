import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWeb: {
    width: '50ch',
  },
  btnMobile: {
    width: '40ch',
  },
  highlight: {
    background: theme.palette.primary.main,
  },
  highlightDisabled: {
    background: 'grey',
  },
}));

export default useStyles;
