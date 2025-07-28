
const Product = require("../models/product");

// add product 
const addProductController=async(req,res)=>{
    try{
        const productDetails = req.body;
        const newProduct = await Product.create(productDetails);
        if(newProduct){
            res.status(200).json({
                success:true,
                message:"New Product is added in the inventory!",
                data:newProduct,
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Unable to add the product in the inventory!",
            })
        }

    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}

// update product 
const updateProductController=async(req,res)=>{
    try{
        const productId = req.params.id;
        const productDetails = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId,productDetails,{new:true});
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product doesn't exist",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}


// get product 

const getProductController=async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || "price";
        const sortOrder = req.query.sortOrder==="asc"? 1 :-1;
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts/limit);
        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        
        const products = await Product.find().sort(sortObj).skip(skip).limit(limit);
        // const products = await Product.find({});

        if (products) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages,
                totalProducts,
                data: products,
            });
        }


    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}

// basic analytics


module.exports = {addProductController,updateProductController,getProductController};

