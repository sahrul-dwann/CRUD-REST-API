//service layer, bertujuan untuk handle business logic, biasanya juga handle query ke database
// kenapa di pisah? supaya tanggun jawabnya ter-isolate, dan functionnya reusable, bisa di panggil dari controller lain, atau dari service lain

const prisma = require("../db");
const { findProducts, findProductById, insertProduct, deleteProduct, editProduct } = require("./product.repository");

const getAllProducts = async () => {
    const products = await findProducts();

    //... you can add any additional processing or filtering here if needed


    return products;
}

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
}

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);
  return product;
}

const deleteProductId = async (id) => {
    await getProductById(id); // Check if the product exists before deleting

  await deleteProduct(id);
}

const editProductById = async (id, productData) => {
    await getProductById(id); // Check if the product exists before updating

  const product = await editProduct(id, productData);
  return product;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductId,
    editProductById
};