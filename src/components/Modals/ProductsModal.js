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
  const { product } = useSelector((state) => ({
    product: state.products.product,
  }));
  const initState = {
    name: '',
    skus_attributes: [{ product_color_id: null, product_size_id: null, price: null, quantity: null }],
  };
  const [openAddProduct, setOpenAddProduct] = useState(false);
  // const [productData, setProductData] = useState(initState);
  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));
  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  const productDeleteHandler = (id) => {
    dispatch(DeleteProduct(id)).then(() => {
      dispatch(GetProducts());
    });
  };

  const productUpdateHandler = (data) => {
    dispatch(GetProduct(data.id)).then(() => {
      setIsOpen(false);
      setOpenAddProduct(true);
    });
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto h-50v p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Products
          </Dialog.Title>
          <div className='mt-10'>
            <table className='table-fixed product-table border-2'>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ height: '200px', width: '200px', overflowY: 'scroll' }}>
                {products &&
                  products.map((e) => (
                    <tr key={e.id}>
                      <td></td>
                      <td></td>
                      <td>{e.name}</td>
                      <td></td>
                      <td></td>
                      <td></td>
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

          <div className='mt-4'>
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
