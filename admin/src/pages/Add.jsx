import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setCategory("");
        setSubCategory("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImages([null, null, null, null]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full bg-white shadow-sm rounded-xl p-6 sm:p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans">
          Add New Product
        </h2>

        {/* Upload Section */}
        <div>
          <p className="text-sm sm:text-base font-semibold text-gray-900 font-sans mb-2">
            Upload Images
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num, index) => (
              <label
                htmlFor={`image${num}`}
                key={num}
                className="relative cursor-pointer group border border-gray-100 rounded-lg p-2 hover:shadow-sm transition-all"
                aria-label={`Upload product image ${num}`}
              >
                <img
                  src={
                    images[index]
                      ? URL.createObjectURL(images[index])
                      : assets.upload_area
                  }
                  alt={`Product image ${num} upload placeholder`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  accept="image/*"
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
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
          >
            Product Name
          </label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
            type="text"
            placeholder="Enter product name"
            required
            aria-label="Product name"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
          >
            Product Description
          </label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-2xl px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
            rows={4}
            placeholder="Enter product description"
            required
            aria-label="Product description"
          />
        </div>

        {/* Category Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
            >
              Product Category
            </label>
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Select product category"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="subCategory"
              className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
            >
              Sub Category
            </label>
            <select
              id="subCategory"
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Select product sub-category"
            >
              <option value="">Select Sub-Category</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
            >
              Product Price ($)
            </label>
            <input
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              min="0"
              step="0.01"
              placeholder="25.00"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Product price"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-sm sm:text-base font-semibold text-gray-900 font-sans mb-2">
            Product Sizes
          </p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <motion.button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-full border text-sm sm:text-base font-sans transition-all ${
                  sizes.includes(size)
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Toggle size ${size}`}
              >
                {size}
              </motion.button>
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
            className="w-4 h-4 text-gray-900 border-gray-200 rounded focus:ring-gray-300"
            aria-label="Mark as bestseller"
          />
          <label
            htmlFor="bestseller"
            className="text-sm sm:text-base font-medium text-gray-900 font-sans"
          >
            Bestseller
          </label>
        </div>

        {/* Submit */}
        <div className="text-right">
          <motion.button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-sans text-sm sm:text-base font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add product"
          >
            Add Product
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
};

export default Add;