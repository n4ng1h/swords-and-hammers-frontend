/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import SocketContext from 'contexts/Socket';
import RoundContext from 'contexts/Round';
import { Container, Grid } from '@mui/material';
import HeaderRow from 'scenes/WarRoom/components/HeaderRow';
import KingdomTitle from 'components/KingdomTitle';
import ResourceRow from 'scenes/WarRoom/components/ResourceRow';
import EventLog from 'scenes/WarRoom/components/EventLog';
import ActionRow from 'scenes/WarRoom/components/ActionRow';
import ResourceGainDialog from 'scenes/WarRoom/components/ResourceGainDialog';
import Loading from 'components/Loading';
import {
  RAW_MATERIALS_TEMPLATE,
  BUILT_RESOURCES_TEMPLATE,
  END_TURN_RESOURCES_TEMPLATE,
  BUTTON_TYPE,
  ROUTE_PATH,
  SOCKET_EVENT,
  SOCKET_EVENT_ROLE_TYPE,
  SOCKET_EVENT_TYPE,
} from 'constant';
import Content from 'content';
import useSWR from 'swr';
import { fetcher, transformRoundData, setTimerStart } from 'services/utils';
import styles from './styles';

const WarRoomPage = () => {
  const {
    gameId,
    hasGameStarted,
    notifyJoinGame,
    setGameStart,
    setGameEnd,
    setNextRound,
    isRoundCompleted,
    isRoundActive,
  } = useContext(RoundContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on(SOCKET_EVENT, (resp) => {
        if (resp.role === SOCKET_EVENT_ROLE_TYPE.USER) {
          switch (resp.type) {
            case SOCKET_EVENT_TYPE.START_GAME: {
              console.log('START game event');
              setTimerStart();
              setGameStart(resp.GameId);
              break;
            }

            case SOCKET_EVENT_TYPE.GAME_COMPLETED: {
              console.log('COMPLETED game event');
              setGameEnd(resp.GameId);
              break;
            }

            case SOCKET_EVENT_TYPE.NEXT_ROUND: {
              console.log('NEXT round event');
              setTimerStart();
              setNextRound();
              break;
            }

            default:
              break;
          }
        }
      });

      socket.emit('ADD_PLAYER', {
        gameId,
        uuid: localStorage.getItem('deviceId'),
      });
    }
  }, [gameId, setGameEnd, setGameStart, setNextRound]);

  const [rawMaterials, setRawMaterials] = useState(RAW_MATERIALS_TEMPLATE);
  const [builtResources, setBuiltResources] = useState(
    BUILT_RESOURCES_TEMPLATE
  );

  const { data, error } = useSWR(`/api/v1/scorecard/${gameId}`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data && !error) {
      setRawMaterials((prevState) => ({
        ...prevState,
        lumber: data.lumber,
        iron: data.iron,
        gold: data.totalWealth,
      }));

      setBuiltResources((prevState) => ({
        ...prevState,
        village: data.village,
        castle: data.castle,
        army: data.army,
      }));
    }
  }, [data, error]);

  const [currRound, setCurrRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [kingdomTitle, setKingdomTitle] = useState(Content.kingdomNameLoading);
  const { data: gameInfo } = useSWR(`/api/v1/games/${gameId}`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (gameInfo) {
      const roundInfo = transformRoundData(gameInfo);
      if (roundInfo !== null) {
        setCurrRound(roundInfo.currRound);
        setTotalRounds(roundInfo.totalRounds);
        setKingdomTitle(roundInfo.currKingdomName);
      }
    }
  }, [gameInfo]);

  // useEffect(() => {
  //   if (gameInfo.error) {
  //     console.log(
  //       `Error encountered while fetching /api/v1/games/${gameId}: ${JSON.stringify(
  //         gameInfo.error
  //       )}`
  //     );
  //   }
  // }, [gameInfo, gameId]);

  // TODO: Update the number of end of turn resources
  // eslint-disable-next-line no-unused-vars
  // const [endTurnResources, setEndTurnResources] = useState(
  //   END_TURN_RESOURCES_TEMPLATE
  // );

  return (
    <Container sx={styles.root}>
      <Loading
        open={!isRoundActive || isRoundCompleted}
        msg={Content.waitingNextRound}
      />
      {/* <ResourceGainDialog
        open={!isRoundActive}
        closeDialog={handleCloseTurnEndDialog}
        endTurnGain={endTurnResources}
      /> */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item sx={styles.statsControls}>
          <HeaderRow currRound={currRound} totalRounds={totalRounds} />
        </Grid>
        <Grid item sx={styles.title}>
          <KingdomTitle currKingdomName={kingdomTitle} />
        </Grid>
        <Grid item sx={styles.resourceControls}>
          <ResourceRow resourceOwned={rawMaterials} />
        </Grid>
        <Grid item>
          <EventLog />
        </Grid>
        <Grid item sx={styles.actionControls}>
          <ActionRow resources={builtResources} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WarRoomPage;
