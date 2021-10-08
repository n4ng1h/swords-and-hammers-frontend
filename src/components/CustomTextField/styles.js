import TextFieldImage from 'assets/images/textfields/text-field.png';

const styles = {
  textFieldContainer: {
    color: 'white',
    minWidth: '32ch',
    minHeight: '8ch',
    backgroundImage: `url(${TextFieldImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  textField: {
    paddingTop: '26px',
    paddingLeft: 6,
    width: '22ch',
    '& .MuiInputBase-root': {
      color: 'white',
    },
  },
  title: {
    marginBottom: 1,
  },
  errorMsg: {
    color: 'red',
    paddingTop: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
};

export default styles;
