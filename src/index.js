const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello, World!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const newproductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newproductData.name,
      price: newproductData.price,
      description: newproductData.description,
      image: newproductData.image,
    },
  });
  res.send({
    data: product,
    message: "Product created successfully",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });
  res.send({
    message: "Product deleted successfully",
  });
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    return res.status(400).send("some fileds are missing");
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  res.send({
    data: product,
    message: "edit data success",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  res.send({
    data: product,
    message: "edit data success",
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
