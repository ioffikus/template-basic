import { IAuthState } from 'src/ducks/auth';

const state: IAuthState = {
  url: 'http://test-auth.com',
  data: {
    credentials: { distribution: ['main'], id: ['main', 'accounts'], storage: ['main'], market: ['main'] },
    clientId: '123',
  },
  isAuthenticated: false,
  isRequesting: false,
  isRequestError: false,
  isAuthLinkRequesting: false,
};

export default state;
