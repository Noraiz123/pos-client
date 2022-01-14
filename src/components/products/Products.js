import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderAction } from '../../actions/order.actions';
import { filterProductsAction } from '../../actions/products.actions';

const Products = () => {
  const dispatch = useDispatch();
  const { products, productsFilter, categories, currentPage, totalPages } = useSelector((state) => ({
    products: state.products.products,
    productsFilter: state.products.productsFilter,
    categories: state.categories,
    currentPage: state.products.currentPage,
    totalPages: state.products.totalPages,
  }));

  const createOrder = (item) => {
    dispatch(createOrderAction({ ...item, quantity: 1 }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, category_id: value }));
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, keyword: value }));
  };

  const handlePageChange = (page) => {
    dispatch(filterProductsAction({ ...productsFilter, page }));
  };

  const handlePerPageChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, per_page: value }));
  };

  return (
    <div className='p-10 bg-white ml-4 mt-6 w-full'>
      <div className='grid grid-cols-3'>
        <div className=''>
          <input
            type='text'
            className='input-field'
            placeholder='Search Product by name or sku'
            value={productsFilter.keyword}
            onChange={handleKeywordChange}
          />
        </div>
        <div className='space-x-2'>
          <select
            className='input-select w-full'
            name='category_id'
            onChange={handleCategoryChange}
            value={productsFilter.category_id}
          >
            <option value='' selected disabled>
              Select Category
            </option>
            <option value=''>All</option>
            {categories &&
              categories.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='space-x-2 flex justify-end'>
          <select
            className='input-select w-2/4'
            name='per_page'
            onChange={handlePerPageChange}
            value={productsFilter.per_page}
          >
            <option value='' selected disabled>
              Per Page
            </option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-5'>
        {products &&
          products.map((e) => (
            <div key={e.skus.id} className='border mt-6 p-4 cursor-pointer' onClick={() => createOrder(e)}>
              <div className='space-y-2 border-b p-2'>
                <img src='https://thumbs.dreamstime.com/b/bottle-water-12522351.jpg' alt='product' className='h-56' />
                <p className='text-center text-gray-400 font-bold'>{e.name}</p>
              </div>
              <div className='text-center mt-3'>
                <p className='text-gray-400'>STOCK {e.skus?.quantity}</p>
                <p className='text-green-500 font-extrabold'>Rs {e.skus?.price}</p>
              </div>
            </div>
          ))}
      </div>
      {products && (
        <div className='flex my-3 justify-center'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className='page-item' onClick={() => handlePageChange(productsFilter.page - 1)}>
                <button className='page-link'>
                  <span aria-hidden='true'>&laquo;</span>
                </button>
              </li>
              {Array(totalPages)
                .fill()
                .map((e, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 && 'active'}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    <button className='page-link' href='.'>
                      {i + 1}
                    </button>
                  </li>
                ))}
              <li className='page-item' onClick={() => handlePageChange(productsFilter.page + 1)}>
                <button className='page-link'>
                  <span aria-hidden='true'>&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;
