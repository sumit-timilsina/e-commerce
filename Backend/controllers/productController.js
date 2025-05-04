//Function to add a new product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      bestseller,
      category,
      subcategory,
      sizes,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    console.log(
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller
    );
    console.log(image1, image2, image3, image4);

    res.json({});
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//Function to get all products
const listProducts = async (req, res) => {};

//Function to get a single product by id
const singleProduct = async (req, res) => {};

//function to remove a product
const removeProduct = async (req, res) => {};

export { addProduct, listProducts, singleProduct, removeProduct };
