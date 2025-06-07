const { body, validationResult } = require("express-validator");
const ProductModel = require("../models/ProductModel");
const { RemoveExif } = require("../utils/exifRemover");

const CreateProduct = async (req, res) => {
  try {
    req.body.price = Number(req.body.price);
    await body("name").notEmpty().run(req);
    await body("price").isFloat().run(req);
    await body("category").notEmpty().run(req);
    await body("imageUrl")
      .isArray()
      .withMessage("imageUrl must be an array of base64 strings")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, category, imageUrl } = req.body;

    const MAX_IMAGES = process.env.MAX_IMAGES;

    if (imageUrl.flat().length > MAX_IMAGES) {
      return res
        .status(400)
        .json({ message: `Max ${MAX_IMAGES} images allowed.` });
    }

    let cleanedImageUrl = [];

    for (let i = 0; imageUrl.length > i; i++) {
      let url = await RemoveExif(imageUrl[i][0]);
      cleanedImageUrl.push(url);
    }

    const product = await ProductModel.create({
      name,
      price,
      category,
      imageUrl: cleanedImageUrl,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const GetProducts = async (req, res) => {
  try {
    let products;
    let statusCode;
    let resp;
    if (req.params.id) {
      products = await ProductModel.findByPk(req.params.id);
      statusCode = 404;
      resp = { msg: "No products found matching the search criteria" };
    } else {
      products = await ProductModel.findAll({ order: [["id", "DESC"]] });
      statusCode = 204;
      resp = [];
    }

    if (!products) {
      return res.status(statusCode).json(resp);
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const allowedFields = ["name", "price", "category", "imageUrl"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        await body(field).notEmpty().run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        updates[field] = req.body[field];
      }
    }

    await product.update(updates);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { CreateProduct, GetProducts, UpdateProduct, DeleteProduct };
