//berkomunikasi dengan database, biasanya berisi query ke database
//boleh pake ORM, boleh raw Query
//supaya apa? supaya kalo mau ganti2 ORM tinggal edit di file ini aja, ga perlu ke service atau controller

const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
}

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
}

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  return product;
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    editProduct,
};