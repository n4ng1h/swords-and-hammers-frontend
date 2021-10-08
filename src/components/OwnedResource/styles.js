const styles = {
  imgContainer: {
    backgroundColor: '#FFCB44',
    borderRadius: '50%',
    position: 'relative',
    height: 64,
    width: 64,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  innerCircle: {
    position: 'absolute',
    backgroundColor: '#E5A600',
    borderRadius: '50%',
    width: '80%',
    height: '80%',
    zIndex: 3,
  },
  img: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    zIndex: 4,
  },
  resrcText: {
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderColor: '#FFCB44',
    backgroundColor: '#7F2E3F',
    borderRadius: 3,
    marginLeft: -3,
    width: 120,
    height: 40,
    zIndex: 0,
  },
  text: {
    color: 'white',
    paddingLeft: '8px',
    textAlign: 'center',
    zIndex: 1,
  },
};

export default styles;
