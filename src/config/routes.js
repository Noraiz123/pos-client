import { PosPage, TransactionsPage } from '../pages';
import { TRANSACTIONS } from '../constants/pages';

export default [
  {
    path: '/',
    exact: true,
    component: PosPage,
  },
  {
    path: TRANSACTIONS,
    component: TransactionsPage,
  },
];
