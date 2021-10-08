import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Title from 'components/Title';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import { Grid } from '@mui/material';
import Content from 'content';
import { BUTTON_TYPE, ROUTE_PATH } from 'constant';
import isKingdomNameValid from 'services/validation';
import styles from './styles';

const MainPage = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [kingdomName, setKingdomName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState('');
  const resetErrorMsg = () => {
    setErrorMsg('');
  };

  // eslint-disable-next-line no-unused-vars
  const handleStartGame = () => {
    if (isKingdomNameValid(kingdomName)) {
      resetErrorMsg();
      // If it is valid, we proceed to the next step
      // TODO: API call to submit user details to backend
      history.push(ROUTE_PATH.warroom);
    } else {
      // Display error to the user
      setErrorMsg(Content.invalidKingdomName);
    }
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={styles.gridContainer}
      >
        <Grid item>
          <Title>{Content.title}</Title>
        </Grid>
        <Grid item sx={styles.item}>
          <CustomTextField
            title={Content.kingdomNameField}
            onChange={(e) => {
              setKingdomName(e.target.value);
            }}
            maxLength={20}
            errorMsg={errorMsg}
          />
        </Grid>
        <Grid item sx={styles.item}>
          <CustomButton btnType={BUTTON_TYPE.NEXT} onClick={handleStartGame}>
            {Content.startBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
