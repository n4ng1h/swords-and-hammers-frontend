import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100vh',
  },
  item: {
    marginTop: theme.spacing(10),
  },
}));

export default useStyles;
