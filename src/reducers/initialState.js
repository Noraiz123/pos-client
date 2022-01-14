const initialState = {
  auth: {
    isSignedIn: false,
    email: '',
    userId: null,
  },
  products: {
    product: {},
    products: [],
    productSizes: [],
    productColors: [],
    productsFilter: { page: 1, per_page: 10, category_id: null, keyword: '' },
    currentPage: 1,
    totalPages: null,
  },
  orders: {
    allOrders: [],
    order: [],
    onHold: [],
    currentOrder: [],
    currentCustomerDetails: {},
  },
  categories: [],
};

export default initialState;
