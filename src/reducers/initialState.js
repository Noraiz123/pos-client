const initialState = {
  auth: {
    isSignedIn: false,
  },
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
  },
  categories: [],
  vendors: [],
  tags: [],
  users: [],
  customers: {
    allCustomers: [],
    currentCustomer: {},
  },
};

export default initialState;
