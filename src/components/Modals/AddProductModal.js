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
import { GetCategories } from '../../actions/categories.actions';
import Select from 'react-select';
import { CreateTag, GetTags } from '../../actions/tags.actions';

const AddProducts = ({ isOpen, setIsOpen, productData }) => {
  const initState = {
    category_id: null,
    vendor_id: null,
    discount: null,
    name: '',
    skus_attributes: [{ product_color_id: null, product_size_id: null, price: null, quantity: null }],
    product_tags_attributes: [
      {
        tag_id: null,
      },
    ],
  };
  const [productDetails, setProductDetails] = useState(initState);
  const [imageFile, setImageFile] = useState('');
  const sizeRef = useRef();
  const colorRef = useRef();
  const tagsRef = useRef();
  const [productSku, setProductSku] = useState({ addSize: false, addColor: false, addTags: false });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { sizes, colors, categories, productsFilter, vendors, tags } = useSelector((state) => ({
    sizes: state.products.productSizes,
    colors: state.products.productColors,
    categories: state.categories,
    tags: state.tags,
    vendors: state.vendors,
    productsFilter: state.products.productsFilter,
  }));

  useEffect(() => {
    if (productData && productData.id) {
      const { name, skus, category_id, vendor_id, product_tags, discount } = productData;
      const { id, quantity, price } = skus[0];
      const productColor = skus[0].product_color.id;
      const productSize = skus[0].product_size.id;
      setProductDetails({
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
    dispatch(GetCategories());
    dispatch(GetTags());
  }, [dispatch]);

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

  const handleAddTag = () => {
    const tag = tagsRef.current.value;
    dispatch(
      CreateTag({
        tag: {
          name: tag,
        },
      })
    ).then((res) => {
      setProductDetails((preState) => ({
        ...preState,
        product_tags_attributes: preState.product_tags_attributes
          .concat({ tag_id: res.data.id })
          .filter((e) => e.tag_id),
      }));
      setProductSku((pre) => ({ ...pre, addTags: false }));
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
    Object.keys(productDetails).forEach((k) => productDetails[k] == null && delete productDetails[k]);
    if (productData?.id) {
      dispatch(EditProduct(productData.id, { product: productDetails })).then(() => {
        setIsOpen(false);
        setProductDetails(initState);
      });
    } else {
      dispatch(CreateProduct(productDetails)).then(() => {
        setIsOpen(false);
        setProductDetails(initState);
      });
    }
  };

  const tagsOptions = tags.map((e) => ({ value: e.id, label: e.name }));

  const handleTagsChange = (e) => {
    setProductDetails((preState) => ({
      ...preState,
      product_tags_attributes:
        productData && productData.product_tags.length
          ? preState.product_tags_attributes.concat(
              e
                .map((t) => !productData.product_tags.map((p) => p.tag_id).includes(t.value) && { tag_id: t.value })
                .filter((e) => e.tag_id)
            )
          : e.map((t) => ({ tag_id: t.value })),
    }));
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Add Product
          </Dialog.Title>
          <div className='mt-10 h-70v overflow-y-auto productsAdd'>
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
              <select
                className='input-select w-full'
                name='category_id'
                onChange={handleAddProduct}
                value={productDetails.category_id}
              >
                <option value='' selected disabled>
                  Select Category
                </option>
                {categories &&
                  categories.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
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
                    <option key={e.id} value={e.id}>
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
              <label className='mb-1 text-gray-500 font-bold'>Discount</label>
              <input
                className='input-field'
                name='discount'
                type='number'
                value={productDetails.discount}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Tags</label>
              <div className='flex'>
                {productSku.addTags ? (
                  <>
                    <input className='input-field' name='tags' ref={tagsRef} />
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={handleAddTag}
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <Select
                      options={tagsOptions}
                      isMulti
                      value={tags.map(
                        (e) =>
                          productDetails.product_tags_attributes.map((t) => t.tag_id).includes(e.id) && {
                            label: e.name,
                            value: e.id,
                          }
                      )}
                      onChange={handleTagsChange}
                    />
                    <button
                      className='p-3 ml-2 inline-flex justify-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={() => setProductSku((preState) => ({ ...preState, addTags: true }))}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
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
