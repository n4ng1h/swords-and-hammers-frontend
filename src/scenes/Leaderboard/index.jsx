import { useContext, useEffect, useState } from 'react';
import SocketContext from 'contexts/Socket';
import InfoDialog from 'components/InfoDialog';
import LeaderboardTable from 'scenes/Leaderboard/components/Table';
import { fetchLeaderboard } from 'services/api';
import Content from 'content';

const LeaderboardPage = () => {
  const { gameId } = useContext(SocketContext);
  const [leaderboardContent, setLeaderboardContent] = useState([]);

  useEffect(() => {
    const getPlayStats = async () => {
      const leaderboardResults = await fetchLeaderboard(gameId);
      if (leaderboardResults !== null) {
        setLeaderboardContent(
          <LeaderboardTable resultsArr={leaderboardResults} />
        );
      }
    };

    getPlayStats();
  }, [gameId]);

  return (
    <InfoDialog
      open
      closeDialog={() => {}}
      title={Content.leaderboardTitle}
      content={leaderboardContent}
    />
  );
};

export default LeaderboardPage;
