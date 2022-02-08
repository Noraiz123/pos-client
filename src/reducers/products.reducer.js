import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

const modifyProducts = (items) => {
  let skusArray = [];
  for (let values of items) {
    if (values.skus.length) {
      for (let skus of values.skus) {
        skusArray.push({ ...values, skus });
      }
    } else {
      skusArray.push({ ...values, skus: {} });
    }
  }
  return skusArray;
};

const handleProductUpdate = (state, action) => {
  const { products } = state;
  const updatedProducts = modifyProducts([action.payload]);
  for (let i = 0; i <= products.length; i++) {
    const data = updatedProducts.find((e) => e.skus?.id === products[i]?.skus.id);
    if (data?.id) {
      products[i] = data;
    }
  }
  return products;
};

export default (state = initialState.products, action) => {
  switch (action.type) {
    case actionTypes.getProducts: {
      // const { page, products, total_pages } = action.payload;
      return { ...state, products: action.payload };
    }
    case actionTypes.getProduct: {
      return { ...state, product: action.payload };
    }
    case actionTypes.getProductsStats: {
      const { products, page, total_pages } = action.payload;
      return {
        ...state,
        productsStats: {
          ...state.productsStats,
          stats: modifyProducts(products),
          currentPage: page,
          totalPages: total_pages,
        },
      };
    }
    case actionTypes.filterProducts: {
      return { ...state, productsFilter: action.payload };
    }
    case actionTypes.filterStats: {
      return { ...state, productsStats: { ...state.productsStats, statsFilter: action.payload } };
    }
    case actionTypes.createProduct: {
      return { ...state, products: state.products.concat(action.payload) };
    }
    case actionTypes.editProduct: {
      return {
        ...state,
        products: state.products.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    }
    case actionTypes.createSize: {
      return { ...state, productSizes: state.productSizes.concat(action.payload) };
    }
    case actionTypes.getSizes: {
      return { ...state, productSizes: action.payload.product_sizes };
    }
    case actionTypes.createColor: {
      return { ...state, productColors: state.productColors.concat(action.payload) };
    }
    case actionTypes.getColors: {
      return { ...state, productColors: action.payload.product_colors };
    }
    default:
      return state;
  }
};
