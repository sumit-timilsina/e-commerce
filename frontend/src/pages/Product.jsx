import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.images[0])
        return null;
      }
    })


  }

  console.log(productData);
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="flex gap-2 overflow-x-auto mb-4">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-gray-400"
              />
            ))}
          </div>
          <div className="border rounded-lg overflow-hidden">
            <img src={image} alt="" className="w-full max-h-[500px] object-contain" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-5 h-5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-5 h-5" />
            <p className="text-sm text-gray-600 ml-2">(122)</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{currency}{productData.price}</p>
          <p className="text-gray-700">{productData.description}</p>

          {/* Sizes */}
          <div className="mt-4">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {
              JSON.parse(productData.sizes).map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded-full hover:bg-gray-100 ${
                    size === item ? 'bg-gray-800 text-white' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
          onClick={() => (addToCart(productData._id , size))}
          className="mt-6 w-full lg:w-auto px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
            ADD TO CART
          </button>

          {/* Product Assurance */}
          <hr className="my-4" />
          <div className="text-sm space-y-1 text-gray-600">
            <p>✅ 100% Original Product</p>
            <p>🚚 Cash on delivery available</p>
            <p>🔁 Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-16">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-sm text-gray-600">Reviews (122)</p>
        </div>
        <div className="text-gray-700 space-y-4 leading-relaxed">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit...</p>
          <p>Quam velit reprehenderit at beatae facere nam culpa...</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
