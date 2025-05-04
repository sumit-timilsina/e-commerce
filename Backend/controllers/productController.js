import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//Function to add a new product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      bestseller,
      category,
      subCategory,
      sizes,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price:Number(price),
      bestseller:bestseller === "true" ? true : false,
      category,
      subCategory,
      sizes,
      images: imagesUrl,
      date:Date.now(),
    }

    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    console.log(imagesUrl);

    res.json({sucess:true, message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//Function to get all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function to remove a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
   console.log(error);
    res.json({ success: false, message: error.message }); 
  }
};

//Function to get a single product by id
const singleProduct = async (req, res) => {
  try {
    const {productId}=req.body;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
   console.log(error);
    res.json({ success: false, message: error.message }); 
  }
};


export { addProduct, listProducts, singleProduct, removeProduct };
