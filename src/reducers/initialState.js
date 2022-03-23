const initialState = {
  auth: {
    isSignedIn: false,
  },
  isLoading: false,
  products: {
    product: {},
    products: [],
    productSizes: [],
    productColors: [],
    productsStats: { stats: [], totalPages: null, currentPage: 1, statsFilter: { page: 1, perPage: 10, keyword: '' } },
    productsFilter: { page: 1, per_page: 10, category_id: null, keyword: '' },
    currentPage: 1,
    totalPages: null,
  },
  orders: {
    orderStatus: 'CREATE_ORDER',
    allOrders: [],
    order: {},
    onHold: [],
    currentOrder: [],
    currentPage: 1,
    totalPages: null,
    totalTransactions: 0,
    totalSales: 0,
    totalProfit: 0,
    chartStats: [],
  },
  categories: [],
  stores: [],
  vendors: [],
  users: [],
  customers: {
    allCustomers: [],
    currentCustomer: {},
  },
};

export default initialState;
