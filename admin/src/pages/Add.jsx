import React, { useState } from "react";
import { assets } from "../assets/assets";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <form className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-2xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Add New Product</h2>

      {/* Upload Section */}
      <div>
        <p className="text-lg font-semibold text-gray-800 mb-3">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num, index) => (
            <label
              htmlFor={`image${num}`}
              key={num}
              className="relative cursor-pointer group border-2 border-dashed border-gray-300 rounded-xl p-2 hover:border-gray-500 transition"
            >
              <img
                src={
                  images[index]
                    ? URL.createObjectURL(images[index])
                    : assets.upload_area
                }
                alt={`Upload ${num}`}
                className="w-full h-32 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition duration-300"
              />
              <input
                type="file"
                id={`image${num}`}
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleImageChange(index, file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          rows={4}
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Category
          </label>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">Select</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Price ($)
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 rounded-full border cursor-pointer transition ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:border-black"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
          className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
        />
        <label htmlFor="bestseller" className="text-sm font-medium text-gray-700">
          Bestseller
        </label>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
