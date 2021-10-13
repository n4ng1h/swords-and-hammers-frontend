import { useContext, useEffect, useState } from 'react';
import RoundContext from 'contexts/Round';
import InfoDialog from 'components/InfoDialog';
import LeaderboardTable from 'scenes/Leaderboard/components/Table';
import Content from 'content';
import useSWR from 'swr';
import { fetcher } from 'services/utils';
import styles from './styles';

const LeaderboardPage = () => {
  const { gameId } = useContext(RoundContext);
  const [leaderboardContent, setLeaderboardContent] = useState([]);
  const { data } = useSWR(`/api/v1/games/${gameId}/leaderBoard`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      setLeaderboardContent(<LeaderboardTable resultsArr={data} />);
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(
  //       `Error encountered while fetching /api/v1/games/${gameId}/leaderBoard: ${JSON.stringify(
  //         error
  //       )}`
  //     );
  //   }
  // }, [error, gameId]);

  return (
    <div style={styles.container}>
      <InfoDialog
        open
        closeDialog={() => {}}
        title={Content.leaderboardTitle}
        content={leaderboardContent}
      />
    </div>
  );
};

export default LeaderboardPage;
