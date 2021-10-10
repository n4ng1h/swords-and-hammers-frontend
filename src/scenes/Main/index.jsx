import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import Title from 'components/Title';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import Loading from 'components/Loading';
import { Grid } from '@mui/material';
import Content from 'content';
import { BUTTON_TYPE, ROUTE_PATH } from 'constant';
import isKingdomNameValid from 'services/validation';
import { joinGame } from 'services/api';
import styles from './styles';

const MainPage = () => {
  const history = useHistory();
  const [kingdomName, setKingdomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const resetErrorMsg = () => {
    setErrorMsg('');
  };
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { gameId, hasGameStarted } = useContext(SocketContext);
  const { setResourceInfo } = useContext(ResourceContext);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const handleStartGame = async () => {
    if (isKingdomNameValid(kingdomName)) {
      // Set the page to loading while we wait for a response from the server
      setIsPageLoading(true);
      resetErrorMsg();
      const setupInfo = await joinGame(gameId, kingdomName);
      if (setupInfo !== null) {
        setResourceInfo(setupInfo);
        setReadyToPlay(true);
        setIsPageLoading(false);
      } else {
        // Remove the backdrop loader
        setIsPageLoading(false);
        setErrorMsg(Content.cannotJoinError);
      }
    } else {
      // Display error to the user
      setErrorMsg(Content.invalidKingdomName);
    }
  };

  useEffect(() => {
    const DEV_MODE = true;
    if ((hasGameStarted && readyToPlay) || (DEV_MODE && readyToPlay)) {
      history.push(`/${gameId}${ROUTE_PATH.warroom}`);
    }
  }, [gameId, hasGameStarted, history, readyToPlay]);

  return (
    <div>
      <Loading
        open={isPageLoading || (readyToPlay && !hasGameStarted)}
        msg={isPageLoading ? Content.pageLoading : Content.waitingGameStart}
      />
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
          <CustomButton
            btnType={BUTTON_TYPE.NEXT}
            onClick={handleStartGame}
            disabled={isPageLoading || readyToPlay}
          >
            {Content.startBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
