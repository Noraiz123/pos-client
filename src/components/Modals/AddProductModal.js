import { Dialog } from '@headlessui/react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { CreateProduct, EditProduct } from '../../actions/products.actions';
import { GetCategories } from '../../actions/categories.actions';

const AddProducts = ({ isOpen, setIsOpen, productData }) => {
  const initState = {
    imgUrl: null,
    category_id: null,
    vendor_id: null,
    discount: null,
    name: '',
    size: '',
    color: '',
    price: '',
  };
  const [productDetails, setProductDetails] = useState(initState);
  const [skusDetails, setSkusDetails] = useState([]);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, vendors } = useSelector((state) => ({
    categories: state.categories,
    vendors: state.vendors,
  }));

  useEffect(() => {
    if (productData && productData.id) {
      const { name, skus, category_id, vendor_id, product_tags, discount } = productData;

      setProductDetails({
        ...initState,
        name,
        category_id,
        vendor_id,
        discount,
        product_tags_attributes: product_tags
          ? product_tags.map((e) => ({ tag_id: e.tag_id, id: e.id }))
          : [
              {
                tag_id: null,
              },
            ],
      });
      setSkusDetails(
        skus.map((e) => ({ ...e, product_color_id: e.product_color.id, product_size_id: e.product_size.id }))
      );
    }
  }, [productData]);

  const handleAddProduct = (e) => {
    const { name, value } = e.target;
    if (['price', 'quantity', 'discount'].includes(name)) {
      setProductDetails((preState) => ({
        ...preState,
        [name]: parseInt(value),
      }));
    } else {
      setProductDetails((preState) => ({ ...preState, [name]: value }));
    }
  };

  const handleProductImage = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProductDetails((pre) => ({ ...pre, imgUrl: reader.result }));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  const createProductHandler = () => {
    Object.keys(productDetails).forEach((k) => productDetails[k] == null && delete productDetails[k]);
    skusDetails.map((e) => {
      delete e.sku_id;
      delete e.product_color;
      delete e.product_size;
    });
    if (productData?.id) {
      dispatch(
        EditProduct(productData.id, {
          product: { ...productDetails, skus_attributes: skusDetails },
        })
      ).then(() => {
        setIsOpen(false);
        setProductDetails(initState);
        setSkusDetails([]);
      });
    } else {
      dispatch(CreateProduct(productDetails)).then(() => {
        setIsOpen(false);
        setProductDetails(initState);
        setSkusDetails([]);
      });
    }
  };

  const btnStyle = (color) => {
    return `inline-flex justify-center px-4 py-2 text-sm font-medium text-${color}-900 bg-${color}-100 border border-transparent rounded-md hover:bg-${color}-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${color}-500 ml-3`;
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            {productData ? 'Update' : 'Add'} Product
          </Dialog.Title>
          <div className='mt-10 h-70v overflow-y-auto productsAdd'>
            <div
              className='w-32 h-32 border-2 rounded-full flex text-center items-center mx-auto cursor-pointer'
              onClick={() => fileInputRef.current.click()}
            >
              <input type='file' className='hidden' accept='image/*' ref={fileInputRef} onChange={handleProductImage} />
              {productDetails.imgUrl ? (
                <img src={productDetails.imgUrl} alt='product' className='w-full h-full object-cover rounded-full' />
              ) : (
                <p className='p-2 text-sm text-gray-500'>Select Product Image</p>
              )}
            </div>
            <div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Category</label>
                <select
                  className='input-select w-full'
                  name='category_id'
                  onChange={handleAddProduct}
                  value={productDetails.category_id}
                >
                  <option value='' selected disabled>
                    Select Category
                  </option>
                  {categories && categories.map((e) => <option key={e.id}>{e.name}</option>)}
                </select>
              </div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Vendors</label>
                <select
                  className='input-select w-full'
                  name='vendor_id'
                  onChange={handleAddProduct}
                  value={productDetails.vendor_id}
                >
                  <option value='' selected disabled>
                    Select Vendor
                  </option>
                  {vendors &&
                    vendors.map((e) => (
                      <option key={e.id} data-value={e.id}>
                        {e.name}
                      </option>
                    ))}
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
                <label className='mb-1 text-gray-500 font-bold'>Discount</label>
                <input
                  className='input-field'
                  name='discount'
                  type='number'
                  value={productDetails.discount}
                  onChange={handleAddProduct}
                />
              </div>
            </div>
            <hr></hr>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Price</label>
              <input
                className='input-field'
                name='price'
                type='number'
                value={productDetails.price}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Quantity</label>
              <input
                className='input-field'
                name='quantity'
                type='number'
                value={productDetails.quantity}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Size</label>
              <input className='input-field' name='size' value={productDetails.size} onChange={handleAddProduct} />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Color</label>
              <input className='input-field' name='color' value={productDetails.color} onChange={handleAddProduct} />
            </div>
          </div>
          <div className='mt-4'>
            <button type='button' className={btnStyle('blue')} onClick={createProductHandler}>
              Submit
            </button>
            <button type='button' className={btnStyle('red')} onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default AddProducts;
