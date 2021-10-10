import MainPage from 'scenes/Main';
import WarRoomPage from 'scenes/WarRoom';
import LeaderboardPage from 'scenes/Leaderboard';

const routes = [
  {
    path: '/',
    component: <MainPage />,
  },
  {
    path: '/warroom',
    component: <WarRoomPage />,
  },
  {
    path: '/leaderboard',
    component: <LeaderboardPage />,
  },
];

export default routes;
