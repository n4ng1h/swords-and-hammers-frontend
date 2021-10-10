import { useContext, useEffect, useState } from 'react';
import ResourceContext from 'contexts/Resource';
import { Container, Grid } from '@mui/material';
import HeaderRow from 'scenes/WarRoom/components/HeaderRow';
import KingdomTitle from 'components/KingdomTitle';
import ResourceRow from 'scenes/WarRoom/components/ResourceRow';
import EventLog from 'scenes/WarRoom/components/EventLog';
import ActionRow from 'scenes/WarRoom/components/ActionRow';
import TurnEndDialog from 'scenes/WarRoom/components/TurnEndDialog';
import {
  RAW_MATERIALS_TEMPLATE,
  BUILT_RESOURCES_TEMPLATE,
  END_TURN_RESOURCES_TEMPLATE,
} from 'constant';
import styles from './styles';

const WarRoomPage = () => {
  const [rawMaterials, setRawMaterials] = useState(RAW_MATERIALS_TEMPLATE);
  const [builtResources, setBuiltResources] = useState(
    BUILT_RESOURCES_TEMPLATE
  );

  const { resourceInfo } = useContext(ResourceContext);
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

  const [isTurnEndDialogOpen, setTurnEndDialogOpen] = useState(false);
  // TODO: Open the turn end dialog when the end turn is detected
  // eslint-disable-next-line no-unused-vars
  const handleOpenTurnEndDialog = () => {
    setTurnEndDialogOpen(true);
  };
  const handleCloseTurnEndDialog = () => {
    setTurnEndDialogOpen(false);
  };
  // TODO: Update the number of end of turn resources
  // eslint-disable-next-line no-unused-vars
  const [endTurnResources, setEndTurnResources] = useState(
    END_TURN_RESOURCES_TEMPLATE
  );

  return (
    <Container>
      <TurnEndDialog
        open={isTurnEndDialogOpen}
        closeDialog={handleCloseTurnEndDialog}
        endTurnGain={endTurnResources}
      />
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
