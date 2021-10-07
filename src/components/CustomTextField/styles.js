import { makeStyles } from '@material-ui/core/styles';
import TextFieldImage from 'assets/images/textfields/text-field.png';

const useStyles = makeStyles((theme) => ({
  textFieldContainer: {
    color: 'white',
    minWidth: '32ch',
    minHeight: '8ch',
    backgroundImage: `url(${TextFieldImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  textField: {
    paddingTop: '28px',
    width: '22ch',
    '& .MuiInputBase-root': {
      color: 'white',
    },
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  errorMsg: {
    color: 'red',
    paddingTop: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

export default useStyles;
