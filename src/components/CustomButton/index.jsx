/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import BUTTON_TYPE from 'constant';
import useStyles from './styles';

const CustomButton = (props) => {
  const classes = useStyles();
  const { btnType, ...otherProps } = props;

  return (
    <Button
      {...otherProps}
      className={clsx({
        [classes.nextBtn]: btnType === BUTTON_TYPE.NEXT,
      })}
    />
  );
};

CustomButton.propTypes = {
  btnType: PropTypes.string.isRequired,
};

export default CustomButton;
