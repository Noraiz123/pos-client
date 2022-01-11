import { Dialog } from '@headlessui/react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import {
  CreateColor,
  CreateProduct,
  CreateSize,
  EditProduct,
  GetColors,
  GetSizes,
} from '../../actions/products.actions';
import { getSizes } from '../../api/products';

const AddProducts = ({ isOpen, setIsOpen, productData }) => {
  const initState = {
    name: '',
    skus_attributes: [{ product_color_id: null, product_size_id: null, price: null, quantity: null }],
  };
  const [productDetails, setProductDetails] = useState(initState);
  const [imageFile, setImageFile] = useState('');
  const sizeRef = useRef();
  const colorRef = useRef();
  const [productSku, setProductSku] = useState({ addSize: false, addColor: false });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { sizes, colors } = useSelector((state) => ({
    sizes: state.products.productSizes,
    colors: state.products.productColors,
  }));

  useEffect(() => {
    if (productData && productData.id) {
      const { name, skus } = productData;
      const { id, quantity, price } = skus[0];
      const productColor = skus[0].product_color.id;
      const productSize = skus[0].product_size.id;
      setProductDetails({
        name,
        skus_attributes: [
          {
            id,
            quantity: parseInt(quantity),
            price: parseInt(price),
            product_color_id: productColor,
            product_size_id: productSize,
          },
        ],
      });
    }
  }, [productData]);

  const handleAddProduct = (e) => {
    const { name, value } = e.target;
    if (['product_size_id', 'product_color_id', 'price', 'quantity'].includes(name)) {
      setProductDetails((preState) => ({
        ...preState,
        skus_attributes: preState.skus_attributes.map((e) => ({ ...e, [name]: parseInt(value) })),
      }));
    } else {
      setProductDetails((preState) => ({ ...preState, [name]: value }));
    }
  };

  const handleProductImage = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(GetColors());
    dispatch(GetSizes());
  }, []);

  const handleAddSize = () => {
    const size = sizeRef.current.value;
    dispatch(CreateSize(size)).then((res) => {
      setProductDetails((preState) => ({
        ...preState,
        skus_attributes: [{ ...preState.skus_attributes[0], product_size_id: res.data.id.toString() }],
      }));
      setProductSku((pre) => ({ ...pre, addSize: false }));
    });
  };

  const handleAddColor = () => {
    const color = colorRef.current.value;
    dispatch(CreateColor(color)).then((res) => {
      setProductDetails((preState) => ({
        ...preState,
        skus_attributes: [{ ...preState.skus_attributes[0], product_color_id: res.data.id.toString() }],
      }));
      setProductSku((pre) => ({ ...pre, addColor: false }));
    });
  };

  const createProductHandler = () => {
    if (productData?.id) {
      dispatch(EditProduct(productData.id, { product: productDetails })).then(() => {
        setIsOpen(false);
      });
    } else {
      dispatch(CreateProduct(productDetails)).then(() => {
        setIsOpen(false);
      });
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Add Product
          </Dialog.Title>
          <div className='mt-10'>
            <div
              className='w-32 h-32 border-2 rounded-full flex text-center items-center mx-auto cursor-pointer'
              onClick={() => fileInputRef.current.click()}
            >
              <input type='file' className='hidden' accept='image/*' ref={fileInputRef} onChange={handleProductImage} />
              {imageFile.length ? (
                <img src={imageFile} alt='product' className='w-full h-full object-cover rounded-full' />
              ) : (
                <p className='p-2 text-sm text-gray-500'>Select Product Image</p>
              )}
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Category</label>
              <select className='input-select w-full' onChange={handleAddProduct}>
                <option value='' selected disabled>
                  Select Category
                </option>
                <option>category 1</option>
              </select>
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Product Name</label>
              <input
                className='input-field'
                type='text'
                name='name'
                value={productDetails.name}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Price</label>
              <input
                className='input-field'
                name='price'
                type='number'
                value={productDetails.skus_attributes[0].price}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Quantity</label>
              <input
                className='input-field'
                name='quantity'
                type='number'
                value={productDetails.skus_attributes[0].quantity}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Size</label>
              <div className='flex'>
                {productSku.addSize ? (
                  <>
                    <input className='input-field' name='size' ref={sizeRef} />
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={handleAddSize}
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <select
                      className='input-select w-full'
                      name='product_size_id'
                      value={productDetails.skus_attributes[0].product_size_id}
                      onChange={handleAddProduct}
                    >
                      <option value='' selected disabled>
                        Select Size
                      </option>
                      {sizes &&
                        sizes.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                    </select>
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={() => setProductSku((preState) => ({ ...preState, addSize: true }))}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Color</label>
              <div className='flex'>
                {productSku.addColor ? (
                  <>
                    <input className='input-field' name='color' ref={colorRef} />
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={handleAddColor}
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <select
                      className='input-select w-full'
                      name='product_color_id'
                      onChange={handleAddProduct}
                      value={productDetails.skus_attributes[0].product_color_id}
                    >
                      <option value='' selected disabled>
                        Select Color
                      </option>
                      {colors &&
                        colors.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                    </select>
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={() => setProductSku((preState) => ({ ...preState, addColor: true }))}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={createProductHandler}
            >
              Submit
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-3'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default AddProducts;
