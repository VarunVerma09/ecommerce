import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from '../models/categoryModel.js'
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";


dotenv.config();





// Braintree Gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, 
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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

//filter by price and catagory
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Category filter
    if (checked.length > 0) args.category = checked;

    // Price filter
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    // ✅ Use productModel instead of Product
    const products = await productModel.find(args)
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("❌ Filter Error:", error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

//single category product controller
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// 1Get Braintree Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Braintree Token Error:", err);
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ clientToken: response.clientToken });
    });
  } catch (error) {
    console.error("Braintree Token Error:", error);
    res.status(500).json({ success: false, error });
  }
};

// Handle Payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;

    if (!nonce || !cart?.length) {
      return res.status(400).json({ success: false, error: "Invalid payment request" });
    }

    // Calculate total amount
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    // Create transaction
    gateway.transaction.sale(
      {
        amount: totalAmount,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      async (error, result) => {
        if (error) {
          console.error("Braintree Payment Error:", error);
          return res.status(500).json({ success: false, error });
        }

        if (result.success) {
          // Save order in DB
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id, // make sure requireSignIn middleware is used
          });
          await order.save();

          return res.json({ success: true, order });
        } else {
          return res.status(500).json({ success: false, error: result.message });
        }
      }
    );
  } catch (error) {
    console.error("Braintree Payment Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
