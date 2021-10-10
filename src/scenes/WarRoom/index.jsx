/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect, useState } from 'react';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import { Container, Grid } from '@mui/material';
import HeaderRow from 'scenes/WarRoom/components/HeaderRow';
import KingdomTitle from 'components/KingdomTitle';
import ResourceRow from 'scenes/WarRoom/components/ResourceRow';
import EventLog from 'scenes/WarRoom/components/EventLog';
import ActionRow from 'scenes/WarRoom/components/ActionRow';
import TurnEndDialog from 'scenes/WarRoom/components/TurnEndDialog';
import Loading from 'components/Loading';
import { refreshResourceState } from 'services/api';
import {
  RAW_MATERIALS_TEMPLATE,
  BUILT_RESOURCES_TEMPLATE,
  END_TURN_RESOURCES_TEMPLATE,
} from 'constant';
import Content from 'content';
import styles from './styles';

const WarRoomPage = () => {
  const [rawMaterials, setRawMaterials] = useState(RAW_MATERIALS_TEMPLATE);
  const [builtResources, setBuiltResources] = useState(
    BUILT_RESOURCES_TEMPLATE
  );

  const { gameId, isRoundActive } = useContext(SocketContext);
  const { resourceInfo, setResourceInfo } = useContext(ResourceContext);

  const updateResourceDisplay = useCallback(async () => {
    const resources = await refreshResourceState(gameId);
    if (resources) {
      setResourceInfo(resources);
    }
  }, [gameId, setResourceInfo]);
  useEffect(() => {
    updateResourceDisplay();
  }, [isRoundActive, updateResourceDisplay]);

  useEffect(() => {
    if (
      resourceInfo !== null &&
      typeof resourceInfo !== 'undefined' &&
      Object.keys(resourceInfo).length > 0
    ) {
      setRawMaterials({
        lumber: resourceInfo.lumber,
        iron: resourceInfo.iron,
        gold: resourceInfo.gold,
      });

      setBuiltResources({
        village: resourceInfo.village,
        castle: resourceInfo.castle,
        army: resourceInfo.army,
      });
    }
  }, [resourceInfo]);

  // TODO: Update the number of end of turn resources
  // eslint-disable-next-line no-unused-vars
  // const [endTurnResources, setEndTurnResources] = useState(
  //   END_TURN_RESOURCES_TEMPLATE
  // );

  return (
    <Container>
      <Loading open={!isRoundActive} msg={Content.waitingNextRound} />
      {/* <TurnEndDialog
        open={!isRoundActive}
        closeDialog={handleCloseTurnEndDialog}
        endTurnGain={endTurnResources}
      /> */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item sx={styles.statsControls}>
          <HeaderRow />
        </Grid>
        <Grid item>
          <KingdomTitle />
        </Grid>
        <Grid item>
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
