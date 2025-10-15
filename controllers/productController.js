import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      res.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !photo:
        return res
          .status(500)
          .send({ error: "photo  is Required and should be less then 10 mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in Product",
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
export const getSingleProductController = async (req,res)=>{
  try {
    
    const product = productModel.findOne({slug:req.params.slug})
    .select("-photo")
    .populate("category")
        res.status(201).send({
      success: true,
      message: " Get Single Product Successfully",
      products,
    });
  } catch (error) {
      console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in getting Single Product",
      error,
    });
  }
}

//photo controller 
export const productPhotoController = async (req,res)=>{
try {
  const product = await productModel.findById(req.params.pid).select("photo")
  if(product.photo.data){
    res.set("Content-type",product.photo.contentType)
    return res.status(200).send(product.photo.data)
  }
} catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error in getting Product photos",
      error,
    });
}
}

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
    const { name, slug, description, price, category, quantity, shipping } =
      res.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !photo:
        return res
          .status(500)
          .send({ error: "photo  is Required and should be less then 10 mb" });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)},{new:true })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Error while updating Product",
      error,
    });
  }
};

