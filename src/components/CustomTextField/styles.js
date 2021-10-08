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
  textFieldTitle: {
    color: 'white',
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
  errorMsgContainer: {
    color: 'white',
    paddingTop: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: '20px',
  },
  errorMsg: {
    minHeight: '24px',
  },
};

export default styles;
