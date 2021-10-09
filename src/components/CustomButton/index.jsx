import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BUTTON_TYPE } from 'constant';
import styles from './styles';

/**
 * shouldForwardProp determines if we should pass a given prop
 * to the component, in this case, Button.
 *
 * In this case, we don't want to pass the btnType prop to the
 * underlying <button> element used by the Button component.
 *
 * We only use it to dynamically determine styles
 */

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'btnType',
})(({ btnType }) => ({
  ...(btnType === BUTTON_TYPE.NEXT && styles.nextBtn),
  ...(btnType === BUTTON_TYPE.ENTER && styles.enterBtn),
  ...(btnType === BUTTON_TYPE.SMALL && styles.smallBtn),
}));

export default CustomButton;
