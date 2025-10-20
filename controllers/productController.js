import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

  export const createProductController = async (req, res) => {
 try {
    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // ✅ Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 10_000_000:
        return res
          .status(400)
          .send({ error: "Photo should be less than 10MB" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "✅ Product created successfully",
      products,
    });
  } catch (error) {
    console.error("❌ CREATE PRODUCT ERROR:", error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};
//get all product
export const getProductController = async (req, res) => {
  3;
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: " All Product fetched Successfully",
      products,
      totalCount:products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in getting Product",
      error,
    });
  }
};

//getting single product 
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single product fetched successfully",
      product, // ✅ not "products"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

//photo controller 
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (!product || !product.photo || !product.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }

    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
      error,
    });
  }
};


//delete product 

export const deleteProductController = async (req,res)=>{
try {
  await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(201).send({
      success: true,
      message: " Delete Product Successfully",

    });
} catch (error) {
         console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in deleting Product product",
      error,
    });
}
}

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
    }

    // Update product
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    // Update photo if uploaded
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      await product.save();
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error updating product", error });
  }
};
//filer product
export const filterProductController = async (req,res)=>{
  
}

