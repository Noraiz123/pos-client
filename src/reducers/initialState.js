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
  },
  orders: {
    allOrders: [],
    order: [],
    onHold: [],
    currentOrder: [],
  },
  categories: [],
};

export default initialState;
