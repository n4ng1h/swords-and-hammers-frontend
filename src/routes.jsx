// Import SCENE components
import MainPage from 'scenes/Main';
import WarRoomPage from 'scenes/WarRoom';

const routes = [
  {
    path: '/',
    component: <MainPage />,
  },
  {
    path: '/warroom',
    component: <WarRoomPage />,
  },
];

export default routes;
