import { ILocaleState } from 'src/ducks/locale';

const state: ILocaleState = {
  current: 'en-US',
  availables: ['en-US', 'ru-RU'],
  currencies: {
    USD: '$',
    RUB: '₽',
  },
};

export default state;
