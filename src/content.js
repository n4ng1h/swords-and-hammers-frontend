import { INFO_DIALOG_TYPE } from 'constant';

const Content = {
  title: 'Kingdom',
  kingdomNameField: 'Your kingdom name:',
  startBtn: 'Start',
  invalidKingdomName: 'Please enter a non-empty name.',
  roundTitle: 'Round',
  timerTitle: 'Time left',
  kingdomNameLoading: 'Loading...',
  action: {
    buildVillage: 'Build Village',
    buildCastle: 'Build Castle',
    trainArmy: 'Train Army',
    attack: 'Attack',
  },
  images: {
    altText: {
      lumber: 'Lumber resource',
      steel: 'Steel resource',
      gold: 'Gold resources',
    },
  },
  noCostText: 'No cost',
  attackBtn: 'Attack',
  kingdomConjugate: ' has:',
  fetchingOppStats: 'Retrieving opponent stats...',
  resource: {
    village: 'Villages',
    castle: 'Castles',
    army: 'Armies',
    winProb: 'Chance of Winning',
  },
  attackOutcome: {
    [INFO_DIALOG_TYPE.ALR_ATTACKED]: {
      title: 'Sorry',
      desc: 'The selected player is already engaged in a war. Please try another.',
    },
    [INFO_DIALOG_TYPE.ATTACKED]: {
      title: 'War',
      desc: 'You have started a war against the player.',
    },
  },
};

export default Content;
