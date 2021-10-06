/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Button } from '@material-ui/core';
import useStyles from 'components/ThemeButton/styles';
import ViewContext from 'contexts/View';
import clsx from 'clsx';

const ThemeButton = (props) => {
  const classes = useStyles();
  const { isMobileView } = useContext(ViewContext);
  const { className, highlight, disabled, variant, ...otherProps } = props;

  return (
    <Button
      {...otherProps}
      className={clsx(className, {
        [classes.btnWeb]: !isMobileView,
        [classes.btnMobile]: isMobileView,
        [classes.highlight]: highlight,
        [classes.highlightDisabled]: disabled && highlight,
      })}
    />
  );
};

ThemeButton.defaultProps = {
  className: '',
  highlight: false,
  disabled: null,
  variant: null,
};

ThemeButton.propTypes = {
  className: PropTypes.string,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};

export default ThemeButton;
