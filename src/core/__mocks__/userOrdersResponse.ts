import currentCartResponse from './currentCartResponse';
import currentCartItemsResponse from './currentCartItemsResponse';

const userOrdersResponse = {
  count: 2,
  next: '',
  previous: '',
  results: [
    {
      id: 31,
      is_paid: false,
      status: 'none',
      transaction_details: '',
      transaction_status: '',
      cart: {
        ...currentCartResponse,
        items: currentCartItemsResponse.results,
      },
    },
    {
      id: 32,
      is_paid: true,
      status: 'paid',
      transaction_details: '',
      transaction_status: '',
      cart: {
        ...currentCartResponse,
        items: currentCartItemsResponse.results,
      },
    },
  ],
};

export default userOrdersResponse;
