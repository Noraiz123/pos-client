import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { DeleteProduct, GetProduct, GetProducts } from '../../actions/products.actions';
import AddProducts from './AddProductModal';

const ProductsModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { product, categories, productsFilter, vendors } = useSelector((state) => ({
    product: state.products.product,
    productsFilter: state.products.productsFilter,
    categories: state.categories,
    vendors: state.vendors,
  }));

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));
  useEffect(() => {
    dispatch(GetProducts(productsFilter));
  }, [dispatch, productsFilter]);

  const productDeleteHandler = (id) => {
    dispatch(DeleteProduct(id)).then(() => {
      dispatch(GetProducts(productsFilter));
    });
  };

  const productUpdateHandler = (data) => {
    dispatch(GetProduct(data.id)).then(() => {
      setIsOpen(false);
      setOpenAddProduct(true);
    });
  };

  const getCategory = (id) => {
    const category = categories && categories.find((e) => e.id === id);

    return category ? category.name : 'N/A';
  };

  const getVendor = (id) => {
    const vendor = vendors && vendors.find((e) => e.id === id);

    return vendor ? vendor.name : 'N/A';
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Products
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Barcode</th>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((e, index) => (
                    <tr key={e.skus.id}>
                      <td></td>
                      <td>{index + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.skus?.price}</td>
                      <td>{e.skus?.quantity}</td>
                      <td>{getCategory(e.category_id)}</td>
                      <td>{getVendor(e.vendor_id)}</td>
                      <td>
                        <button className='btn-sm-red' onClick={() => productDeleteHandler(e.id)}>
                          <TrashIcon className='h-4' />
                        </button>
                        <button className='btn-sm-yellow ml-3' onClick={() => productUpdateHandler(e)}>
                          <PencilAltIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4 flex items-end h-auto'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
      <AddProducts isOpen={openAddProduct} setIsOpen={setOpenAddProduct} productData={product} />
    </div>
  );
};

export default ProductsModal;
