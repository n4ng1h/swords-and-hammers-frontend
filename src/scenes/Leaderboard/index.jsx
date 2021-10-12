import { useContext, useEffect, useState } from 'react';
import SocketContext from 'contexts/Socket';
import InfoDialog from 'components/InfoDialog';
import LeaderboardTable from 'scenes/Leaderboard/components/Table';
import Content from 'content';
import useSWR from 'swr';
import { fetcher } from 'services/utils';

const LeaderboardPage = () => {
  const { gameId } = useContext(SocketContext);
  const [leaderboardContent, setLeaderboardContent] = useState([]);
  const { data, error } = useSWR(
    `/api/v1/games/${gameId}/leaderBoard`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setLeaderboardContent(<LeaderboardTable resultsArr={data} />);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(
        `Error encountered while fetching /api/v1/games/${gameId}/leaderBoard: ${JSON.stringify(
          error
        )}`
      );
    }
  }, [error, gameId]);

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
