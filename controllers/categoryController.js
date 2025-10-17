import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"




export const createCategoryController = async(req,res) => {
    
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({massage:"Name is require"});
        }
        const existingCategroy = await categoryModel.findOne({name});
        if(existingCategroy){
            return res.status(200).send({
                success:true,
                message:"Category Already Exisits ",
            });
        }
        const category =  await new categoryModel({
            name,
            slug:slugify(name),
        }).save();
        res.status(201).send({
            success:true,
            message:"New Category Created",
            category,
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            success:false,
            massage:"Error in Category",
            error
        });
        
    }

}

//update category 
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    if (!name) return res.status(400).send({ success: false, message: "Name is required" });

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true } // Important: returns the updated document
    );

    if (!updatedCategory)
      return res.status(404).send({ success: false, message: "Category not found" });

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error updating category", error });
  }
};
//all category controller
export const CategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error: error.message,
    });
  }
};
//single category controller
export const singleCategoryController = async(req,res) => {
try {
    
   const category = await categoryModel.findOne({slug:req.params.slug});
    res.status(201).send({
            success:true,
            message:"Get Single Category Successfully",
            category,
        });
                                                                                

    
} catch (error) {
      console.log(error);        
        res.status(500).send({
            success:false,
            massage:"Error while getting single Category",
            error
        });
    
}
    
}


//delete category controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

