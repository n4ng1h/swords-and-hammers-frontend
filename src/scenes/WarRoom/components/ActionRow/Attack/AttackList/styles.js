const styles = {
  backdrop: {
    zIndex: 10,
  },
  list: {
    height: '600px',
    width: '400px',
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
};

export default styles;
