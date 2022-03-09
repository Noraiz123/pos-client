import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderAction } from '../../actions/order.actions';
import { filterProductsAction } from '../../actions/products.actions';

const Products = () => {
  const dispatch = useDispatch();
  const { products, productsFilter, categories, currentPage, totalPages, currentOrder } = useSelector((state) => ({
    products: state.products.products,
    productsFilter: state.products.productsFilter,
    categories: state.categories,
    currentPage: state.products.currentPage,
    totalPages: state.products.totalPages,
    currentOrder: state.orders.currentOrder,
  }));
  const [openSku, setOpenSku] = useState(false);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, category_id: value }));
  };

  function debounce(func, timeout = 2000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, keyword: value }));
  };

  const optimizedSearch = debounce(handleKeywordChange);

  const handlePageChange = (page) => {
    dispatch(filterProductsAction({ ...productsFilter, page }));
  };

  const handlePerPageChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, per_page: value }));
  };

  const handleCreateOrder = (item) => {
    const alreadyExists = currentOrder.find((e) => e._id === item._id);
    if (alreadyExists && alreadyExists._id) {
      dispatch(
        createOrderAction({
          ...item,
          orderQuantity:
            Number(alreadyExists.orderQuantity) < Number(item.quantity)
              ? alreadyExists.orderQuantity + 1
              : alreadyExists.orderQuantity,
        })
      );
    } else {
      dispatch(createOrderAction({ ...item, orderQuantity: 1 }));
    }
  };

  return (
    <div className='p-10 bg-white ml-4 mt-6 lg:col-span-2'>
      <div className='grid xl:grid-cols-3   sm:grid-cols-1'>
        <div className=''>
          <input
            type='text'
            className='input-field sm:w-full xl:w-auto'
            placeholder='Search Product by name or sku'
            onChange={optimizedSearch}
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
                <option key={e.id} value={e._id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='space-x-2 flex justify-end'>
          <select
            className='input-select xl:w-2/4 sm:w-full'
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
      <div className='grid xl:grid-cols-5 sm:grid-cols-1'>
        {products &&
          products.map((e) => (
            <div
              key={e._id}
              className='flex flex-col justify-center border mt-6 p-4 w-full cursor-pointer'
              onClick={() => handleCreateOrder(e)}
            >
              <div className='space-y-2 border-b p-2'>
                <img
                  src={e.imgUrl || 'https://mrcodpakistan.com/wp-content/uploads/2018/09/noImg_2.jpg'}
                  alt='product'
                  className='h-56 mx-auto object-contain'
                />
                <p className='text-center text-gray-400 font-bold'>{e.name}</p>
              </div>
              <div className='mt-3 mx-auto'>
                <p className='text-center text-red-400 font-extrabold'>Available: {e.quantity}</p>
                <p className='text-center text-green-400 font-mono font-extrabold'>Rs {e.price}</p>
              </div>
            </div>
          ))}
      </div>
      {products.length > 0 && (
        <div className='flex my-3 justify-center'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className='page-item' onClick={() => currentPage !== 1 && handlePageChange(productsFilter.page - 1)}>
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
              <li
                className='page-item'
                onClick={() => currentPage < totalPages && handlePageChange(productsFilter.page + 1)}
              >
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
