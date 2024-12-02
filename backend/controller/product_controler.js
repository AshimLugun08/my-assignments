import Product from "../model/product_model.js";

export const getProduct=async(req,res)=>{
    
    try {
        const product=await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.log("Error:",error)
    }


}
export const createProduct = async (req, res) => {
    try {
      const { name, price, category } = req.body;
  
      // Validate input
      if (!name || !price || !category) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Create a new product
      const newProduct = new Product({ name, price, category });
  
      // Save the product to the database
      await newProduct.save();
  
      res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
     
      // Find and delete the product
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  