const styles = {
  backdrop: {
    zIndex: 10,
  },
  list: {
    maxHeight: 600,
    width: 400,
    maxWidth: '100%',
    backgroundColor: '#7F2E3F',
    borderColor: '#FFCB44',
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderRadius: 3,
    overflow: 'auto',
  },
  itemText: {
    color: '#FFCB44',
  },
  closeBtn: {
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 370,
  },
  closeIcon: {
    transform: 'scale(2)',
  },
  gridContainer: {
    marginBottom: 2,
  },
  radio: {
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
  },
  listMobile: {
    maxHeight: 600,
    width: '100%',
    backgroundColor: '#7F2E3F',
    borderColor: '#FFCB44',
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderRadius: 3,
    overflow: 'auto',
  },
  closeBtnMobile: {
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 230,
  },
};

export default styles;
