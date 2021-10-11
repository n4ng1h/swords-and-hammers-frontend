const isKingdomNameValid = (name) => {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length === 0) {
    return false;
  }

  if (name.trim() === '') {
    return false;
  }

  return true;
};

export default isKingdomNameValid;
